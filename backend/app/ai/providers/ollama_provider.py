import requests
import json

from app.ai.providers.base import BaseAIProvider


class OllamaProvider(BaseAIProvider):

    def analyze_incident(self, prompt):
        url = "http://localhost:11434/api/generate"

        payload = {
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }

        try:
            response = requests.post(
                url,
                json=payload,
                timeout=120
            )

            result = response.json()

            llm_output = result["response"]

            return llm_output

        except Exception:
            return json.dumps({
                "root_cause": "Ollama unavailable",
                "confidence": 0,
                "recommendations": [
                    "Check Ollama service",
                    "Verify model installation",
                    "Retry later"
                ]
            })