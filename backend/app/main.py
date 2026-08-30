"""
FILE: main.py
PURPOSE: Starts the FastAPI server and connects all our API routes.
USED BY: None (this is the entry point)
USES: config.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
# Step 1: Built-in libraries
import os

# Step 2: Third-party libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Step 3: Our own project files
from app.core.config import get_settings
from app.api import chat

# ──────────────────────────────────────────────
# CONSTANTS
# ──────────────────────────────────────────────
# In a real app, you might restrict this to just the frontend URL (e.g. http://localhost:3000)
ALLOWED_ORIGINS = ["*"]

# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

def create_application() -> FastAPI:
    """
    Creates and configures the FastAPI application.
    
    What it does:
        - Loads the settings
        - Initializes the FastAPI app with the correct title
        - Sets up CORS so the frontend can communicate with it
    
    Args:
        None
    
    Returns:
        FastAPI: The configured web application
    """
    # Load our settings
    settings = get_settings()
    
    # Initialize the app
    app = FastAPI(title=settings.project_name, debug=settings.debug_mode)
    
    # Add CORS middleware to allow cross-origin requests
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include our API routes
    app.include_router(chat.router, prefix="/api", tags=["Chatbot"])
    
    return app

# Create the app instance
app = create_application()

@app.get("/health")
def health_check() -> dict:
    """
    A simple endpoint to check if the server is running correctly.
    
    What it does:
        - Returns a success message
        
    Args:
        None
        
    Returns:
        dict: A dictionary containing the status and a message
    """
    return {"status": "success", "message": "Cyvault API is running"}

if __name__ == "__main__":
    # Start the server on port 8000
    print("Starting Cyvault Backend Server...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
