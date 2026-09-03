"""
FILE: recovery_orchestrator.py
PURPOSE: The core engine that stitches together LLM negotiation, fraud detection, and policy enforcement to recover failed payments.
USED BY: webhook_handler.py
USES: database_schema.py, policy_enforcer.py, entity_graph_builder.py, action_receipt_logger.py, llm_provider_router.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
import json
from sqlalchemy.orm import Session

# Import from our own project files
from backend.database_schema import ActionReceipt, Order, Transaction, Customer
from backend.policy_enforcer import evaluate_action, DECISION_BLOCKED
from backend.entity_graph_builder import detect_fraud_ring
from backend.action_receipt_logger import log_action_receipt
from backend.llm_provider_router import get_llm_response

# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

def start_recovery(db: Session, merchant_id: str, transaction_id: str) -> dict:
    """
    Main entry point for AI Revenue Recovery.
    
    What it does:
        1. Checks fraud (Entity Graph).
        2. Counts previous recovery attempts.
        3. Uses LLM to dynamically negotiate a discount.
        4. Validates the discount against Merchant Policy.
        5. Logs the action.
    """
    print(f"\n--- Starting Recovery for Transaction {transaction_id} ---")
    
    # 1. Fetch Context
    tx = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not tx:
        return {"status": "error", "message": "Transaction not found."}
        
    order = db.query(Order).filter(Order.id == tx.order_id).first()
    
    # 2. Fraud Check (Phase 3)
    fraud_data = detect_fraud_ring(db, merchant_id, order.customer_id)
    if fraud_data["is_fraud_ring"]:
        narrative = f"Blocked recovery attempt. High risk score ({fraud_data['risk_score']}) due to {fraud_data['connected_accounts']} connected accounts."
        log_action_receipt(db, merchant_id, "offer_discount", order.id, DECISION_BLOCKED, narrative)
        return {"status": "blocked", "message": "Fraud ring detected. Recovery aborted."}

    # 3. Check Previous Attempts (Stateful Tracking)
    past_attempts = db.query(ActionReceipt).filter(
        ActionReceipt.merchant_id == merchant_id,
        ActionReceipt.entity_id == order.id,
        ActionReceipt.action_type == "offer_discount"
    ).all()
    
    attempt_count = len(past_attempts)
    
    if attempt_count >= 3: # Hard limit for demo
        log_action_receipt(db, merchant_id, "offer_discount", order.id, DECISION_BLOCKED, "Exceeded maximum of 3 recovery attempts.")
        return {"status": "exhausted", "message": "Max recovery attempts reached."}

    # 4. AI Dynamic Negotiation
    proposed_discount = _generate_ai_discount_decision(attempt_count, fraud_data["risk_score"])
    print(f"[Recovery AI] LLM proposed discount: {proposed_discount}% (Attempt: {attempt_count+1})")
    
    # 5. Policy Check (Phase 2)
    action_params = {"discount_percent": proposed_discount, "distance_km": 10} # distance mocked for demo
    policy_result = evaluate_action(db, merchant_id, "offer_discount", action_params)
    
    if policy_result["status"] == DECISION_BLOCKED:
        narrative = f"AI proposed {proposed_discount}% discount, but it was blocked by Merchant Policy: {policy_result['reason']}"
        log_action_receipt(db, merchant_id, "offer_discount", order.id, DECISION_BLOCKED, narrative)
        return {"status": "blocked_by_policy", "message": policy_result["reason"]}
        
    # 6. Execute & Log (Success)
    narrative = f"AI successfully negotiated a {proposed_discount}% discount link for the customer (Attempt {attempt_count+1}). Risk was low ({fraud_data['risk_score']})."
    log_action_receipt(db, merchant_id, "offer_discount", order.id, policy_result["status"], narrative)
    
    print(f"--- Recovery Orchestrator Finished Successfully ---")
    return {
        "status": "success", 
        "discount_offered": proposed_discount,
        "message": narrative
    }

def _generate_ai_discount_decision(attempt_count: int, risk_score: float) -> int:
    """
    Asks the LLM to decide the discount percentage based on current state.
    """
    prompt = f"""
    You are an AI Revenue Recovery Agent. A customer's payment just failed.
    
    Context:
    - Previous recovery attempts for this order: {attempt_count}
    - Customer Risk Score (0.0 to 1.0): {risk_score}
    
    Rules:
    - If attempt is 0, offer a small discount (e.g. 5-7%).
    - If attempt is > 0, escalate the discount to incentivize them (e.g. 8-15%).
    - If risk score is above 0.3, be conservative with the discount.
    
    Respond ONLY with a valid JSON object in this exact format, nothing else:
    {{"discount_percent": <integer>}}
    """
    
    try:
        response_text = get_llm_response(prompt, task_type="policy_compile")
        
        # Clean potential markdown formatting from LLM
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
            
        decision = json.loads(response_text)
        return int(decision.get("discount_percent", 5))
    except Exception as e:
        print(f"[Recovery AI] LLM Parsing failed, falling back to deterministic: {e}")
        # Deterministic fallback based on attempts
        return 5 + (attempt_count * 2) 
