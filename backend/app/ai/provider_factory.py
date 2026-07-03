import os

from app.ai.providers.mock_provider import MockAIProvider
from app.ai.providers.ollama_provider import OllamaProvider


def get_provider():
    provider_name = os.getenv("AI_PROVIDER", "ollama")

    if provider_name == "mock":
        return MockAIProvider()

    if provider_name == "ollama":
        return OllamaProvider()

    raise ValueError(f"Unknown provider: {provider_name}")