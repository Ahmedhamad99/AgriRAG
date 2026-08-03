from app.rag.embedding import EmbeddingService
from app.rag.vector_store import VectorStore
from app.services.retrieval import RetrievalService


embedding = EmbeddingService()
store = VectorStore()

retriever = RetrievalService(
    embedding_service=embedding,
    vector_store=store,
)

results = retriever.retrieve(
    "What are the symptoms of late blight?"
)

for result in results:
    print("=" * 60)
    print(result.source)
    print(result.page_number)
    print(result.distance)
    print(result.text[:300])