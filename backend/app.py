from fastapi import FastAPI, Depends, Request, HTTPException
from pydantic import BaseModel
import uuid
from fastapi.middleware.cors import CORSMiddleware
import json
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

from backend.config import settings
from backend.database_schema import get_db, init_db, Merchant, Order, Settlement, Customer, Transaction, ActionReceipt, PolicyRule
from backend.webhook_handler import verify_razorpay_signature, parse_webhook_event
from backend.llm_provider_router import get_llm_response

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Database
    print("Starting Cyvault Backend...")
    init_db()
    yield
    # Shutdown
    print("Shutting down Cyvault Backend...")

app = FastAPI(
    title="Cyvault API",
    description="Backend for Cyvault Agentic Revenue Recovery",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "*"], # Allow frontend for demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "environment": settings.ENVIRONMENT}

@app.post("/webhook/razorpay")
async def razorpay_webhook(request: Request):
    """
    Ingests Razorpay Webhooks.
    1. Verifies Signature
    2. Parses JSON
    3. Routes to appropriate track (Recovery, Finance, etc.)
    """
    raw_body = await verify_razorpay_signature(request)
    try:
        event_dict = json.loads(raw_body)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
        
    # Route event internally
    parse_webhook_event(event_dict)
    
    # Must return 200 quickly to acknowledge Razorpay
    return {"status": "received"}
from pydantic import BaseModel
import uuid
from backend.utils import hash_password, verify_password

class RegisterRequest(BaseModel):
    merchantName: str
    companyName: str
    businessEmail: str
    password: str
    industry: str
    volume: str
    apiKey: str
    apiSecret: str
    webhookSecret: str

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/merchants/register")
def register_merchant(req: RegisterRequest, db: Session = Depends(get_db)):
    # Check if email exists
    existing = db.query(Merchant).filter(Merchant.email == req.businessEmail).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    new_merchant = Merchant(
        id=f"merch_{uuid.uuid4().hex[:8]}",
        name=req.merchantName,
        company_name=req.companyName,
        industry=req.industry,
        email=req.businessEmail,
        password_hash=hash_password(req.password)
    )
    new_merchant.set_secrets(req.apiKey, req.apiSecret, req.webhookSecret)
    
    db.add(new_merchant)
    db.commit()
    return {"status": "success", "merchant_id": new_merchant.id}

