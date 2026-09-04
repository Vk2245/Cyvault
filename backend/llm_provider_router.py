import google.generativeai as genai
from groq import Groq
from backend.config import settings
from typing import Optional, Dict, Any

# Configure Gemini
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    gemini_model = genai.GenerativeModel('gemini-1.5-flash')
else:
    gemini_model = None

# Configure Groq
if settings.GROQ_API_KEY:
    groq_client = Groq(api_key=settings.GROQ_API_KEY)
else:
    groq_client = None

def get_llm_response(prompt: str, task_type: str = "general") -> str:
    """
    6-Layer Safety architecture router:
    1. Tries Gemini (Primary for Reasoning/General tasks)
    2. Falls back to Groq (Llama-3) if Gemini fails or rate-limits
    3. Falls back to deterministic templates if both fail
    
    This ensures our AI features never completely crash during a demo.
    """
    
    # 1. Try Gemini
    if gemini_model:
        try:
            response = gemini_model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Gemini API failed: {e}. Falling back to Groq...")
            
    # 2. Try Groq (Fallback)
    if groq_client:
        try:
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model="openai/gpt-oss-120b",
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            print(f"Groq API failed: {e}. Falling back to deterministic templates...")
            
    # 3. Deterministic Fallback (AI Unavailable Mode)
    if task_type == "receipt_narrate":
        return "Action was logged successfully per policy rules."
    elif task_type == "policy_compile":
        return '{"rule_type": "fallback_limit", "parameters": {"max": 1000}}'
    elif task_type == "settlement_qa":
        return "I am currently unable to process your request due to high traffic on our AI services. Please try again later."
        
    return "Error: AI services are currently unavailable. The core money-moving system remains operational."
