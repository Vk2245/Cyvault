import requests
import os
from dotenv import load_dotenv

# .env file ko load karega (root folder se)
load_dotenv("../../.env") 

api_key = os.environ.get("GROQ_API_KEY")
url = "https://api.groq.com/openai/v1/models"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(response.json())
