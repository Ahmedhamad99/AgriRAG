from functools import lru_cache

from app.rag.loader import PDFLoader
from app.rag.splitter import TextSplitter
from app.rag.embedding import EmbeddingService
from app.rag.vector_store import VectorStore
from app.services.retrieval import RetrievalService
from app.services.chat_service import ChatService
from app.services.indexing_service import IndexingService


@lru_cache
def get_embedding_service() -> EmbeddingService:
    return EmbeddingService()


@lru_cache
def get_vector_store() -> VectorStore:
    return VectorStore()


def get_indexing_service() -> IndexingService:
    return IndexingService(
        loader=PDFLoader(),
        splitter=TextSplitter(),
        embedding_service=get_embedding_service(),
        vector_store=get_vector_store(),
    )


def get_retrieval_service() -> RetrievalService:
    return RetrievalService(
        embedding_service=get_embedding_service(),
        vector_store=get_vector_store(),
    )


def get_chat_service() -> ChatService:
    return ChatService(
        retriever=get_retrieval_service(),
    )