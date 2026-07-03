from app.rag.embedder import generate_embedding
from app.rag.vector_store import search_similar


def retrieve_context(query: str, top_k=3):
    query_embedding = generate_embedding(query)

    results = search_similar(
        query_embedding,
        top_k=top_k
    )

    return results