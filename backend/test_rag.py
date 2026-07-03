from app.rag.vector_store import build_vector_store
from app.rag.retriever import retrieve_context


build_vector_store()

results = retrieve_context(
    "Users getting API gateway 503 errors"
)

for result in results:
    print("=" * 50)
    print("TITLE:", result.title)
    print("SCORE:", result.score)
    print("CONTENT:", result.content)