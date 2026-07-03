import requests


OLLAMA_EMBED_URL = "http://localhost:11434/api/embeddings"
EMBED_MODEL = "nomic-embed-text"


def generate_embedding(text: str):
    payload = {
        "model": EMBED_MODEL,
        "prompt": text
    }

    response = requests.post(
        OLLAMA_EMBED_URL,
        json=payload,
        timeout=120
    )

    result = response.json()

    return result["embedding"]