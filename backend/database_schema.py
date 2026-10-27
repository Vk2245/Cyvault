"""
FILE: database_schema.py
PURPOSE: Defines the gateway-agnostic SQLAlchemy ORM models, payment state machine transitions, and database session management.
USED BY: app.py, webhook_handler.py, recovery_orchestrator.py, policy_enforcer.py, entity_graph_builder.py, finance_matcher.py, action_receipt_logger.py
USES: config.py, utils.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
# STEP 1: Python built-in libraries
import json
from datetime import datetime
from typing import Dict, Set

# STEP 2: Third-party libraries
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    JSON,
    String,
    Text,
    UniqueConstraint,
    create_engine,
    inspect,
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from sqlalchemy.sql import text

# STEP 3: Our own project files
from backend.config import settings
from backend.utils import decrypt_api_key, encrypt_api_key

# ──────────────────────────────────────────────
# CONSTANTS — PAYMENT STATE MACHINE
# ──────────────────────────────────────────────
STATE_CREATED = "CREATED"
STATE_PENDING = "PENDING"
STATE_REQUIRES_ACTION = "REQUIRES_ACTION"
STATE_AUTHORIZED = "AUTHORIZED"
STATE_PROCESSING = "PROCESSING"
STATE_SUCCEEDED = "SUCCEEDED"
STATE_FAILED = "FAILED"
STATE_CANCELLED = "CANCELLED"
STATE_EXPIRED = "EXPIRED"
STATE_PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED"
STATE_REFUNDED = "REFUNDED"

ALL_PAYMENT_STATES: Set[str] = {
    STATE_CREATED,
    STATE_PENDING,
    STATE_REQUIRES_ACTION,
    STATE_AUTHORIZED,
    STATE_PROCESSING,
    STATE_SUCCEEDED,
    STATE_FAILED,
    STATE_CANCELLED,
    STATE_EXPIRED,
    STATE_PARTIALLY_REFUNDED,
    STATE_REFUNDED,
}

# Authoritative allowed state transitions.
# Note: SUCCEEDED can NEVER transition backward to FAILED/PENDING/CANCELLED (prevents out-of-order webhook corruption).
VALID_PAYMENT_STATE_TRANSITIONS: Dict[str, Set[str]] = {
    STATE_CREATED: {
        STATE_PENDING,
        STATE_REQUIRES_ACTION,
        STATE_AUTHORIZED,
        STATE_PROCESSING,
        STATE_SUCCEEDED,
        STATE_FAILED,
        STATE_CANCELLED,
        STATE_EXPIRED,
    },
    STATE_PENDING: {
        STATE_REQUIRES_ACTION,
        STATE_AUTHORIZED,
        STATE_PROCESSING,
        STATE_SUCCEEDED,
        STATE_FAILED,
        STATE_CANCELLED,
        STATE_EXPIRED,
    },
    STATE_REQUIRES_ACTION: {
        STATE_PENDING,
        STATE_AUTHORIZED,
        STATE_PROCESSING,
        STATE_SUCCEEDED,
        STATE_FAILED,
        STATE_CANCELLED,
        STATE_EXPIRED,
    },
    STATE_AUTHORIZED: {
        STATE_PROCESSING,
        STATE_SUCCEEDED,
        STATE_FAILED,
        STATE_CANCELLED,
        STATE_EXPIRED,
    },
    STATE_PROCESSING: {
        STATE_SUCCEEDED,
        STATE_FAILED,
        STATE_CANCELLED,
    },
    STATE_FAILED: {
        STATE_PENDING,
        STATE_REQUIRES_ACTION,
        STATE_AUTHORIZED,
        STATE_PROCESSING,
        STATE_SUCCEEDED,
        STATE_CANCELLED,
        STATE_EXPIRED,
    },
    STATE_SUCCEEDED: {
        STATE_PARTIALLY_REFUNDED,
        STATE_REFUNDED,
    },
    STATE_PARTIALLY_REFUNDED: {
        STATE_PARTIALLY_REFUNDED,
        STATE_REFUNDED,
    },
    STATE_REFUNDED: set(),
    STATE_CANCELLED: set(),
    STATE_EXPIRED: set(),
}

LEGACY_TO_NORMALIZED_STATE: Dict[str, str] = {
    "created": STATE_CREATED,
    "attempted": STATE_FAILED,
    "pending": STATE_PENDING,
    "authorized": STATE_AUTHORIZED,
    "processing": STATE_PROCESSING,
    "captured": STATE_SUCCEEDED,
    "paid": STATE_SUCCEEDED,
    "succeeded": STATE_SUCCEEDED,
    "failed": STATE_FAILED,
    "cancelled": STATE_CANCELLED,
    "expired": STATE_EXPIRED,
    "partially_refunded": STATE_PARTIALLY_REFUNDED,
    "refunded": STATE_REFUNDED,
}

Base = declarative_base()


# ──────────────────────────────────────────────
# STATE MACHINE FUNCTIONS
# ──────────────────────────────────────────────

def normalize_internal_state(raw_status: str) -> str:
    """
    Converts legacy or provider-specific status strings into canonical state-machine states.

    What it does:
        - Checks if raw_status is already in ALL_PAYMENT_STATES
        - Maps legacy values ('captured', 'paid', 'attempted', 'failed') to canonical states

    Args:
        raw_status: The status string to normalize

    Returns:
        str: Canonical state string (e.g. 'SUCCEEDED', 'FAILED', 'AUTHORIZED')
    """
    if not raw_status:
        return STATE_CREATED
    upper_val = raw_status.strip().upper()
    if upper_val in ALL_PAYMENT_STATES:
        return upper_val
    lower_val = raw_status.strip().lower()
    return LEGACY_TO_NORMALIZED_STATE.get(lower_val, STATE_PENDING)


def can_transition_payment_state(current_state: str, target_state: str) -> bool:
    """
    Checks whether transitioning from current_state to target_state is valid.

    What it does:
        - Normalizes both states
        - Allows idempotent same-state transitions
        - Checks VALID_PAYMENT_STATE_TRANSITIONS

    Args:
        current_state: The current state of the payment/order
        target_state: The desired next state

    Returns:
        bool: True if transition is valid, False if prohibited (e.g. SUCCEEDED -> FAILED)
    """
    norm_current = normalize_internal_state(current_state)
    norm_target = normalize_internal_state(target_state)

    if norm_current == norm_target:
        return True

    allowed_targets = VALID_PAYMENT_STATE_TRANSITIONS.get(norm_current, set())
    return norm_target in allowed_targets


# ──────────────────────────────────────────────
# ORM DOMAIN MODELS
# ──────────────────────────────────────────────

class Merchant(Base):
    """Stores merchant account identity and AES-256-GCM encrypted gateway credentials."""
    __tablename__ = "merchants"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    company_name = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    active_gateway = Column(String, default="razorpay", nullable=False)
    encrypted_razorpay_key = Column(String, nullable=True)
    encrypted_razorpay_secret = Column(String, nullable=True)
    encrypted_webhook_secret = Column(String, nullable=True)
    encrypted_provider_configs = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def set_secrets(self, plain_key: str, plain_secret: str, plain_whsec: str) -> None:
        """
        Encrypts and stores the merchant's primary gateway credentials.

        What it does:
            - Uses AES-256-GCM to encrypt key, secret, and webhook secret

        Args:
            plain_key: Gateway API Key / App ID
            plain_secret: Gateway API Secret
            plain_whsec: Gateway Webhook Signing Secret

        Returns:
            None
        """
        self.encrypted_razorpay_key = encrypt_api_key(plain_key) if plain_key else None
        self.encrypted_razorpay_secret = encrypt_api_key(plain_secret) if plain_secret else None
        self.encrypted_webhook_secret = encrypt_api_key(plain_whsec) if plain_whsec else None

    def get_razorpay_key(self) -> str:
        """Returns decrypted primary API Key."""
        return decrypt_api_key(self.encrypted_razorpay_key) if self.encrypted_razorpay_key else ""

    def get_razorpay_secret(self) -> str:
        """Returns decrypted primary API Secret."""
        return decrypt_api_key(self.encrypted_razorpay_secret) if self.encrypted_razorpay_secret else ""

    def get_webhook_secret(self) -> str:
        """Returns decrypted primary Webhook Secret."""
        return decrypt_api_key(self.encrypted_webhook_secret) if self.encrypted_webhook_secret else ""

    def set_gateway_credentials(self, provider_name: str, api_key: str, api_secret: str, webhook_secret: str) -> None:
        """
        Stores encrypted credentials for any payment provider (razorpay, stripe, cashfree).

        What it does:
            - Decrypts existing multi-provider config map
            - Updates credentials for provider_name and re-encrypts at rest
            - Also keeps primary columns synced if provider is razorpay

        Args:
            provider_name: Provider identifier ('razorpay', 'stripe', 'cashfree')
            api_key: Provider key ID or publishable/app ID
            api_secret: Provider secret key
            webhook_secret: Provider webhook signing secret

        Returns:
            None
        """
        provider_clean = (provider_name or "razorpay").strip().lower()
        existing_map = self.get_all_gateway_credentials()
        existing_map[provider_clean] = {
            "api_key": api_key or "",
            "api_secret": api_secret or "",
            "webhook_secret": webhook_secret or "",
        }
        self.encrypted_provider_configs = encrypt_api_key(json.dumps(existing_map))
        if provider_clean == "razorpay" or not self.encrypted_razorpay_key:
            self.set_secrets(api_key, api_secret, webhook_secret)

    def get_all_gateway_credentials(self) -> Dict[str, Dict[str, str]]:
        """
        Decrypts and returns all configured gateway credentials for this merchant.

        What it does:
            - Reads encrypted_provider_configs JSON
            - Includes fallback to encrypted_razorpay_* columns

        Args:
            None

        Returns:
            Dict[str, Dict[str, str]]: Mapping of provider_name -> credential dict
        """
        result: Dict[str, Dict[str, str]] = {}
        if self.encrypted_provider_configs:
            decrypted_json = decrypt_api_key(self.encrypted_provider_configs)
            if decrypted_json:
                try:
                    parsed = json.loads(decrypted_json)
                    if isinstance(parsed, dict):
                        result.update(parsed)
                except Exception:
                    pass

        rzp_key = self.get_razorpay_key()
        rzp_secret = self.get_razorpay_secret()
        rzp_whsec = self.get_webhook_secret()
        if (rzp_key or rzp_secret or rzp_whsec) and "razorpay" not in result:
            result["razorpay"] = {
                "api_key": rzp_key,
                "api_secret": rzp_secret,
                "webhook_secret": rzp_whsec,
            }
        return result

    def get_gateway_credentials(self, provider_name: str) -> Dict[str, str]:
        """
        Returns decrypted credentials for a specific payment gateway.

        What it does:
            - Looks up provider_name in get_all_gateway_credentials()

        Args:
            provider_name: Provider identifier ('razorpay', 'stripe', 'cashfree')

        Returns:
            Dict[str, str]: {'api_key': ..., 'api_secret': ..., 'webhook_secret': ...}
        """
        provider_clean = (provider_name or "razorpay").strip().lower()
        all_creds = self.get_all_gateway_credentials()
        return all_creds.get(provider_clean, {"api_key": "", "api_secret": "", "webhook_secret": ""})


class Customer(Base):
    """Stores merchant customer profiles and device fingerprints for graph fraud analysis."""
    __tablename__ = "customers"
    __table_args__ = (
        Index("ix_customers_merchant_email", "merchant_id", "email"),
        Index("ix_customers_merchant_device", "merchant_id", "device_fingerprint"),
    )

    id = Column(String, primary_key=True)
    merchant_id = Column(String, ForeignKey("merchants.id"), nullable=False)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    device_fingerprint = Column(String, nullable=True)
    is_blocked = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Order(Base):
    """
    Stores business orders in a provider-independent format.
    Separates internal Order ID (id) from provider order/session ID (provider_order_id).
    """
    __tablename__ = "orders"
    __table_args__ = (
        Index("ix_orders_merchant_status", "merchant_id", "status"),
        Index("ix_orders_provider_order", "provider", "provider_order_id"),
    )

    id = Column(String, primary_key=True)
    merchant_id = Column(String, ForeignKey("merchants.id"), nullable=False)
    customer_id = Column(String, ForeignKey("customers.id"), nullable=False)
    amount_paise = Column(Integer, nullable=False)
    currency = Column(String, default="INR", nullable=False)
    status = Column(String, nullable=False)  # Legacy UI status: created, attempted, paid, refunded
    normalized_status = Column(String, default=STATE_CREATED, nullable=False)
    provider = Column(String, default="razorpay", nullable=False)
    provider_order_id = Column(String, nullable=True)
    discount_percent = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer = relationship("Customer")


class Transaction(Base):
    """
    Stores individual payment transactions and attempts in a provider-independent format.
    Separates internal Transaction ID (id) from provider payment ID (provider_payment_id).
    """
    __tablename__ = "transactions"
    __table_args__ = (
        Index("ix_transactions_order_id", "order_id"),
        Index("ix_transactions_provider_payment", "provider", "provider_payment_id"),
    )

    id = Column(String, primary_key=True)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    amount_paise = Column(Integer, nullable=False)
    currency = Column(String, default="INR", nullable=False)
    status = Column(String, nullable=False)  # Legacy UI status: captured, failed, authorized, refunded
    normalized_status = Column(String, default=STATE_PENDING, nullable=False)
    provider = Column(String, default="razorpay", nullable=False)
    provider_payment_id = Column(String, nullable=True)
    method = Column(String, nullable=False)
    error_code = Column(String, nullable=True)
    error_description = Column(Text, nullable=True)
    risk_score = Column(Float, nullable=True)
    refunded_amount_paise = Column(Integer, default=0, nullable=False)
    idempotency_key = Column(String, nullable=True)
    attempt_number = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Refund(Base):
    """
    Stores full and partial refunds with idempotency protection and provider tracking.
    """
    __tablename__ = "refunds"
    __table_args__ = (
        Index("ix_refunds_merchant_order", "merchant_id", "order_id"),
        UniqueConstraint("merchant_id", "idempotency_key", name="uq_refunds_merchant_idempotency"),
    )

    id = Column(String, primary_key=True)
    merchant_id = Column(String, ForeignKey("merchants.id"), nullable=False)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    transaction_id = Column(String, ForeignKey("transactions.id"), nullable=False)
    provider = Column(String, default="razorpay", nullable=False)
    provider_refund_id = Column(String, nullable=True)
    amount_paise = Column(Integer, nullable=False)
    currency = Column(String, default="INR", nullable=False)
    status = Column(String, default=STATE_PENDING, nullable=False)  # PENDING, SUCCEEDED, FAILED
    reason = Column(String, nullable=True)
    idempotency_key = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Settlement(Base):
    """Stores gateway settlement batches and bank UTR references for reconciliation."""
    __tablename__ = "settlements"
    __table_args__ = (
        Index("ix_settlements_merchant_status", "merchant_id", "status"),
    )

    id = Column(String, primary_key=True)
    merchant_id = Column(String, ForeignKey("merchants.id"), nullable=False)
    provider = Column(String, default="razorpay", nullable=False)
    amount_paise = Column(Integer, nullable=False)
    fees_paise = Column(Integer, nullable=False)
    tax_paise = Column(Integer, nullable=False)
    utr = Column(String, nullable=True)
    status = Column(String, nullable=False)  # processed, created, failed,pending_reconciliation
    reconciliation_status = Column(String, default="KNOWN_SUCCESS", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class WebhookEvent(Base):
    """
    Durable inbox for incoming provider webhooks.
    Enforces event deduplication across retries via (provider, provider_event_id).
    """
    __tablename__ = "webhook_events"
    __table_args__ = (
        UniqueConstraint("provider", "provider_event_id", name="uq_webhook_provider_event_id"),
        Index("ix_webhook_events_merchant", "merchant_id", "event_type"),
    )

    id = Column(String, primary_key=True)
    provider = Column(String, nullable=False)
    provider_event_id = Column(String, nullable=False)
    merchant_id = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    signature_verified = Column(Boolean, default=False, nullable=False)
    processing_status = Column(String, default="RECEIVED", nullable=False)
    payload_hash = Column(String, nullable=False)
    error_message = Column(Text, nullable=True)
    received_at = Column(DateTime, default=datetime.utcnow)
    processed_at = Column(DateTime, nullable=True)


class IdempotencyRecord(Base):
    """
    Prevents duplicate execution of financial operations (create payment, capture, refund).
    """
    __tablename__ = "idempotency_records"
    __table_args__ = (
        UniqueConstraint(
            "merchant_id",
            "operation",
            "idempotency_key",
            name="uq_idempotency_merchant_op_key",
        ),
    )

    id = Column(String, primary_key=True)
    merchant_id = Column(String, nullable=False)
    operation = Column(String, nullable=False)
    idempotency_key = Column(String, nullable=False)
    request_hash = Column(String, nullable=False)
    status = Column(String, default="IN_PROGRESS", nullable=False)  # IN_PROGRESS, COMPLETED, FAILED
    response_code = Column(Integer, default=200, nullable=False)
    response_body = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ReconciliationRecord(Base):
    """
    Records financial reconciliation checks between internal ledger and gateway state.
    """
    __tablename__ = "reconciliation_records"
    __table_args__ = (
        Index("ix_reconciliation_merchant", "merchant_id", "classification"),
    )

    id = Column(String, primary_key=True)
    merchant_id = Column(String, ForeignKey("merchants.id"), nullable=False)
    order_id = Column(String, nullable=True)
    transaction_id = Column(String, nullable=True)
    settlement_id = Column(String, nullable=True)
    provider = Column(String, default="razorpay", nullable=False)
    classification = Column(String, nullable=False)
    internal_amount_paise = Column(Integer, nullable=False)
    provider_amount_paise = Column(Integer, nullable=True)
    currency = Column(String, default="INR", nullable=False)
    discrepancy_paise = Column(Integer, default=0, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class PolicyRule(Base):
    """Feature 2: Governed Action Ledger - compiled rules."""
    __tablename__ = "policy_rules"

    id = Column(String, primary_key=True)
    merchant_id = Column(String, ForeignKey("merchants.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    rule_type = Column(String, nullable=False)
    parameters = Column(JSON, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ActionReceipt(Base):
    """Feature 2: Governed Action Ledger - Immutable Audit Trail."""
    __tablename__ = "action_receipts"
    __table_args__ = (
        Index("ix_action_receipts_merchant_created", "merchant_id", "created_at"),
    )

    id = Column(String, primary_key=True)
    merchant_id = Column(String, ForeignKey("merchants.id"), nullable=False)
    action_type = Column(String, nullable=False)
    entity_id = Column(String, nullable=False)
    policy_id = Column(String, ForeignKey("policy_rules.id"), nullable=True)
    decision = Column(String, nullable=False)  # ALLOWED, BLOCKED, NEEDS_APPROVAL
    narrative = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# ──────────────────────────────────────────────
# DATABASE ENGINE & MIGRATION HELPERS
# ──────────────────────────────────────────────

db_url = settings.DATABASE_URL
connect_args = {"check_same_thread": False} if db_url.startswith("sqlite") else {}

engine = create_engine(
    db_url,
    echo=False,
    pool_pre_ping=True,
    pool_recycle=1800,
    connect_args=connect_args,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """
    FastAPI dependency that yields a transactional SQLAlchemy session.

    What it does:
        - Opens a new SessionLocal instance
        - Ensures session is closed after request completion

    Args:
        None

    Returns:
        Generator[Session, None, None]: Active database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def _ensure_column_exists(target_engine, table_name: str, column_name: str, column_sql_type: str) -> None:
    """
    Safely adds a missing column to an existing table if it does not already exist.

    What it does:
        - Inspects current table schema via SQLAlchemy inspector
        - Executes ALTER TABLE ADD COLUMN only when column_name is absent

    Args:
        target_engine: SQLAlchemy Engine
        table_name: Name of the database table
        column_name: Name of the column to ensure
        column_sql_type: SQL type and default definition

    Returns:
        None
    """
    try:
        inspector = inspect(target_engine)
        if not inspector.has_table(table_name):
            return
        existing_columns = {col["name"] for col in inspector.get_columns(table_name)}
        if column_name not in existing_columns:
            with target_engine.begin() as conn:
                conn.execute(text(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_sql_type}"))
            print(f"[Database] Migrated column {table_name}.{column_name}")
    except Exception as error:
        print(f"ERROR: Schema migration check failed for {table_name}.{column_name}: {error}")


def init_db(target_engine=None) -> None:
    """
    Initializes all database tables and applies non-destructive column migrations.

    What it does:
        - Creates any missing tables defined in Base.metadata
        - Ensures new gateway-agnostic columns exist on pre-existing tables

    Args:
        target_engine: Optional custom engine (defaults to module engine)

    Returns:
        None
    """
    active_engine = target_engine or engine
    Base.metadata.create_all(bind=active_engine)

    migrations = [
        ("customers", "is_blocked", "BOOLEAN DEFAULT FALSE"),
        ("merchants", "active_gateway", " VARCHAR(32) DEFAULT 'razorpay'"),
        ("merchants", "encrypted_provider_configs", "TEXT"),
        ("orders", "normalized_status", "VARCHAR(32) DEFAULT 'CREATED'"),
        ("orders", "provider", "VARCHAR(32) DEFAULT 'razorpay'"),
        ("orders", "provider_order_id", "VARCHAR(128)"),
        ("orders", "discount_percent", "INTEGER DEFAULT 0"),
        ("orders", "updated_at", "DATETIME"),
        ("transactions", "currency", "VARCHAR(16) DEFAULT 'INR'"),
        ("transactions", "normalized_status", "VARCHAR(32) DEFAULT 'PENDING'"),
        ("transactions", "provider", "VARCHAR(32) DEFAULT 'razorpay'"),
        ("transactions", "provider_payment_id", "VARCHAR(128)"),
        ("transactions", "refunded_amount_paise", "INTEGER DEFAULT 0"),
        ("transactions", "idempotency_key", "VARCHAR(128)"),
        ("transactions", "attempt_number", "INTEGER DEFAULT 1"),
        ("transactions", "updated_at", "DATETIME"),
        ("settlements", "provider", "VARCHAR(32) DEFAULT 'razorpay'"),
        ("settlements", "reconciliation_status", "VARCHAR(64) DEFAULT 'KNOWN_SUCCESS'"),
    ]
    for table_name, col_name, col_def in migrations:
        _ensure_column_exists(active_engine, table_name, col_name, col_def)

