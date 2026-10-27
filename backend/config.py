"""
FILE: config.py
PURPOSE: Stores and validates all environment variables, security settings, and gateway configurations in one place.
USED BY: app.py, database_schema.py, utils.py, webhook_handler.py, notification_engine.py, llm_provider_router.py
USES: pydantic_settings
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
# STEP 1: Python built-in libraries
import os
from typing import List

# STEP 2: Third-party libraries
from pydantic_settings import BaseSettings, SettingsConfigDict

# ──────────────────────────────────────────────
# CONSTANTS
# ──────────────────────────────────────────────
DEFAULT_PROVIDER_TIMEOUT_SECONDS = 15
DEFAULT_MAX_PROVIDER_RETRIES = 3
DEFAULT_JWT_EXPIRATION_MINUTES = 60
DEFAULT_REFRESH_TOKEN_DAYS = 7


# ──────────────────────────────────────────────
# MAIN FUNCTIONS & SETTINGS CLASS
# ──────────────────────────────────────────────

class Settings(BaseSettings):
    """
    Central Configuration Object.
    Loads and validates settings from environment variables and the .env file.
    """

    # App Config
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    FRONTEND_URL: str = "http://localhost:3000"

    # Database
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    DATABASE_URL: str = "sqlite:///./cyvault_v2.db"

    # Security & Authentication
    MASTER_ENCRYPTION_KEY: str = ""
    JWT_SECRET: str = ""
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = DEFAULT_JWT_EXPIRATION_MINUTES
    REFRESH_TOKEN_DAYS: int = DEFAULT_REFRESH_TOKEN_DAYS
    ENFORCE_STRICT_AUTH: bool = False

    # Payment Providers (Gateway-Agnostic Configuration)
    DEFAULT_PAYMENT_PROVIDER: str = "razorpay"
    PROVIDER_TIMEOUT_SECONDS: int = DEFAULT_PROVIDER_TIMEOUT_SECONDS
    MAX_PROVIDER_RETRIES: int = DEFAULT_MAX_PROVIDER_RETRIES

    # Razorpay Adapter Settings
    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""
    RAZORPAY_WEBHOOK_SECRET: str = ""
    RAZORPAY_API_BASE_URL: str = "https://api.razorpay.com/v1"

    # Stripe Adapter Settings
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""
    STRIPE_API_BASE_URL: str = "https://api.stripe.com/v1"

    # Cashfree Adapter Settings
    CASHFREE_APP_ID: str = ""
    CASHFREE_SECRET_KEY: str = ""
    CASHFREE_WEBHOOK_SECRET: str = ""
    CASHFREE_API_BASE_URL: str = "https://sandbox.cashfree.com/pg"
    CASHFREE_API_VERSION: str = "2023-08-01"

    # Rate Limiting (Requests per minute)
    RATE_LIMIT_LOGIN_PER_MINUTE: int = 10
    RATE_LIMIT_PAYMENT_PER_MINUTE: int = 30
    RATE_LIMIT_WEBHOOK_PER_MINUTE: int = 120
    RATE_LIMIT_API_PER_MINUTE: int = 120

    # LLM Providers
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""

    # Cache
    UPSTASH_REDIS_REST_URL: str = ""
    UPSTASH_REDIS_REST_TOKEN: str = ""

    # Notifications (SMTP)
    SMTP_EMAIL: str = ""
    SMTP_APP_PASSWORD: str = ""

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )


def get_allowed_cors_origins(current_settings: Settings) -> List[str]:
    """
    Returns the list of allowed CORS origins based on the current environment.

    What it does:
        - In production, strictly allows only the configured FRONTEND_URL
        - In development/test, allows localhost origins and FRONTEND_URL

    Args:
        current_settings: The active Settings instance

    Returns:
        List[str]: Allowed origin URLs
    """
    origins = []
    if current_settings.FRONTEND_URL:
        origins.append(current_settings.FRONTEND_URL)

    if current_settings.ENVIRONMENT.lower() != "production":
        localhost_origins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
        for origin in localhost_origins:
            if origin not in origins:
                origins.append(origin)

    return origins


def validate_production_configuration(current_settings: Settings) -> None:
    """
    Validates that production deployments do not run with insecure development defaults.

    What it does:
        - Checks ENVIRONMENT == 'production'
        - Rejects DEBUG=True, missing MASTER_ENCRYPTION_KEY, missing JWT_SECRET, or SQLite DB in production

    Args:
        current_settings: The active Settings instance

    Returns:
        None (raises ValueError if configuration is unsafe for production)
    """
    if current_settings.ENVIRONMENT.lower() != "production":
        return

    print("[Config] Validating strict production configuration...")
    validation_errors = []

    if current_settings.DEBUG:
        validation_errors.append("DEBUG must be False in production.")

    if not current_settings.MASTER_ENCRYPTION_KEY or len(current_settings.MASTER_ENCRYPTION_KEY) < 32:
        validation_errors.append("MASTER_ENCRYPTION_KEY must be set and at least 32 characters in production.")

    if current_settings.MASTER_ENCRYPTION_KEY == "generate_a_secure_base64_string_here":
        validation_errors.append("MASTER_ENCRYPTION_KEY cannot use the example placeholder in production.")

    if not current_settings.JWT_SECRET or len(current_settings.JWT_SECRET) < 32:
        validation_errors.append("JWT_SECRET must be set and at least 32 characters in production.")

    if current_settings.JWT_SECRET == "generate_a_secure_jwt_secret_here":
        validation_errors.append("JWT_SECRET cannot use the example placeholder in production.")

    if current_settings.DATABASE_URL.startswith("sqlite"):
        validation_errors.append("SQLite is not permitted in production; configure PostgreSQL DATABASE_URL.")

    if validation_errors:
        joined_errors = " | ".join(validation_errors)
        raise ValueError(f"Unsafe production configuration rejected: {joined_errors}")


settings = Settings()

