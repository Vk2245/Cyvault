import uuid
import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from backend.database_schema import Merchant, Customer, Order, Transaction, Settlement, PolicyRule, SessionLocal, init_db

def generate_synthetic_data(db: Session, num_customers=50, num_orders=200):
    # 1. Create a Test Merchant
    merchant_id = f"merch_{uuid.uuid4().hex[:12]}"
    test_merchant = Merchant(
        id=merchant_id,
        name="Cyvault Demo Merchant",
        email="demo@cyvault.com",
    )
    test_merchant.set_razorpay_key("rzp_test_demo123456789")
    db.add(test_merchant)
    
    # 2. Create Default Policy Rules (Feature 2)
    p1 = PolicyRule(
        id=f"pol_{uuid.uuid4().hex[:10]}",
        merchant_id=merchant_id,
        name="Max Discount Cap",
        description="Never offer more than 5% discount during recovery",
        rule_type="discount_limit",
        parameters={"max_discount_percent": 5}
    )
    p2 = PolicyRule(
        id=f"pol_{uuid.uuid4().hex[:10]}",
        merchant_id=merchant_id,
        name="Auto-Block Suspicious IP",
        description="Block payments if distance from last IP > 500km",
        rule_type="velocity_check",
        parameters={"max_distance_km": 500}
    )
    db.add_all([p1, p2])

    # 3. Create Customers
    customers = []
    # Seed a "Fraud Ring" (Multiple accounts, same device fingerprint)
    fraud_device = "dev_fp_999_fraud"
    for i in range(5):
        c = Customer(
            id=f"cust_{uuid.uuid4().hex[:10]}",
            merchant_id=merchant_id,
            phone=f"+9198765{random.randint(10000, 99999)}",
            email=f"fraud_{i}@example.com",
            device_fingerprint=fraud_device
        )
        customers.append(c)
        
    # Normal customers
    for _ in range(num_customers - 5):
        c = Customer(
            id=f"cust_{uuid.uuid4().hex[:10]}",
            merchant_id=merchant_id,
            phone=f"+9199{random.randint(10000000, 99999999)}",
            email=f"user_{uuid.uuid4().hex[:5]}@gmail.com",
            device_fingerprint=f"dev_fp_{uuid.uuid4().hex[:8]}"
        )
        customers.append(c)
        
    db.add_all(customers)
    db.commit() # Commit to get valid IDs
    
    # 4. Create Orders & Transactions
    now = datetime.utcnow()
    statuses = ["captured", "failed", "failed", "captured", "authorized"]
    methods = ["upi", "card", "card", "netbanking"]
    
    for _ in range(num_orders):
        customer = random.choice(customers)
        amount = random.randint(500, 15000) * 100 # In paise
        
        order = Order(
            id=f"order_{uuid.uuid4().hex[:14]}",
            merchant_id=merchant_id,
            customer_id=customer.id,
            amount_paise=amount,
            status="paid" if random.random() > 0.3 else "attempted",
            created_at=now - timedelta(days=random.randint(0, 30))
        )
        db.add(order)
        
        tx_status = random.choice(statuses)
        is_fraud = customer.device_fingerprint == fraud_device
        
        tx = Transaction(
            id=f"pay_{uuid.uuid4().hex[:14]}",
            order_id=order.id,
            amount_paise=amount,
            status="failed" if is_fraud else tx_status,
            method=random.choice(methods),
            error_code="BAD_REQUEST_ERROR" if (is_fraud or tx_status == "failed") else None,
            error_description="Payment declined by issuer" if tx_status == "failed" else None,
            risk_score=0.95 if is_fraud else random.uniform(0.1, 0.4),
            created_at=order.created_at + timedelta(minutes=random.randint(1, 10))
        )
        db.add(tx)
        
        # 5. Create Settlements for captured transactions
        if tx.status == "captured":
            settle = Settlement(
                id=f"setl_{uuid.uuid4().hex[:14]}",
                merchant_id=merchant_id,
                amount_paise=int(amount * 0.98), # 2% deduction
                fees_paise=int(amount * 0.017),
                tax_paise=int(amount * 0.003),
                utr=f"UTR{random.randint(100000000, 999999999)}",
                status="processed",
                created_at=tx.created_at + timedelta(days=2)
            )
            db.add(settle)
            
    db.commit()
    print("Synthetic data generated successfully.")

if __name__ == "__main__":
    print("Initializing Database...")
    init_db()
    
    print("Generating synthetic data...")
    db = SessionLocal()
    try:
        generate_synthetic_data(db)
    finally:
        db.close()
