"""
FILE: action_receipt_logger.py
PURPOSE: Records all AI decisions (allowed/blocked) into an immutable audit trail.
USED BY: recovery_orchestrator.py, app.py
USES: database_schema.py, utils.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
import uuid
from sqlalchemy.orm import Session

# Import from our own project files
from backend.database_schema import ActionReceipt
from backend.utils import get_current_timestamp

# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

def log_action_receipt(
    db: Session, 
    merchant_id: str, 
    action_type: str, 
    entity_id: str, 
    decision: str, 
    narrative: str
) -> str:
    """
    Creates an immutable audit record of an AI decision.
    
    What it does:
        - Generates a unique receipt ID
        - Creates a new ActionReceipt record
        - Saves it to the database
        
    Args:
        db: Database session
        merchant_id: The ID of the merchant
        action_type: The type of action (e.g., "offer_discount")
        entity_id: The ID of the order/customer this action targets
        decision: The outcome ("ALLOWED" or "BLOCKED")
        narrative: Plain English explanation for the decision
        
    Returns:
        The generated receipt ID string
    """
    receipt_id = f"receipt_{uuid.uuid4().hex[:14]}"
    
    receipt = ActionReceipt(
        id=receipt_id,
        merchant_id=merchant_id,
        action_type=action_type,
        entity_id=entity_id,
        decision=decision,
        narrative=narrative
    )
    
    try:
        db.add(receipt)
        db.commit()
        print(f"Logged ActionReceipt [{receipt_id}] -> {decision}")
        return receipt_id
    except Exception as e:
        db.rollback()
        print(f"ERROR: Could not save ActionReceipt. Reason: {e}")
        return ""
