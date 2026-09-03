import base64
import os
import json
import hashlib
from datetime import datetime
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from backend.config import settings

def hash_password(password: str) -> str:
    """Hashes a password using SHA-256 for demo purposes."""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a password against its hash."""
    return hash_password(plain_password) == hashed_password

def _get_encryption_key() -> bytes:
    """Gets the master encryption key, ensuring it's exactly 32 bytes."""
    key_str = settings.MASTER_ENCRYPTION_KEY
    if not key_str:
        # Fallback for dev if not provided, though it SHOULD be in .env
        return b"0" * 32
        
    try:
        key = base64.b64decode(key_str)
        if len(key) != 32:
            # Pad or truncate to 32 bytes
            key = (key + b"0" * 32)[:32]
        return key
    except Exception:
        # Fallback if not valid base64
        key = key_str.encode("utf-8")
        return (key + b"0" * 32)[:32]

def encrypt_api_key(plain_text: str) -> str:
    """
    Encrypts a string (e.g. Razorpay API Key) using AES-256-GCM.
    Returns a url-safe base64 string containing nonce + ciphertext.
    """
    if not plain_text:
        return ""
        
    key = _get_encryption_key()
    aesgcm = AESGCM(key)
    nonce = os.urandom(12) # 96-bit nonce is standard for GCM
    
    cipher_text = aesgcm.encrypt(nonce, plain_text.encode("utf-8"), None)
    
    # Store nonce prepended to cipher text
    combined = nonce + cipher_text
    return base64.urlsafe_b64encode(combined).decode("utf-8")

def decrypt_api_key(encrypted_text: str) -> str:
    """
    Decrypts an AES-256-GCM encrypted string.
    """
    if not encrypted_text:
        return ""
        
    try:
        combined = base64.urlsafe_b64decode(encrypted_text.encode("utf-8"))
        if len(combined) < 12:
            return ""
            
        nonce = combined[:12]
        cipher_text = combined[12:]
        
        key = _get_encryption_key()
        aesgcm = AESGCM(key)
        
        plain_text = aesgcm.decrypt(nonce, cipher_text, None)
        return plain_text.decode("utf-8")
    except Exception as e:
        print(f"Decryption failed: {e}")
        return ""

def format_currency(amount_paise: int) -> str:
    """Format paise to INR string e.g. 10000 -> ₹100.00"""
    return f"₹{(amount_paise / 100):.2f}"

def get_current_timestamp() -> str:
    """Returns ISO format timestamp"""
    return datetime.utcnow().isoformat() + "Z"
