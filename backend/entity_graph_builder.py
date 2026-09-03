"""
FILE: entity_graph_builder.py
PURPOSE: Uses Graph Theory (NetworkX) to connect customers sharing device fingerprints to detect fraud rings.
USED BY: recovery_orchestrator.py
USES: database_schema.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
import networkx as nx
from sqlalchemy.orm import Session
from sqlalchemy import func

# Import from our own project files
from backend.database_schema import Customer, Transaction, Order

# ──────────────────────────────────────────────
# CONSTANTS
# ──────────────────────────────────────────────
MAX_CONNECTED_ACCOUNTS_THRESHOLD = 2
HIGH_RISK_SCORE = 0.85

# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

def detect_fraud_ring(db: Session, merchant_id: str, customer_id: str) -> dict:
    """
    Analyzes graph connections to detect if a customer is part of a fraud ring.
    
    What it does:
        - Finds the customer's device fingerprint.
        - Checks how many other accounts share this fingerprint.
        - Analyzes the failure rate of transactions in this cluster.
        - Calculates a risk score (0.0 to 1.0).
        
    Args:
        db: Database session
        merchant_id: The ID of the merchant
        customer_id: The ID of the customer attempting a transaction/recovery
        
    Returns:
        dict: Contains is_fraud_ring (boolean), risk_score (float), and connected_accounts (int)
    """
    # 1. Fetch the target customer
    target_customer = db.query(Customer).filter(
        Customer.id == customer_id,
        Customer.merchant_id == merchant_id
    ).first()
    
    if not target_customer or not target_customer.device_fingerprint:
        # Cannot build graph without device fingerprint
        return {"is_fraud_ring": False, "risk_score": 0.1, "connected_accounts": 1}
        
    device_fp = target_customer.device_fingerprint
    
    # 2. Find all customers sharing this device fingerprint (The "Ring")
    connected_customers = db.query(Customer).filter(
        Customer.merchant_id == merchant_id,
        Customer.device_fingerprint == device_fp
    ).all()
    
    connected_count = len(connected_customers)
    
    # 3. If no other accounts share this device, risk is low
    if connected_count <= 1:
        return {"is_fraud_ring": False, "risk_score": 0.1, "connected_accounts": 1}
        
    # 4. If multiple accounts exist, analyze their transactions (Graph Traversal equivalent)
    customer_ids = [c.id for c in connected_customers]
    
    # Get all orders for these customers
    orders = db.query(Order).filter(Order.customer_id.in_(customer_ids)).all()
    order_ids = [o.id for o in orders]
    
    # Get all transactions for these orders
    transactions = db.query(Transaction).filter(Transaction.order_id.in_(order_ids)).all()
    
    total_tx = len(transactions)
    failed_tx = sum(1 for tx in transactions if tx.status == "failed")
    
    # 5. Calculate Risk Score
    failure_rate = (failed_tx / total_tx) if total_tx > 0 else 0.0
    
    # Base risk for having multiple accounts on one device
    risk_score = 0.5 
    
    # Add penalty for high failure rate across the ring
    if failure_rate > 0.5:
        risk_score += 0.3
    
    # Add penalty for having too many connected accounts
    if connected_count > MAX_CONNECTED_ACCOUNTS_THRESHOLD:
        risk_score += 0.15
        
    risk_score = min(1.0, risk_score) # Cap at 1.0
    
    is_fraud = risk_score >= HIGH_RISK_SCORE
    
    print(f"[Risk AI] Analyzed Customer {customer_id}. Ring Size: {connected_count}, Failure Rate: {failure_rate*100:.1f}%. Score: {risk_score}")
    
    return {
        "is_fraud_ring": is_fraud,
        "risk_score": round(risk_score, 2),
        "connected_accounts": connected_count
    }