@app.post("/api/merchants/login")
def login_merchant(req: LoginRequest, db: Session = Depends(get_db)):
    merchant = db.query(Merchant).filter(Merchant.email == req.email).first()
    if not merchant:
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    if not verify_password(req.password, merchant.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    return {"status": "success", "merchant_id": merchant.id}

# ==========================================
# LLM Data Query (Settlement Q&A Example)
# ==========================================
@app.post("/api/ask")
def ask_cyvault(query: dict, db: Session = Depends(get_db)):
    """
    RAG-style Endpoint: Fetches DB data to answer user's question via LLM.
    """
    user_question = query.get("question", "")
    merchant_id = query.get("merchant_id")
    
    if not user_question or not merchant_id:
        raise HTTPException(status_code=400, detail="Missing question or merchant_id")
        
    # In a real RAG, we'd use semantic search or text2sql here.
    # For demo, we just dump recent settlements for the merchant as context.
    settlements = db.query(Settlement).filter(Settlement.merchant_id == merchant_id).limit(5).all()
    
    context_str = "Recent Settlements:\n"
    for s in settlements:
        context_str += f"- ID: {s.id}, Amount: {s.amount_paise/100} INR, Status: {s.status}, UTR: {s.utr}\n"
        
    prompt = f"""
    You are Cyvault's financial assistant.
    Answer the merchant's question based strictly on the data below.
    If the data doesn't contain the answer, say so.
    
    Context Data:
    {context_str}
    
    Merchant Question: {user_question}
    """
    
    # Use our safe router (Gemini -> Groq -> Fallback)
    answer = get_llm_response(prompt, task_type="settlement_qa")
    return {"answer": answer}

# ==========================================
# SIMULATOR ENDPOINT (For Hackathon Demo)
# ==========================================
@app.post("/api/simulate")
def simulate_webhook(payload: dict, db: Session = Depends(get_db)):
    """
    Directly triggers the AI pipelines without Razorpay Signature.
    Used exclusively for the split-screen Hackathon Demo.
    Creates real DB records so all dashboard tabs get populated.
    """
    scenario = payload.get("scenario")
    merchant_id = payload.get("merchant_id", "demo_merchant_1")
    customer_id = payload.get("customer_id", "sim_demo_999")
    
    # Ensure merchant exists before doing anything (crucial for fresh DBs)
    existing_merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not existing_merchant:
        new_merchant = Merchant(
            id=merchant_id,
            name=f"Demo Merchant {merchant_id[-4:]}",
            email=f"{merchant_id}@demo.com",
            password_hash="demo_hash"
        )
        db.add(new_merchant)
        db.commit()
    
    from backend.action_receipt_logger import log_action_receipt
    import random
    
    if scenario == "recovery_fail":
        # 1. Create Customer record (so Users tab populates)
        existing_customer = db.query(Customer).filter(Customer.id == customer_id).first()
        if not existing_customer:
            new_customer = Customer(
                id=customer_id,
                merchant_id=merchant_id,
                email=f"{customer_id.lower()}@customer.demo",
                phone=f"+91-{random.randint(70000, 99999)}{random.randint(10000, 99999)}",
                device_fingerprint=f"fp_{customer_id}_{random.randint(1000, 9999)}"
            )
            db.add(new_customer)
            db.flush()
        
        # 2. Create Order record (so Recovery KPIs update)
        order_id = f"order_{customer_id}_{random.randint(100, 999)}"
        new_order = Order(
            id=order_id,
            merchant_id=merchant_id,
            customer_id=customer_id,
            amount_paise=499900,
            status="attempted"
        )
        db.add(new_order)
        db.flush()
        
        # 3. Create failed Transaction record
        tx_id = f"pay_{customer_id}_{random.randint(100, 999)}"
        new_tx = Transaction(
            id=tx_id,
            order_id=order_id,
            amount_paise=499900,
            status="failed",
            method="card",
            error_code="BAD_REQUEST_ERROR",
            error_description="Payment processing failed - Cart Abandonment Intercepted"
        )
        db.add(new_tx)
        
        # Check active policies to dynamically set discount
        active_policies = db.query(PolicyRule).filter(PolicyRule.merchant_id == merchant_id, PolicyRule.is_active == True).all()
        discount_offered = 5 # default
        policy_name = "default_5%"
        
        if active_policies:
            import re
            combined_text = " ".join([p.description + " " + str(p.parameters) for p in active_policies])
            matches = re.findall(r'(\d+(?:\.\d+)?)%', combined_text)
            if matches:
                percentages = [float(m) for m in matches]
                discount_offered = min(percentages) # Use the lowest initial discount specified
                policy_name = active_policies[0].name

        # 4. Log Action Receipt (so Alerts tab and Simulator Feed populate)
        narrative = f"🤖 Cyvault Recovery AI offered {discount_offered}% discount to Customer {customer_id} | Policy: {policy_name} | Status: Awaiting Response"
        log_action_receipt(db, merchant_id, "offer_discount", order_id, "ALLOWED", narrative)
        
        db.commit()
        return {"status": "success", "simulated_event": "payment.failed", "customer_id": customer_id, "order_id": order_id, "discount_offered": discount_offered}
        
    elif scenario == "fraud_attack":
        # Create 3 customers with SAME device fingerprint to trigger fraud ring detection
        shared_fingerprint = f"fp_FRAUD_{random.randint(1000, 9999)}"
        
        for i in range(3):
            fraud_cust_id = f"fraud_{customer_id}_{i}"
            existing = db.query(Customer).filter(Customer.id == fraud_cust_id).first()
            if not existing:
                db.add(Customer(
                    id=fraud_cust_id,
                    merchant_id=merchant_id,
                    email=f"suspicious{i}@tempmail.xyz",
                    phone=f"+91-{random.randint(70000, 99999)}{random.randint(10000, 99999)}",
                    device_fingerprint=shared_fingerprint
                ))
            
            # Create failed order for each
            fraud_order_id = f"order_fraud_{customer_id}_{i}"
            db.add(Order(
                id=fraud_order_id,
                merchant_id=merchant_id,
                customer_id=fraud_cust_id,
                amount_paise=random.randint(100000, 999900),
                status="attempted"
            ))
            
        # Log BLOCKED action receipt
        narrative = f"🛡️ BLOCKED: Fraud ring detected. 3 accounts sharing device fingerprint {shared_fingerprint}. All recovery actions suspended."
        log_action_receipt(db, merchant_id, "fraud_block", f"ring_{customer_id}", "BLOCKED", narrative)
        
        db.commit()
        return {"status": "fraud_ring_simulated", "shared_fingerprint": shared_fingerprint}
        
    elif scenario == "settlement":
        # Create a Settlement record
        setl_id = f"setl_{customer_id}_{random.randint(100, 999)}"
        utr = f"UTR_{random.randint(100000, 999999)}"
        new_settlement = Settlement(
            id=setl_id,
            merchant_id=merchant_id,
            amount_paise=499900,
            fees_paise=4999,
            tax_paise=900,
            utr=utr,
            status="processed"
        )
        db.add(new_settlement)
        
        narrative = f"💰 Settlement processed: ₹4,999.00 | UTR: {utr} | Status: Processed"
        log_action_receipt(db, merchant_id, "settlement_processed", setl_id, "ALLOWED", narrative)
        
        db.commit()
        return {"status": "success", "simulated_event": "settlement.processed", "settlement_id": setl_id}
        
    elif scenario == "refund":
        narrative = f"↩️ Refund initiated for Customer {customer_id} | Amount: ₹4,999.00 | ETA: 5-7 business days"
        log_action_receipt(db, merchant_id, "refund_initiated", f"refund_{customer_id}", "ALLOWED", narrative)
        
        db.commit()
        return {"status": "success", "simulated_event": "refund.created"}
        
    elif scenario == "payment_success":
        # Check if customer exists, if not create
        existing_customer = db.query(Customer).filter(Customer.id == customer_id).first()
        if not existing_customer:
            new_customer = Customer(
                id=customer_id,
                merchant_id=merchant_id,
                email=f"{customer_id.lower()}@customer.demo",
                phone=f"+91-{random.randint(70000, 99999)}{random.randint(10000, 99999)}",
                device_fingerprint=f"fp_{customer_id}_{random.randint(1000, 9999)}"
            )
            db.add(new_customer)
            db.flush()
            
        # Create successful Order
        amount_to_pay = payload.get("amount", 499900)
        order_id = f"order_{customer_id}_{random.randint(100, 999)}"
        new_order = Order(
            id=order_id,
            merchant_id=merchant_id,
            customer_id=customer_id,
            amount_paise=amount_to_pay,
            status="paid"
        )
        db.add(new_order)
        db.flush()
        
        # Create successful Transaction
        tx_id = f"pay_{customer_id}_{random.randint(100, 999)}"
        new_tx = Transaction(
            id=tx_id,
            order_id=order_id,
            amount_paise=amount_to_pay,
            status="captured",
            method="card",
            risk_score=0.1
        )
        db.add(new_tx)
        
        # Optionally create a Settlement automatically
        setl_id = f"setl_{customer_id}_{random.randint(100, 999)}"
        utr = f"UTR_{random.randint(100000, 999999)}"
        new_settlement = Settlement(
            id=setl_id,
            merchant_id=merchant_id,
            amount_paise=amount_to_pay,
            fees_paise=int(amount_to_pay * 0.02),
            tax_paise=int(amount_to_pay * 0.0036),
            utr=utr,
            status="processed"
        )
        db.add(new_settlement)
        
        narrative = f"✅ Payment of ₹{amount_to_pay/100:.2f} successful for Customer {customer_id}."
        log_action_receipt(db, merchant_id, "payment_success", order_id, "ALLOWED", narrative)
        
        db.commit()
        return {"status": "success", "simulated_event": "payment.captured", "order_id": order_id}
        
    else:
        raise HTTPException(status_code=400, detail="Unknown scenario")

# ==========================================
# DASHBOARD ENDPOINTS
# ==========================================
@app.get("/api/merchants/{merchant_id}/dashboard")
def get_dashboard_kpis(merchant_id: str, db: Session = Depends(get_db)):
    orders = db.query(Order).filter(Order.merchant_id == merchant_id).all()
    transactions = db.query(Transaction).join(Order).filter(Order.merchant_id == merchant_id).all()
    
    at_risk = 0
    recovered = 0
    blocked = 0
    rate = 0.0
    recent_cases = []
    
    if orders:
        failed_orders = [o for o in orders if o.status == 'attempted'] 
        recovered_orders = [o for o in orders if o.status == 'paid']
        
        at_risk = sum(o.amount_paise for o in failed_orders) / 100
        recovered = sum(o.amount_paise for o in recovered_orders) / 100
        
        if (at_risk + recovered) > 0:
            rate = round((recovered / (at_risk + recovered)) * 100, 1)
            
        # Optional: Add actual cases from DB if needed
        for o in orders[:5]:
            recent_cases.append({
                "order_id": o.id,
                "customer": o.customer_id,
                "amount": o.amount_paise / 100,
                "type": "Recovery" if o.status == 'paid' else "Abandonment",
                "intervention": "Discount AI" if o.status == 'paid' else "None",
                "status": o.status,
                "color": "emerald" if o.status == "paid" else "cyan"
            })
            
    return {
        "at_risk": at_risk,
        "recovered": recovered,
        "recovery_rate": rate,
        "blocked": blocked,
        "recent_cases": recent_cases
    }

@app.get("/api/merchants/{merchant_id}/customers")
def get_customers(merchant_id: str, db: Session = Depends(get_db)):
    customers = db.query(Customer).filter(Customer.merchant_id == merchant_id).all()
    return [{"id": c.id, "email": c.email, "phone": c.phone, "device_fingerprint": c.device_fingerprint, "is_blocked": getattr(c, 'is_blocked', False), "created_at": c.created_at.isoformat()} for c in customers]

class BlockCustomerRequest(BaseModel):
    device_fingerprint: str = None
    customer_id: str = None

@app.post("/api/merchants/{merchant_id}/customers/block")
def block_customer_cluster(merchant_id: str, req: BlockCustomerRequest, db: Session = Depends(get_db)):
    if req.device_fingerprint:
        fp = req.device_fingerprint.replace("dev_", "")
        customers = db.query(Customer).filter(Customer.merchant_id == merchant_id, Customer.device_fingerprint == fp).all()
        for c in customers:
            c.is_blocked = True
    elif req.customer_id:
        c = db.query(Customer).filter(Customer.merchant_id == merchant_id, Customer.id == req.customer_id).first()
        if c:
            c.is_blocked = True
    db.commit()
    return {"status": "success"}

@app.get("/api/merchants/{merchant_id}/graph")
def get_graph_data(merchant_id: str, db: Session = Depends(get_db)):
    customers = db.query(Customer).filter(Customer.merchant_id == merchant_id).all()
    
    nodes = []
    edges = []
    
    if not customers:
        return {"nodes": [], "edges": []}
        
    # Group customers by device fingerprint
    device_to_customers = {}
    for c in customers:
        if c.device_fingerprint:
            if c.device_fingerprint not in device_to_customers:
                device_to_customers[c.device_fingerprint] = []
            device_to_customers[c.device_fingerprint].append(c)
            
    # Build graph: Only include devices that have > 1 customer (fraud ring)
    # or just include all of them if we want to show the full network.
    # Let's include all, but properly unique device nodes.
    added_devices = set()
    
    for c in customers:
        nodes.append({"id": c.id, "label": c.email or c.id, "type": "customer", "group": 1})
        if c.device_fingerprint:
            dev_id = f"dev_{c.device_fingerprint}"
            if dev_id not in added_devices:
                nodes.append({"id": dev_id, "label": c.device_fingerprint, "type": "device", "group": 2})
                added_devices.add(dev_id)
            edges.append({"source": c.id, "target": dev_id})
            
    return {"nodes": nodes, "edges": edges}

@app.get("/api/merchants/{merchant_id}/alerts")
def get_alerts(merchant_id: str, db: Session = Depends(get_db)):
    receipts = db.query(ActionReceipt).filter(ActionReceipt.merchant_id == merchant_id).order_by(ActionReceipt.created_at.desc()).limit(20).all()
    
    alerts = []
    for r in receipts:
        alerts.append({
            "id": r.id,
            "action_type": r.action_type,
            "decision": r.decision,
            "narrative": r.narrative,
            "created_at": r.created_at.isoformat()
        })
    return alerts

@app.get("/api/merchants/{merchant_id}/reconciliation")
def get_reconciliation(merchant_id: str, db: Session = Depends(get_db)):
    settlements = db.query(Settlement).filter(Settlement.merchant_id == merchant_id).all()
    
    if not settlements:
        return []
        
    return [{
        "id": s.id,
        "amount_paise": s.amount_paise,
        "fees_paise": s.fees_paise,
        "tax_paise": s.tax_paise,
        "utr": s.utr,
        "status": s.status,
        "created_at": s.created_at.isoformat()
    } for s in settlements]

class CustomerChatRequest(BaseModel):
    message: str
    merchant_id: str
    customer_id: str

@app.post("/api/customer/chat")
def customer_chat(req: CustomerChatRequest, db: Session = Depends(get_db)):
    # Get active policies to inform the AI
    active_policies = db.query(PolicyRule).filter(PolicyRule.merchant_id == req.merchant_id, PolicyRule.is_active == True).all()
    policy_context = ""
    if active_policies:
        policy_context = "Active Merchant Policies (You MUST obey these rules):\n" + "\n".join([f"- {p.name}: {p.description}" for p in active_policies])
    
    prompt = f"""You are Cyvault AI Support, a helpful and professional customer support bot for a merchant's storefront.
The customer's payment just failed. They are reaching out to you.
{policy_context}
If they ask for a discount, check the policies. If a discount is allowed, offer the exact percentage specified in the policy. If no policy exists, offer a default 5% discount.
If they ask to process an order or refund, assist them politely.
Keep responses concise, 1-2 sentences max.
Customer says: "{req.message}"
Respond politely:"""

    try:
        reply = get_llm_response(prompt, task_type="general")
    except Exception as e:
        reply = "I can help with your order. What do you need?"
        
    action_taken = None
    
    # Heuristic to log if a discount was likely offered
    message_lower = req.message.lower()
    if "discount" in message_lower or "%" in reply:
        action_taken = {
            "type": "discount_offered",
            "narrative": f"Cyvault Recovery AI engaged in discount negotiation with Customer {req.customer_id} via Chatbot | Status: Active"
        }
        
        # Log action
        import uuid
        receipt = ActionReceipt(
            id=f"act_{uuid.uuid4().hex[:8]}",
            merchant_id=req.merchant_id,
            action_type="offer_discount",
            entity_id=req.customer_id,
            decision="ALLOWED",
            narrative=action_taken["narrative"]
        )
        db.add(receipt)
        db.commit()
        
    return {"reply": reply, "action_taken": action_taken}

# ==========================================
# MERCHANT INSIGHT CHATBOT (Dashboard Chatbot)
# ==========================================
class MerchantChatRequest(BaseModel):
    message: str
    merchant_id: str = "demo"

@app.post("/api/chat")
def merchant_insight_chat(req: MerchantChatRequest, db: Session = Depends(get_db)):
    """
    The Merchant-facing Insight Bot.
    Fetches recent data from the DB as context, then uses LLM to answer.
    """
    merchant_id = req.merchant_id
    user_question = req.message
    
    # Gather context from DB for RAG-style response
    recent_alerts = db.query(ActionReceipt).filter(
        ActionReceipt.merchant_id == merchant_id
    ).order_by(ActionReceipt.created_at.desc()).limit(10).all()
    
    customers = db.query(Customer).filter(Customer.merchant_id == merchant_id).all()
    orders = db.query(Order).filter(Order.merchant_id == merchant_id).all()
    settlements = db.query(Settlement).filter(Settlement.merchant_id == merchant_id).all()
    
    # Build context string
    context_parts = []
    
    context_parts.append(f"Merchant has {len(customers)} customers, {len(orders)} orders, {len(settlements)} settlements.")
    
    if recent_alerts:
        context_parts.append("Recent AI Actions:")
        for a in recent_alerts[:5]:
            context_parts.append(f"  - [{a.decision}] {a.action_type}: {a.narrative}")
    
    if orders:
        failed_orders = [o for o in orders if o.status == 'attempted']
        paid_orders = [o for o in orders if o.status == 'paid']
        total_at_risk = sum(o.amount_paise for o in failed_orders) / 100
        total_recovered = sum(o.amount_paise for o in paid_orders) / 100
        context_parts.append(f"Revenue at risk: ₹{total_at_risk:.0f}, Recovered: ₹{total_recovered:.0f}")
    
    if settlements:
        total_settled = sum(s.amount_paise for s in settlements) / 100
        context_parts.append(f"Total settlements: ₹{total_settled:.0f}")
    
    context_str = "\n".join(context_parts)
    
    prompt = f"""You are Cyvault's AI Insights Agent for a merchant dashboard.
You help merchants understand their revenue recovery, fraud prevention, and financial data.
Be concise, professional, and helpful. Use bullet points for clarity.
Never share sensitive data like full card numbers or passwords.
If the user is just saying hello or asking a casual greeting (like 'hi', 'hey', 'hello', etc.), you MUST reply ONLY with exactly: "Hello! 👋 How can I help you today?". Do NOT add any extra information, do NOT list out a menu, and do NOT mention their stats.

Merchant Data Context:
{context_str}

Merchant Question: {user_question}

Respond in a helpful, concise way. If the data doesn't contain the answer, say so honestly."""

    try:
        reply = get_llm_response(prompt, task_type="settlement_qa")
        
        # Strip markdown formatting for cleaner UI display
        import re
        reply = re.sub(r'[*_]{1,2}', '', reply) # Remove bold/italics
        reply = re.sub(r'^#+\s+', '', reply, flags=re.MULTILINE) # Remove headers
        reply = re.sub(r'`+', '', reply) # Remove code ticks
        
    except Exception as e:
        reply = f"I encountered an error processing your request. Error: {str(e)}"
    
    return {"reply": reply}

# ==========================================
# POLICY ENGINE ENDPOINTS
# ==========================================
class PolicyCompileRequest(BaseModel):
    natural_language_rule: str

@app.post("/api/merchants/{merchant_id}/policies/compile")
def compile_policy(merchant_id: str, req: PolicyCompileRequest):
    """
    Uses LLM to convert natural language rules into structured JSON.
    """
    prompt = f"""
    You are an AI Policy Compiler for Cyvault, a payment recovery system.
    Convert this natural language rule into a strict JSON structure.
    Rule: "{req.natural_language_rule}"
    
    You must return ONLY valid JSON in this exact format, with no markdown formatting or backticks:
    {{
        "rule_name": "short_underscore_name",
        "description": "Clear description of what this does",
        "condition": "The logical condition (e.g. customer.chargebacks_30d > 2)",
        "action": "BLOCK | ALLOW | FLAG",
        "target": "auto-retry | transaction | manual review"
    }}
    """
    
    try:
        reply = get_llm_response(prompt, task_type="settlement_qa") # reusing task_type for simplicity
        
        # Clean up any potential markdown ticks the LLM might stubbornly add
        import re
        reply = re.sub(r'^```json\s*', '', reply)
        reply = re.sub(r'^```\s*', '', reply)
        reply = re.sub(r'\s*```$', '', reply)
        
        compiled_json = json.loads(reply)
        return {"status": "success", "compiled": compiled_json}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to compile rule: {str(e)}")

class PolicyActivateRequest(BaseModel):
    name: str
    description: str
    condition: str
    action: str
    target: str

@app.post("/api/merchants/{merchant_id}/policies/activate")
def activate_policy(merchant_id: str, req: PolicyActivateRequest, db: Session = Depends(get_db)):
    """
    Saves the compiled policy rule to the database.
    """
    # Ensure merchant exists before doing anything (crucial for fresh DBs)
    existing_merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not existing_merchant:
        new_merchant = Merchant(
            id=merchant_id,
            name=f"Demo Merchant {merchant_id[-4:]}",
            email=f"{merchant_id}@demo.com",
            password_hash="demo_hash"
        )
        db.add(new_merchant)
        db.commit()
        
    rule_id = f"pol_{uuid.uuid4().hex[:8]}"
    
    new_rule = PolicyRule(
        id=rule_id,
        merchant_id=merchant_id,
        name=req.name,
        description=req.description,
        rule_type="custom",
        parameters={
            "condition": req.condition,
            "action": req.action,
            "target": req.target
        },
        is_active=True
    )
    
    db.add(new_rule)
    
    # Log the action
    from backend.action_receipt_logger import log_action_receipt
    log_action_receipt(
        db, 
        merchant_id, 
        "policy_activated", 
        rule_id, 
        "ALLOWED", 
        f"✅ Activated new custom policy: {req.name}"
    )
    
    db.commit()
    return {"status": "success", "policy_id": rule_id}

@app.get("/api/merchants/{merchant_id}/policies")
def get_policies(merchant_id: str, db: Session = Depends(get_db)):
    """
    Fetches all active policies for the merchant.
    """
    policies = db.query(PolicyRule).filter(PolicyRule.merchant_id == merchant_id).order_by(PolicyRule.created_at.desc()).all()
    
    return [{
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "is_active": p.is_active,
        "parameters": p.parameters,
        "created_at": p.created_at.isoformat() if p.created_at else None
    } for p in policies]

@app.delete("/api/merchants/{merchant_id}/policies/{policy_id}")
def delete_policy(merchant_id: str, policy_id: str, db: Session = Depends(get_db)):
    """
    Deletes (or deactivates) a policy rule.
    """
    policy = db.query(PolicyRule).filter(PolicyRule.id == policy_id, PolicyRule.merchant_id == merchant_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
        
    db.delete(policy)
    db.commit()
    return {"status": "success"}

@app.get("/api/merchants/{merchant_id}/radar")
def get_radar_data(merchant_id: str, db: Session = Depends(get_db)):
    """
    Leakage Radar Analytics.
    Returns 7-day trend of revenue at risk vs recovered, and top anomalies.
    """
    orders = db.query(Order).filter(Order.merchant_id == merchant_id).order_by(Order.created_at.desc()).all()
    
    # In a real app, group by actual dates. For the demo, we'll build a synthetic 7-day trend
    # and accurately reflect the DB state in the most recent day ("Today")
    import random
    from datetime import datetime, timedelta
    
    trend = []
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    today_idx = datetime.now().weekday()
    
    for i in range(6, 0, -1):
        idx = (today_idx - i) % 7
        trend.append({
            "day": days[idx],
            "at_risk": random.randint(10000, 50000),
            "recovered": random.randint(5000, 20000)
        })
        
    # Real data for "Today"
    today_failed = [o for o in orders if o.status == 'attempted']
    today_paid = [o for o in orders if o.status == 'paid']
    
    today_risk = sum(o.amount_paise for o in today_failed) / 100
    today_recovered = sum(o.amount_paise for o in today_paid) / 100
    
    trend.append({
        "day": "Today",
        "at_risk": today_risk,
        "recovered": today_recovered
    })
    
    # Anomalies: Largest failed orders
    anomalies = []
    for o in today_failed[:5]:
        anomalies.append({
            "id": o.id,
            "amount": o.amount_paise / 100,
            "customer_id": o.customer_id,
            "time": o.created_at.strftime("%H:%M")
        })
        
    # Sort anomalies by amount descending
    anomalies.sort(key=lambda x: x["amount"], reverse=True)
    
    return {
        "trend": trend,
        "anomalies": anomalies,
        "total_leakage": today_risk - today_recovered
    }

# ==========================================
# MERCHANT SETTINGS ENDPOINT
# ==========================================
@app.get("/api/merchants/{merchant_id}/settings")
def get_merchant_settings(merchant_id: str, db: Session = Depends(get_db)):
    """
    Returns merchant profile and masked API keys for the Settings page.
    """
    merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not merchant:
        if merchant_id == "demo_merchant_1":
            return {
                "profile": {
                    "name": "Demo Merchant",
                    "company_name": "Acme Corp",
                    "email": "demo@cyvault.io",
                    "industry": "E-commerce",
                    "created_at": "2023-01-01T00:00:00"
                },
                "api_keys": {
                    "key_id": "rzp_test_demo123",
                    "key_secret_masked": "demo••••••••••••",
                    "webhook_secret_masked": "whsec••••••••",
                    "webhook_url": f"https://api.cyvault.io/v1/webhooks/incoming/{merchant_id}"
                }
            }
        raise HTTPException(status_code=404, detail="Merchant not found")
    
    # Mask API keys for display (show first 8 and last 4 chars)
    def mask_key(key_str: str) -> str:
        if not key_str or len(key_str) < 12:
            return "••••••••"
        return key_str[:8] + "••••" + key_str[-4:]
    
    razorpay_key = merchant.get_razorpay_key()
    razorpay_secret = merchant.get_razorpay_secret()
    webhook_secret = merchant.get_webhook_secret()
    
    return {
        "profile": {
            "name": merchant.name,
            "company_name": merchant.company_name or "",
            "email": merchant.email,
            "industry": merchant.industry or "",
            "created_at": merchant.created_at.isoformat() if merchant.created_at else ""
        },
        "api_keys": {
            "key_id": razorpay_key if razorpay_key else "Not configured",
            "key_secret_masked": mask_key(razorpay_secret),
            "webhook_secret_masked": mask_key(webhook_secret),
            "webhook_url": f"https://api.cyvault.io/v1/webhooks/incoming/{merchant_id}"
        }
    }

@app.put("/api/merchants/{merchant_id}/profile")
def update_merchant_profile(merchant_id: str, payload: dict, db: Session = Depends(get_db)):
    """
    Updates merchant profile fields (name, company_name).
    """
    merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")
    
    if "name" in payload:
        merchant.name = payload["name"]
    if "company_name" in payload:
        merchant.company_name = payload["company_name"]
    
    db.commit()
    return {"status": "updated"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app:app", host="0.0.0.0", port=settings.PORT, reload=settings.DEBUG)
