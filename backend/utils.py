"""
FILE: utils.py
PURPOSE: Provides security utilities (Scrypt password hashing, AES-256-GCM encryption, JWT tokens, rate limiting, backoff, and structured logging).
USED BY: app.py, database_schema.py, webhook_handler.py, action_receipt_logger.py
USES: config.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
# STEP 1: Python built-in libraries
import base64
import hashlib
import hmac
import json
import os
import random
import threading
import time
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional

# STEP 2: Third-party libraries
import jwt
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# STEP 3: Our own project files
from backend.config import settings

# ──────────────────────────────────────────────
# CONSTANTS
# ──────────────────────────────────────────────
SCRYPT_N = 16384
SCRYPT_R = 8
SCRYPT_P = 1
SCRYPT_KEY_LENGTH = 32
AES_NONCE_BYTES = 12

SENSITIVE_FIELD_NAMES = {
    "password",
    "password_hash",
    "secret",
    "apisecret",
    "api_secret",
    "webhooksecret",
    "webhook_secret",
    "token",
    "access_token",
    "refresh_token",
    "authorization",
    "card_number",
    "pan",
    "cvv",
    "cvc",
    "master_encryption_key",
    "jwt_secret",
}

_RATE_LIMIT_LOCK = threading.Lock()
_RATE_LIMIT_BUCKETS: Dict[str, list] = {}


# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

def hash_password(password: str) -> str:
    """
    Hashes a password securely using salted Scrypt (memory-hard KDF).

    What it does:
        - Generates a 16-byte cryptographic random salt
        - Derives a 32-byte key using hashlib.scrypt
        - Returns a formatted string 'scrypt$<salt_hex>$<hash_hex>'

    Args:
        password: The plain-text password provided by the user

    Returns:
        str: Salted Scrypt password hash string
    """
    if not password:
        raise ValueError("Password cannot be empty.")

    salt_bytes = os.urandom(16)
    derived_key = hashlib.scrypt(
        password.encode("utf-8"),
        salt=salt_bytes,
        n=SCRYPT_N,
        r=SCRYPT_R,
        p=SCRYPT_P,
        dklen=SCRYPT_KEY_LENGTH
    )
    salt_hex = salt_bytes.hex()
    hash_hex = derived_key.hex()
    return f"scrypt${salt_hex}${hash_hex}"


def verify_password(plain_password: str, stored_password_hash: str) -> bool:
    """
    Verifies a plain-text password against a stored Scrypt or legacy SHA-256 hash.

    What it does:
        - Checks if the stored hash uses the modern 'scrypt$' prefix
        - Uses constant-time hmac.compare_digest to prevent timing attacks
        - Supports legacy unsalted SHA-256 hashes for backward compatibility

    Args:
        plain_password: The password to check
        stored_password_hash: The hash string stored in the database

    Returns:
        bool: True if the password matches, False otherwise
    """
    if not plain_password or not stored_password_hash:
        return False

    try:
        if stored_password_hash.startswith("scrypt$"):
            parts = stored_password_hash.split("$")
            if len(parts) != 3:
                return False
            salt_bytes = bytes.fromhex(parts[1])
            expected_hash_hex = parts[2]
            computed_key = hashlib.scrypt(
                plain_password.encode("utf-8"),
                salt=salt_bytes,
                n=SCRYPT_N,
                r=SCRYPT_R,
                p=SCRYPT_P,
                dklen=SCRYPT_KEY_LENGTH
            )
            return hmac.compare_digest(computed_key.hex(), expected_hash_hex)

        # Fallback for legacy SHA-256 hashes created in initial prototype
        legacy_sha256 = hashlib.sha256(plain_password.encode("utf-8")).hexdigest()
        return hmac.compare_digest(legacy_sha256, stored_password_hash)
    except Exception as error:
        print(f"ERROR: Password verification failed. Reason: {error}")
        return False


def _get_encryption_key() -> bytes:
    """
    Retrieves a 32-byte key for AES-256-GCM encryption of merchant credentials.

    What it does:
        - Enforces a configured MASTER_ENCRYPTION_KEY in production
        - Decodes base64 if valid 32 bytes, or derives a deterministic 32-byte key via SHA-256

    Args:
        None

    Returns:
        bytes: Exactly 32 bytes suitable for AES-256-GCM
    """
    raw_key_string = settings.MASTER_ENCRYPTION_KEY
    if not raw_key_string:
        if settings.ENVIRONMENT.lower() == "production":
            raise RuntimeError("CRITICAL: MASTER_ENCRYPTION_KEY is missing in production environment.")
        raw_key_string = "cyvault-development-only-fallback-key-do-not-use-in-prod"

    try:
        decoded_bytes = base64.b64decode(raw_key_string, validate=True)
        if len(decoded_bytes) == 32:
            return decoded_bytes
    except Exception:
        pass

    return hashlib.sha256(raw_key_string.encode("utf-8")).digest()


def encrypt_api_key(plain_text: str) -> str:
    """
    Encrypts a sensitive credential string using AES-256-GCM.

    What it does:
        - Generates a unique 96-bit (12-byte) random nonce
        - Encrypts the plaintext with authenticated encryption (AES-GCM)
        - Returns URL-safe base64 of nonce + ciphertext + tag

    Args:
        plain_text: The raw secret string to encrypt

    Returns:
        str: URL-safe base64 encoded encrypted string
    """
    if not plain_text:
        return ""

    encryption_key = _get_encryption_key()
    aesgcm = AESGCM(encryption_key)
    nonce = os.urandom(AES_NONCE_BYTES)
    cipher_text = aesgcm.encrypt(nonce, plain_text.encode("utf-8"), None)
    combined_payload = nonce + cipher_text
    return base64.urlsafe_b64encode(combined_payload).decode("utf-8")


def decrypt_api_key(encrypted_text: str) -> str:
    """
    Decrypts an AES-256-GCM encrypted credential string.

    What it does:
        - Decodes the URL-safe base64 payload
        - Extracts the 12-byte nonce and verifies the GCM authentication tag

    Args:
        encrypted_text: The encrypted base64 string from the database

    Returns:
        str: The decrypted plaintext secret, or empty string on failure
    """
    if not encrypted_text:
        return ""

    try:
        combined_payload = base64.urlsafe_b64decode(encrypted_text.encode("utf-8"))
        if len(combined_payload) <= AES_NONCE_BYTES:
            return ""

        nonce = combined_payload[:AES_NONCE_BYTES]
        cipher_text = combined_payload[AES_NONCE_BYTES:]
        encryption_key = _get_encryption_key()
        aesgcm = AESGCM(encryption_key)
        plain_bytes = aesgcm.decrypt(nonce, cipher_text, None)
        return plain_bytes.decode("utf-8")
    except Exception as error:
        print(f"ERROR: Credential decryption failed. Reason: {error}")
        return ""


def _get_jwt_signing_secret() -> str:
    """
    Retrieves the signing key for JWT tokens.

    What it does:
        - Enforces JWT_SECRET in production
        - Provides a consistent development secret when running locally

    Args:
        None

    Returns:
        str: Secret string for HMAC-SHA256 JWT signing
    """
    if settings.JWT_SECRET:
        return settings.JWT_SECRET
    if settings.ENVIRONMENT.lower() == "production":
        raise RuntimeError("CRITICAL: JWT_SECRET is missing in production environment.")
    return "cyvault-dev-jwt-secret-key-minimum-32-bytes-long"


def create_access_token(
    merchant_id: str,
    email: str,
    role: str = "merchant",
    expires_minutes: Optional[int] = None
) -> str:
    """
    Creates a signed JWT access token for an authenticated merchant.

    What it does:
        - Sets standard claims: sub (merchant_id), email, role, iat, exp, jti
        - Signs the token with HS256 using the configured JWT secret

    Args:
        merchant_id: Unique ID of the authenticated merchant
        email: Merchant's registered business email
        role: Access role (default 'merchant')
        expires_minutes: Optional custom expiration window in minutes

    Returns:
        str: Encoded JWT access token
    """
    now_utc = datetime.now(timezone.utc)
    lifetime_minutes = expires_minutes if expires_minutes is not None else settings.JWT_EXPIRATION_MINUTES
    expiration_time = now_utc + timedelta(minutes=lifetime_minutes)

    payload = {
        "sub": merchant_id,
        "merchant_id": merchant_id,
        "email": email,
        "role": role,
        "type": "access",
        "jti": uuid.uuid4().hex,
        "iat": int(now_utc.timestamp()),
        "exp": int(expiration_time.timestamp()),
    }
    return jwt.encode(payload, _get_jwt_signing_secret(), algorithm=settings.JWT_ALGORITHM)


def create_refresh_token(merchant_id: str, email: str) -> str:
    """
    Creates a signed JWT refresh token with a longer validity period.

    What it does:
        - Generates a token typed as 'refresh' for session renewal

    Args:
        merchant_id: Unique ID of the authenticated merchant
        email: Merchant's registered business email

    Returns:
        str: Encoded JWT refresh token
    """
    now_utc = datetime.now(timezone.utc)
    expiration_time = now_utc + timedelta(days=settings.REFRESH_TOKEN_DAYS)
    payload = {
        "sub": merchant_id,
        "merchant_id": merchant_id,
        "email": email,
        "type": "refresh",
        "jti": uuid.uuid4().hex,
        "iat": int(now_utc.timestamp()),
        "exp": int(expiration_time.timestamp()),
    }
    return jwt.encode(payload, _get_jwt_signing_secret(), algorithm=settings.JWT_ALGORITHM)


def verify_access_token(token_string: str) -> Dict[str, Any]:
    """
    Verifies and decodes a JWT token.

    What it does:
        - Validates signature and expiration timestamp
        - Returns the decoded payload dictionary

    Args:
        token_string: The raw JWT string from the Authorization header

    Returns:
        Dict[str, Any]: Decoded token claims (raises ValueError if invalid or expired)
    """
    if not token_string:
        raise ValueError("Missing authentication token.")

    try:
        decoded_claims = jwt.decode(
            token_string,
            _get_jwt_signing_secret(),
            algorithms=[settings.JWT_ALGORITHM]
        )
        return decoded_claims
    except jwt.ExpiredSignatureError as error:
        raise ValueError("Authentication token has expired.") from error
    except jwt.InvalidTokenError as error:
        raise ValueError(f"Invalid authentication token: {error}") from error


def check_rate_limit(bucket_key: str, max_requests: int, window_seconds: int = 60) -> Dict[str, Any]:
    """
    Enforces a sliding-window rate limit for a given key (IP, merchant, or operation).

    What it does:
        - Prunes timestamps older than window_seconds
        - Checks if current count exceeds max_requests
        - Records the request timestamp if allowed

    Args:
        bucket_key: Identifier for the rate-limit bucket (e.g. 'login:127.0.0.1')
        max_requests: Maximum allowed requests within the window
        window_seconds: Sliding window duration in seconds

    Returns:
        Dict[str, Any]: {"allowed": bool, "remaining": int, "retry_after_seconds": int}
    """
    now_ts = time.time()
    cutoff_ts = now_ts - window_seconds

    with _RATE_LIMIT_LOCK:
        timestamps = _RATE_LIMIT_BUCKETS.get(bucket_key, [])
        valid_timestamps = []
        for ts in timestamps:
            if ts > cutoff_ts:
                valid_timestamps.append(ts)

        if len(valid_timestamps) >= max_requests:
            oldest_ts = valid_timestamps[0]
            retry_after = max(1, int(window_seconds - (now_ts - oldest_ts)))
            _RATE_LIMIT_BUCKETS[bucket_key] = valid_timestamps
            return {
                "allowed": False,
                "remaining": 0,
                "retry_after_seconds": retry_after
            }

        valid_timestamps.append(now_ts)
        _RATE_LIMIT_BUCKETS[bucket_key] = valid_timestamps
        remaining_count = max(0, max_requests - len(valid_timestamps))
        return {
            "allowed": True,
            "remaining": remaining_count,
            "retry_after_seconds": 0
        }


def reset_rate_limit_buckets() -> None:
    """
    Clears all in-memory rate limit buckets (used in automated testing).

    What it does:
        - Resets _RATE_LIMIT_BUCKETS dictionary safely under lock

    Args:
        None

    Returns:
        None
    """
    with _RATE_LIMIT_LOCK:
        _RATE_LIMIT_BUCKETS.clear()


def calculate_backoff_seconds(
    attempt_number: int,
    base_seconds: float = 0.5,
    max_seconds: float = 15.0
) -> float:
    """
    Calculates bounded exponential backoff with random jitter for safe retries.

    What it does:
        - Multiplies base_seconds by 2^attempt_number
        - Caps at max_seconds and adds 0-25% uniform random jitter

    Args:
        attempt_number: Zero-indexed retry attempt count (0, 1, 2, ...)
        base_seconds: Starting backoff delay in seconds
        max_seconds: Maximum backoff ceiling in seconds

    Returns:
        float: Number of seconds to wait before retrying
    """
    exponential_delay = min(max_seconds, base_seconds * (2 ** max(0, attempt_number)))
    jitter = random.uniform(0.0, exponential_delay * 0.25)
    return round(min(max_seconds, exponential_delay + jitter), 3)


def compute_request_fingerprint(payload: Dict[str, Any]) -> str:
    """
    Computes a deterministic SHA-256 fingerprint of a request payload for idempotency checks.

    What it does:
        - Serializes the dictionary with sorted keys
        - Returns the SHA-256 hex digest

    Args:
        payload: Dictionary of request parameters

    Returns:
        str: 64-character hex SHA-256 digest
    """
    canonical_json = json.dumps(payload or {}, sort_keys=True, default=str)
    return hashlib.sha256(canonical_json.encode("utf-8")).hexdigest()


def redact_sensitive_fields(data: Any) -> Any:
    """
    Recursively masks sensitive fields in dictionaries before logging.

    What it does:
        - Replaces values of keys matching SENSITIVE_FIELD_NAMES with '[REDACTED]'

    Args:
        data: Dictionary, list, or primitive value to sanitize

    Returns:
        Any: Sanitized copy safe for logs
    """
    if isinstance(data, dict):
        sanitized = {}
        for key, value in data.items():
            if str(key).lower() in SENSITIVE_FIELD_NAMES:
                sanitized[key] = "[REDACTED]"
            else:
                sanitized[key] = redact_sensitive_fields(value)
        return sanitized
    elif isinstance(data, list):
        sanitized_list = []
        for item in data:
            sanitized_list.append(redact_sensitive_fields(item))
        return sanitized_list
    return data


def log_structured_event(
    level: str,
    event_name: str,
    message: str,
    context: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Emits a structured JSON log line with automatic secret redaction.

    What it does:
        - Builds a standard observability event dictionary with UTC timestamp
        - Redacts any sensitive fields in context
        - Prints the JSON log entry to stdout

    Args:
        level: Log severity ('INFO', 'WARNING', 'ERROR', 'SECURITY')
        event_name: Machine-readable event identifier (e.g. 'webhook.verified')
        message: Human-readable summary message
        context: Optional dictionary of metadata (merchant_id, order_id, correlation_id)

    Returns:
        Dict[str, Any]: The structured log record
    """
    record = {
        "timestamp": get_current_timestamp(),
        "level": level.upper(),
        "event": event_name,
        "message": message,
        "context": redact_sensitive_fields(context or {})
    }
    print(json.dumps(record))
    return record


def format_currency(amount_paise: int, currency: str = "INR") -> str:
    """
    Formats minor currency units (paise/cents) into a human-readable currency string.

    What it does:
        - Converts integer minor units (e.g., 10000 paise) into major units (e.g., ₹100.00)

    Args:
        amount_paise: Integer amount in smallest currency unit (paise/cents)
        currency: ISO 4217 currency code (default 'INR')

    Returns:
        str: Formatted currency string
    """
    symbol = "₹" if currency.upper() == "INR" else f"{currency.upper()} "
    return f"{symbol}{(amount_paise / 100):.2f}"


def get_current_timestamp() -> str:
    """
    Returns the current UTC timestamp in ISO-8601 format.

    What it does:
        - Formats current UTC time with trailing 'Z'

    Args:
        None

    Returns:
        str: ISO-8601 UTC timestamp string
    """
    return datetime.now(timezone.utc).replace(tzinfo=None).isoformat() + "Z"

