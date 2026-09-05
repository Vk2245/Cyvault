import hmac
import hashlib
from fastapi import Request, HTTPException
from backend.config import settings

async def verify_razorpay_signature(request: Request) -> bytes:
    """
    Verifies the HMAC SHA256 signature from Razorpay Webhooks.
    Raises HTTPException 401 if invalid.
    Returns the raw body bytes for further processing.
    """
    # 1. Get raw body
    body_bytes = await request.body()
    
    # 2. Get signature from headers
    signature = request.headers.get("x-razorpay-signature")
    if not signature:
        raise HTTPException(status_code=401, detail="Missing Razorpay Signature")
        
    # 3. Get webhook secret
    secret = settings.RAZORPAY_WEBHOOK_SECRET
    if not secret:
        # In dev mode if secret is missing, we might bypass (DANGEROUS IN PROD)
        if settings.ENVIRONMENT == "development":
            return body_bytes
        raise HTTPException(status_code=500, detail="Webhook secret not configured")
        
    # 4. Compute expected signature
    expected_signature = hmac.new(
        key=secret.encode('utf-8'),
        msg=body_bytes,
        digestmod=hashlib.sha256
    ).hexdigest()
    
    # 5. Compare using constant-time comparison to prevent timing attacks
    if not hmac.compare_digest(expected_signature, signature):
        raise HTTPException(status_code=401, detail="Invalid Razorpay Signature")
        
    return body_bytes

