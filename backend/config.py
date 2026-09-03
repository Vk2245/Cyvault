import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    """
    Central Configuration Object
    Uses pydantic-settings to validate and load from environment variables and .env
    """
    
    # App Config
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Database
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    DATABASE_URL: str = "sqlite:///./test.db" # Fallback if none provided
    
    # Security
    MASTER_ENCRYPTION_KEY: str = "" # Used for AES encrypting merchant API keys
    JWT_SECRET: str = ""
    
    # Razorpay (Test Mode)
    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""
    RAZORPAY_WEBHOOK_SECRET: str = ""
    
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

settings = Settings()
