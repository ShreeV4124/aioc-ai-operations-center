from app.rag.schemas import RetrievalResult
from app.rag.document_loader import load_documents
from app.rag.embedder import generate_embedding

import math


VECTOR_STORE = []


def cosine_similarity(vec1, vec2):
    dot_product = sum(a * b for a, b in zip(vec1, vec2))

    magnitude1 = math.sqrt(sum(x * x for x in vec1))
    magnitude2 = math.sqrt(sum(x * x for x in vec2))

    if magnitude1 == 0 or magnitude2 == 0:
        return 0

    return dot_product / (magnitude1 * magnitude2)


def build_vector_store():
    global VECTOR_STORE

    VECTOR_STORE = []
    documents = load_documents()
    print(f"Loaded {len(documents)} documents")
    
    for doc in documents:
        embedding = generate_embedding(doc.content)

        VECTOR_STORE.append({
            "document": doc,
            "embedding": embedding
        })


def search_similar(query_embedding, top_k=3):
    scored_results = []

    for item in VECTOR_STORE:
        score = cosine_similarity(
            query_embedding,
            item["embedding"]
        )

        scored_results.append(
            RetrievalResult(
                title=item["document"].title,
                content=item["document"].content,
                score=score
            )
        )

    scored_results.sort(
        key=lambda x: x.score,
        reverse=True
    )

    threshold = 0.65

    filtered_results = [
        result for result in scored_results
        if result.score >= threshold
    ]

    return filtered_results[:top_k]