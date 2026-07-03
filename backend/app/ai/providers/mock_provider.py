from app.ai.providers.base import BaseAIProvider
import json


class MockAIProvider(BaseAIProvider):

    def analyze_incident(self, prompt):
       return json.dumps({
    "root_cause": "Database connection pool exhaustion detected.",
    "confidence": 82,
    "recommendations": [
        "Check database connection pool usage",
        "Restart overloaded backend pods",
        "Review recent deployments"
    ]
    })