"""
FILE: policy_enforcer.py
PURPOSE: Evaluates actions deterministically against merchant policies to prevent unauthorized AI actions.
USED BY: recovery_orchestrator.py, app.py
USES: database_schema.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
import json
from sqlalchemy.orm import Session

# Import from our own project files
from backend.database_schema import PolicyRule, ActionReceipt, Order

# ──────────────────────────────────────────────
# CONSTANTS
# ──────────────────────────────────────────────
DECISION_ALLOWED = "ALLOWED"
DECISION_BLOCKED = "BLOCKED"
DECISION_NEEDS_APPROVAL = "NEEDS_APPROVAL"

# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

def evaluate_action(db: Session, merchant_id: str, action_type: str, parameters: dict) -> dict:
    """
    Evaluates an action against all active policies for a merchant.
    
    What it does:
        - Fetches active rules for the merchant
        - Runs specific checks based on the rule type
        - Returns a definitive allowed/blocked status
        
    Args:
        db: Database session
        merchant_id: The ID of the merchant
        action_type: What the AI wants to do (e.g., 'offer_discount', 'retry_payment')
        parameters: Specific details (e.g., {'discount_percent': 10})
        
    Returns:
        dict: {"status": "ALLOWED"/"BLOCKED", "reason": "Explanation"}
    """
    # Get all active policies for this merchant
    policies = db.query(PolicyRule).filter(
        PolicyRule.merchant_id == merchant_id,
        PolicyRule.is_active == True
    ).all()
    
    # If no policies exist, default to needs approval for safety
    if not policies:
        _notify_merchant(db, merchant_id, action_type, DECISION_NEEDS_APPROVAL, "No active policies found. Manual approval required.")
        return {"status": DECISION_NEEDS_APPROVAL, "reason": "No active policies found. Manual approval required."}
        
    # Evaluate each policy
    for policy in policies:
        if policy.rule_type == "discount_limit" and action_type == "offer_discount":
            result = check_spend_limit(policy.parameters, parameters)
            if result["status"] == DECISION_BLOCKED:
                _notify_merchant(db, merchant_id, action_type, DECISION_BLOCKED, result["reason"])
                return result
                
        elif policy.rule_type == "velocity_check" and action_type == "retry_payment":
            result = check_retry_cap(policy.parameters, parameters)
            if result["status"] == DECISION_BLOCKED:
                _notify_merchant(db, merchant_id, action_type, DECISION_BLOCKED, result["reason"])
                return result
                
    return {"status": DECISION_ALLOWED, "reason": "Action passed all active policies."}

def _notify_merchant(db: Session, merchant_id: str, action_type: str, status: str, reason: str):
    """Helper to send an email alert in a background thread."""
    from backend.database_schema import Merchant
    from backend.notification_engine import _send_email_sync
    import threading
    from backend.config import settings
    
    merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    recipient = merchant.email if merchant else settings.SMTP_EMAIL
    
    subject = f"CyVault Alert: Action {status}"
    event_type = "alert" if status == DECISION_BLOCKED else "info"
    
    def task():
        _send_email_sync(
            recipient=recipient,
            subject=subject,
            event_type=event_type,
            title=f"AI Action {status}",
            message=f"An automated action was evaluated against your policies and was marked as {status}.",
            details={
                "Action Attempted": action_type,
                "Reason": reason
            }
        )
    
    threading.Thread(target=task, daemon=True).start()


def check_spend_limit(policy_params: dict, action_params: dict) -> dict:
    """
    Checks if a proposed discount exceeds the maximum allowed percentage.
    """
    max_allowed = policy_params.get("max_discount_percent", 0)
    proposed_discount = action_params.get("discount_percent", 0)
    
    if proposed_discount > max_allowed:
        return {
            "status": DECISION_BLOCKED, 
            "reason": f"Proposed discount ({proposed_discount}%) exceeds maximum limit ({max_allowed}%)."
        }
    
    return {"status": DECISION_ALLOWED, "reason": "Within limit."}


def check_retry_cap(policy_params: dict, action_params: dict) -> dict:
    """
    Checks if the distance or velocity exceeds the allowed threshold.
    (Simplified logic for hackathon demo)
    """
    # Example logic: if IP distance is too far, block it
    max_distance = policy_params.get("max_distance_km", 50)
    current_distance = action_params.get("distance_km", 0)
    
    if current_distance > max_distance:
        return {
            "status": DECISION_BLOCKED, 
            "reason": f"Transaction origin ({current_distance}km) is too far. Blocked by velocity policy."
        }
        
    return {"status": DECISION_ALLOWED, "reason": "Within safe distance."}
