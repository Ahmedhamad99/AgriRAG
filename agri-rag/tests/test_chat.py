from app.services.chat_service import ChatService
from app.rag.embedding import EmbeddingService
from app.services.retrieval import RetrievalService
from app.rag.vector_store import VectorStore

embedding = EmbeddingService()
store = VectorStore()

retriever = RetrievalService(
    embedding_service=embedding,
    vector_store=store,
)

chat = ChatService(retriever)

answer = chat.ask(
    "What causes potato late blight?"
)

print("=" * 80)
print(answer)
print("=" * 80)