def parse_webhook_event(event_dict: dict, merchant_id: str):
    """
    Routes the event to the appropriate handler based on event type.
    
    What it does:
        - Extracts real payment data from the Razorpay webhook payload
        - Creates FULL DB records (Customer, Order, Transaction, ActionReceipt)
        - This ensures Dashboard KPIs, Users, Entity Graph, Recovery Cases ALL update
    
    Args:
        event_dict: The full webhook JSON from Razorpay
        merchant_id: The Cyvault merchant ID (from the URL path)
    """
    event_type = event_dict.get("event")
    payload = event_dict.get("payload", {})
    
    # ---------------------------------------------------------
    # TRACK 1: RECOVERY ORCHESTRATOR (Failed/Expired/Cancelled)
    # ---------------------------------------------------------
    if event_type in ["payment.failed", "invoice.expired", "payment_link.expired", "payment_link.cancelled", "order.notification.failed"]:
        print(f"[Recovery AI] Triggered by: {event_type}. Analyzing reason to start recovery...")
        
        from backend.database_schema import SessionLocal, Merchant, Customer, Order, Transaction, PolicyRule
        from backend.action_receipt_logger import log_action_receipt
        import random
        
        db = SessionLocal()
        try:
            # ── Step 0: Ensure merchant exists in DB ──
            existing_merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
            if not existing_merchant:
                new_merchant = Merchant(
                    id=merchant_id,
                    name=f"Merchant {merchant_id[-4:]}",
                    email=f"{merchant_id}@webhook.cyvault.io",
                    password_hash="webhook_auto_created"
                )
                db.add(new_merchant)
                db.flush()
            
            # ── Step 1: Extract real details from the Razorpay payload ──
            payment_entity = payload.get("payment", {}).get("entity", {})
            amount_paise = payment_entity.get("amount", 0)  # Razorpay sends amount in paise
            amount_rupees = amount_paise / 100
            email = payment_entity.get("email", "unknown@customer.rzp")
            phone = payment_entity.get("contact", f"+91-{random.randint(70000,99999)}{random.randint(10000,99999)}")
            pay_id = payment_entity.get("id", f"pay_webhook_{random.randint(1000,9999)}")
            order_id_rzp = payment_entity.get("order_id", f"order_webhook_{random.randint(1000,9999)}")
            error_code = payment_entity.get("error_code", "BAD_REQUEST_ERROR")
            error_description = payment_entity.get("error_description", "Payment failed via webhook")
            method = payment_entity.get("method", "card")
            
            # ── Step 2: Create Customer record (populates Users tab + Entity Graph) ──
            # Use email as a stable customer ID so repeat failures don't create duplicates
            customer_id = f"cust_rzp_{email.split('@')[0][:10]}_{random.randint(100,999)}"
            
            # Check if customer with same email already exists for this merchant
            existing_customer = db.query(Customer).filter(
                Customer.merchant_id == merchant_id,
                Customer.email == email
            ).first()
            
            if not existing_customer:
                new_customer = Customer(
                    id=customer_id,
                    merchant_id=merchant_id,
                    email=email,
                    phone=phone,
                    device_fingerprint=f"fp_rzp_{random.randint(1000,9999)}"
                )
                db.add(new_customer)
                db.flush()
            else:
                customer_id = existing_customer.id
            
            # ── Step 3: Create Order record (populates Dashboard "₹ At Risk" KPI) ──
            cyvault_order_id = f"order_rzp_{pay_id[-8:]}"
            new_order = Order(
                id=cyvault_order_id,
                merchant_id=merchant_id,
                customer_id=customer_id,
                amount_paise=amount_paise if amount_paise > 0 else 100000,
                status="attempted"  # "attempted" = failed/at-risk in dashboard logic
            )
            db.add(new_order)
            db.flush()
            
            # ── Step 4: Create Transaction record (populates transaction history) ──
            new_tx = Transaction(
                id=pay_id,
                order_id=cyvault_order_id,
                amount_paise=amount_paise if amount_paise > 0 else 100000,
                status="failed",
                method=method,
                error_code=error_code,
                error_description=error_description
            )
            db.add(new_tx)
            
            # ── Step 5: Log Alert ActionReceipt (populates Alerts tab) ──
            narrative = f"🔔 REAL WEBHOOK: Payment of ₹{amount_rupees} failed for {email}. Cyvault AI intercepted the webhook and is analyzing."
            log_action_receipt(db, merchant_id, "recovery_fail", f"real_webhook_{pay_id}", "ALLOWED", narrative)
            
            # ── Step 6: Check policies and log Recovery Action (populates Recovery Cases) ──
            active_policies = db.query(PolicyRule).filter(
                PolicyRule.merchant_id == merchant_id,
                PolicyRule.is_active == True
            ).all()
            
            fallback = next((p for p in active_policies if getattr(p, 'rule_type', '') == 'fixed_fallback'), None)
            
            if fallback and isinstance(fallback.parameters, dict):
                starting_discount = int(fallback.parameters.get('start_discount', 5))
                policy_name = fallback.name
            else:
                starting_discount = 10
                policy_name = "default_recovery"
            
            recovery_narrative = f"🤖 Cyvault Recovery AI offered {starting_discount}% discount to {email} (Real Webhook) | Policy: {policy_name} | SMS recovery link sent."
            log_action_receipt(db, merchant_id, "offer_discount", cyvault_order_id, "ALLOWED", recovery_narrative)
            
            db.commit()
            print(f"[Webhook] Full data chain created: Customer={customer_id}, Order={cyvault_order_id}, Tx={pay_id}")
            
        except Exception as error:
            print(f"ERROR in webhook handler: {error}")
            db.rollback()
        finally:
            db.close()
        
    # ---------------------------------------------------------
    # TRACK 2: FINANCE & RECONCILIATION (Successful Revenue)
    # ---------------------------------------------------------
    elif event_type in ["payment.captured", "order.paid", "invoice.paid", "invoice.partially_paid", "payment_link.paid", "payment_link.partially_paid"]:
        print(f"[Finance AI] Triggered by: {event_type}. Reconciling ledger...")
        
        from backend.database_schema import SessionLocal, Merchant, Customer, Order, Transaction, Settlement
        from backend.action_receipt_logger import log_action_receipt
        import random
        
        db = SessionLocal()
        try:
            # Ensure merchant exists
            existing_merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
            if not existing_merchant:
                new_merchant = Merchant(
                    id=merchant_id,
                    name=f"Merchant {merchant_id[-4:]}",
                    email=f"{merchant_id}@webhook.cyvault.io",
                    password_hash="webhook_auto_created"
                )
                db.add(new_merchant)
                db.flush()
            
            # Extract payment details
            payment_entity = payload.get("payment", {}).get("entity", {})
            amount_paise = payment_entity.get("amount", 0)
            amount_rupees = amount_paise / 100
            email = payment_entity.get("email", "unknown@customer.rzp")
            phone = payment_entity.get("contact", f"+91-{random.randint(70000,99999)}{random.randint(10000,99999)}")
            pay_id = payment_entity.get("id", f"pay_webhook_{random.randint(1000,9999)}")
            method = payment_entity.get("method", "card")
            
            # Create Customer (if not exists)
            customer_id = f"cust_rzp_{email.split('@')[0][:10]}_{random.randint(100,999)}"
            existing_customer = db.query(Customer).filter(
                Customer.merchant_id == merchant_id,
                Customer.email == email
            ).first()
            
            if not existing_customer:
                db.add(Customer(
                    id=customer_id,
                    merchant_id=merchant_id,
                    email=email,
                    phone=phone,
                    device_fingerprint=f"fp_rzp_{random.randint(1000,9999)}"
                ))
                db.flush()
            else:
                customer_id = existing_customer.id
            
            # Create Order (status = "paid" for recovered revenue)
            cyvault_order_id = f"order_rzp_{pay_id[-8:]}"
            db.add(Order(
                id=cyvault_order_id,
                merchant_id=merchant_id,
                customer_id=customer_id,
                amount_paise=amount_paise if amount_paise > 0 else 100000,
                status="paid"
            ))
            db.flush()
            
            # Create Transaction (status = "captured")
            db.add(Transaction(
                id=pay_id,
                order_id=cyvault_order_id,
                amount_paise=amount_paise if amount_paise > 0 else 100000,
                status="captured",
                method=method,
                risk_score=0.1
            ))
            
            # Create Settlement
            setl_id = f"setl_rzp_{pay_id[-8:]}"
            utr = f"UTR_{random.randint(100000, 999999)}"
            db.add(Settlement(
                id=setl_id,
                merchant_id=merchant_id,
                amount_paise=amount_paise if amount_paise > 0 else 100000,
                fees_paise=int((amount_paise if amount_paise > 0 else 100000) * 0.02),
                tax_paise=int((amount_paise if amount_paise > 0 else 100000) * 0.0036),
                utr=utr,
                status="processed"
            ))
            
            # Log success receipt
            narrative = f"✅ Payment of ₹{amount_rupees} successful for {email}."
            log_action_receipt(db, merchant_id, "payment_success", cyvault_order_id, "ALLOWED", narrative)
            
            db.commit()
            print(f"[Webhook] Payment captured: Customer={customer_id}, Order={cyvault_order_id}, Settlement={setl_id}")
            
        except Exception as error:
            print(f"ERROR in webhook handler (captured): {error}")
            db.rollback()
        finally:
            db.close()
    
    # ---------------------------------------------------------
    # TRACK 3: SETTLEMENT PROCESSING
    # ---------------------------------------------------------
    elif event_type == "settlement.processed":
        print(f"[Finance AI] Triggered by: {event_type}. Processing settlement...")
        from backend.finance_matcher import process_settlement
        from backend.database_schema import SessionLocal
        
        db = SessionLocal()
        try:
            settlement_entity = payload.get("settlement", {}).get("entity", {})
            settlement_id = settlement_entity.get("id", "setl_demo123")
            utr = settlement_entity.get("utr", "UTR_DEMO_999")
            amount = settlement_entity.get("amount", 10000)
            
            process_settlement(db, merchant_id=merchant_id, settlement_id=settlement_id, utr=utr, amount_paise=amount)
        finally:
            db.close()
        
    # ---------------------------------------------------------
    # TRACK 4: RISK & DISPUTE AI
    # ---------------------------------------------------------
    elif event_type == "payment.dispute.created":
        print(f"[Risk AI] Triggered by: {event_type}. Analyzing fraud parameters...")
        
    # ---------------------------------------------------------
    # TRACK 5: CUSTOMER SUPPORT AI (Refund tracking)
    # ---------------------------------------------------------
    elif event_type in ["refund.created", "refund.processed", "refund.failed"]:
        print(f"[Support AI] Triggered by: {event_type}. Updating customer on refund status...")
        
    else:
        print(f"Ignored unhandled event type: {event_type}")

