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

def parse_webhook_event(event_dict: dict):
    """
    Routes the event to the appropriate handler based on event type.
    """
    event_type = event_dict.get("event")
    payload = event_dict.get("payload", {})
    
    # ---------------------------------------------------------
    # TRACK 1: RECOVERY ORCHESTRATOR (Failed/Expired/Cancelled)
    # ---------------------------------------------------------
    if event_type in ["payment.failed", "invoice.expired", "payment_link.expired", "payment_link.cancelled", "order.notification.failed"]:
        print(f"[Recovery AI] Triggered by: {event_type}. Analyzing reason to start recovery...")
        # In a real system, we'd extract merchant_id and transaction_id from the payload.
        # For the demo, we will pass dummy data or extract from the DB.
        from backend.recovery_orchestrator import start_recovery
        from backend.database_schema import SessionLocal
        
        db = SessionLocal()
        try:
            from backend.action_receipt_logger import log_action_receipt
            from backend.database_schema import Merchant
            
            # Extract real details from the Razorpay payload
            payment_entity = payload.get("payment", {}).get("entity", {})
            amount = payment_entity.get("amount", 0) / 100
            email = payment_entity.get("email", "Unknown User")
            pay_id = payment_entity.get("id", "pay_unknown")
            
            # In production, we find merchant by razorpay account ID. 
            # For this demo, we assign the webhook to the most recently active merchant in the DB.
            active_merchant = db.query(Merchant).order_by(Merchant.created_at.desc()).first()
            target_merchant_id = active_merchant.id if active_merchant else "demo_merchant_1"
            
            # Log it to the database so the frontend UI sees it
            narrative = f"🔔 REAL WEBHOOK: Payment of ₹{amount} failed for {email}. Cyvault AI intercepted the webhook and is analyzing."
            log_action_receipt(db, target_merchant_id, "recovery_fail", f"real_webhook_{pay_id}", "ALLOWED", narrative)
            db.commit()
        finally:
            db.close()
        
    # ---------------------------------------------------------
    # TRACK 2: FINANCE & RECONCILIATION (Successful Revenue)
    # ---------------------------------------------------------
    elif event_type in ["payment.captured", "order.paid", "invoice.paid", "invoice.partially_paid", "payment_link.paid", "payment_link.partially_paid", "settlement.processed"]:
        print(f"[Finance AI] Triggered by: {event_type}. Reconciling ledger...")
        if event_type == "settlement.processed":
            from backend.finance_matcher import process_settlement
            from backend.database_schema import SessionLocal
            
            db = SessionLocal()
            try:
                # Extract settlement details from payload in a real app
                settlement_id = payload.get("settlement", {}).get("entity", {}).get("id", "setl_demo123")
                utr = payload.get("settlement", {}).get("entity", {}).get("utr", "UTR_DEMO_999")
                amount = payload.get("settlement", {}).get("entity", {}).get("amount", 10000)
                
                # Mock merchant ID for demo
                process_settlement(db, merchant_id="demo", settlement_id=settlement_id, utr=utr, amount_paise=amount)
            finally:
                db.close()
        
    # ---------------------------------------------------------
    # TRACK 3: RISK & DISPUTE AI
    # ---------------------------------------------------------
    elif event_type == "payment.dispute.created":
        print(f"[Risk AI] Triggered by: {event_type}. Analyzing fraud parameters...")
        
    # ---------------------------------------------------------
    # TRACK 4: CUSTOMER SUPPORT AI (Refund tracking)
    # ---------------------------------------------------------
    elif event_type in ["refund.created", "refund.processed", "refund.failed"]:
        print(f"[Support AI] Triggered by: {event_type}. Updating customer on refund status...")
        
    else:
        print(f"Ignored unhandled event type: {event_type}")
