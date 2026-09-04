"""
FILE: chat.py
PURPOSE: Handles chatbot requests and connects to the Groq LLM API.
USED BY: main.py (imports this router)
USES: config.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
# Step 1: Python built-in libraries
import os

# Step 2: Third-party libraries
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq

# Step 3: Our own project files
from app.core.config import get_settings

# ──────────────────────────────────────────────
# CONSTANTS
# ──────────────────────────────────────────────
LLM_MODEL_NAME = "openai/gpt-oss-120b"  # Updated active model

# Create the router to group our chat endpoints
router = APIRouter()

# ──────────────────────────────────────────────
# Pydantic Models (Input / Output formats)
# ──────────────────────────────────────────────
class ChatRequest(BaseModel):
    """Defines the input format we expect from the frontend."""
    message: str

class ChatResponse(BaseModel):
    """Defines the output format we will send back to the frontend."""
    reply: str

# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

@router.post("/chat", response_model=ChatResponse)
def chat_with_insights_bot(request: ChatRequest) -> dict:
    """
    Takes a user message and gets a response from the Groq AI model.
    
    What it does:
        - Reads the Groq API key from settings
        - Initializes the Groq client
        - Sends the user's message to the Llama 3 model
        - Returns the AI's reply
    
    Args:
        request: A ChatRequest object containing the user's message
    
    Returns:
        A dictionary matching the ChatResponse format
    """
    settings = get_settings()
    
    # Check if the API key is configured
    if not settings.groq_api_key:
        print("ERROR: Groq API Key is missing in settings.")
        raise HTTPException(
            status_code=500, 
            detail="Groq API key is not configured. Please add it to the .env file."
        )
    
    try:
        # Connect to Groq using our API key
        client = Groq(api_key=settings.groq_api_key)
        
        # Ask the AI model
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are Cyvault's Insights Bot. You help merchants understand their revenue leaks and recovery metrics. Keep answers short, helpful, and professional."
                },
                {
                    "role": "user",
                    "content": request.message,
                }
            ],
            model=LLM_MODEL_NAME,
        )
        
        # Extract the reply text from the AI's response
        ai_reply = chat_completion.choices[0].message.content
        
        return {"reply": ai_reply}
        
    except Exception as error:
        # If anything goes wrong, catch the error and return a safe message
        print(f"ERROR: Failed to talk to Groq API. Reason: {error}")
        raise HTTPException(status_code=500, detail="The AI is currently unavailable. Please try again later.")
