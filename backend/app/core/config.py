"""
FILE: config.py
PURPOSE: Stores and loads all environment variables and project settings securely.
USED BY: main.py, api/chat.py
USES: pydantic_settings (external library)
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
import os
from functools import lru_cache

# Third-party libraries
from pydantic_settings import BaseSettings, SettingsConfigDict

# ──────────────────────────────────────────────
# CONSTANTS
# ──────────────────────────────────────────────
DEFAULT_API_TIMEOUT = 30

# ──────────────────────────────────────────────
# MAIN FUNCTIONS (AND CLASSES)
# ──────────────────────────────────────────────

class Settings(BaseSettings):
    """
    Stores all the secret keys and settings for the application.
    It automatically reads these from the .env file.
    """
    project_name: str = "Cyvault API"
    debug_mode: bool = True
    
    # API Keys
    groq_api_key: str = ""
    supabase_url: str = ""
    supabase_key: str = ""
    
    # Tell Pydantic to read from the .env file in the root folder
    # extra="ignore" means it will ignore extra variables in .env that are not listed here
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

@lru_cache()
def get_settings() -> Settings:
    """
    Creates and returns the Settings object.
    We use lru_cache so that it only reads the .env file once,
    which makes our application faster.
    
    Args:
        None
    
    Returns:
        Settings: An object containing all our configuration variables
    """
    # Create the settings object and print a debug message
    print("Loading settings from .env file...")
    return Settings()
