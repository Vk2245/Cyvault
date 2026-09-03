from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

from backend.config import settings
from backend.database_schema import get_db, init_db, Merchant, Order, Settlement
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
def simulate_webhook(payload: dict):
    """
    Directly triggers the AI pipelines without Razorpay Signature.
    Used exclusively for the split-screen Hackathon Demo.
    """
    scenario = payload.get("scenario")
    merchant_id = payload.get("merchant_id", "demo_merchant_1")
    customer_id = payload.get("customer_id", "sim_demo_999")
    
    event_dict = {}
    
    if scenario == "recovery_fail":
        event_dict = {
            "event": "payment.failed",
            "payload": {
                "payment": {
                    "entity": {
                        "id": f"pay_{customer_id}",
                        "order_id": f"order_{customer_id}",
                        "error_code": "BAD_REQUEST_ERROR",
                        "error_description": "Payment failed"
                    }
                }
            }
        }
    elif scenario == "fraud_attack":
        # Simulate same device failing multiple times to trigger Entity Graph
        for _ in range(3):
             event_dict = {
                 "event": "payment.failed",
                 "payload": {
                     "payment": {
                         "entity": {
                             "id": f"pay_fraud_{customer_id}_{_}",
                             "order_id": f"order_fraud_{customer_id}",
                             "error_code": "BAD_REQUEST_ERROR"
                         }
                     }
                 }
             }
             parse_webhook_event(event_dict)
        return {"status": "fraud_ring_simulated"}
        
    elif scenario == "settlement":
        event_dict = {
            "event": "settlement.processed",
            "payload": {
                "settlement": {
                    "entity": {
                        "id": "setl_demo999",
                        "utr": "UTR_SIM_4455",
                        "amount": 499900 # 4999 INR
                    }
                }
            }
        }
    elif scenario == "refund":
        event_dict = {
            "event": "refund.created",
            "payload": {}
        }
    else:
        raise HTTPException(status_code=400, detail="Unknown scenario")
        
    parse_webhook_event(event_dict)
    return {"status": "success", "simulated_event": event_dict["event"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app:app", host="0.0.0.0", port=settings.PORT, reload=settings.DEBUG)
