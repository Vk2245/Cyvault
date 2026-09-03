"""
FILE: finance_matcher.py
PURPOSE: Reconciles incoming settlements with past orders and predicts future cash flow.
USED BY: webhook_handler.py, app.py
USES: database_schema.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

# Import from our own project files
from backend.database_schema import Settlement, Transaction, Order

# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

def process_settlement(db: Session, merchant_id: str, settlement_id: str, utr: str, amount_paise: int) -> dict:
    """
    Reconciles a Razorpay settlement by marking it as processed and matching the UTR.
    
    What it does:
        - Finds the settlement record in the database
        - Updates the UTR and status to 'processed'
        
    Args:
        db: Database session
        merchant_id: The ID of the merchant
        settlement_id: Razorpay settlement ID (e.g. setl_xyz)
        utr: Bank UTR reference number
        amount_paise: Settlement amount in paise
        
    Returns:
        dict: Status of reconciliation
    """
    print(f"\n--- Processing Settlement {settlement_id} for Merchant {merchant_id} ---")
    
    settle = db.query(Settlement).filter(
        Settlement.id == settlement_id,
        Settlement.merchant_id == merchant_id
    ).first()
    
    if not settle:
        # For hackathon demo, if we receive a webhook for a settlement not in our DB, we could auto-create it
        settle = Settlement(
            id=settlement_id,
            merchant_id=merchant_id,
            amount_paise=amount_paise,
            fees_paise=int(amount_paise * 0.02), # Mock 2% fees
            tax_paise=int(amount_paise * 0.0036), # Mock 18% GST on fees
            utr=utr,
            status="processed"
        )
        db.add(settle)
        print(f"Created new settlement record {settlement_id}")
    else:
        settle.utr = utr
        settle.status = "processed"
        print(f"Updated existing settlement {settlement_id} with UTR {utr}")
        
    try:
        db.commit()
        return {"status": "RECONCILED", "utr": utr, "amount": amount_paise}
    except Exception as e:
        db.rollback()
        print(f"Failed to reconcile settlement: {e}")
        return {"status": "ERROR"}


def forecast_cashflow(db: Session, merchant_id: str) -> dict:
    """
    Predicts next week's cash flow based on the average daily settlements from the past 30 days.
    
    What it does:
        - Sums all 'processed' settlements in the last 30 days
        - Calculates the daily average
        - Projects this over the next 7 days
    """
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    result = db.query(func.sum(Settlement.amount_paise)).filter(
        Settlement.merchant_id == merchant_id,
        Settlement.status == "processed",
        Settlement.created_at >= thirty_days_ago
    ).scalar()
    
    total_30_days_paise = result if result else 0
    daily_average_paise = total_30_days_paise / 30
    
    # Forecast for next 7 days
    forecast_7_days_paise = int(daily_average_paise * 7)
    
    # Calculate captured but un-settled transactions (Money in transit)
    in_transit_result = db.query(func.sum(Transaction.amount_paise)).filter(
        Transaction.order_id.in_(
            db.query(Order.id).filter(Order.merchant_id == merchant_id)
        ),
        Transaction.status == "captured"
        # In a real app, we'd filter out transactions that are already linked to a processed settlement
    ).scalar()
    
    in_transit_paise = in_transit_result if in_transit_result else 0
    
    # For demo simplicity, we just assume 98% of in_transit becomes settlement
    expected_transit_settlement = int(in_transit_paise * 0.98) 
    
    return {
        "past_30d_revenue_inr": total_30_days_paise / 100,
        "money_in_transit_inr": expected_transit_settlement / 100,
        "forecast_next_7d_inr": forecast_7_days_paise / 100
    }
