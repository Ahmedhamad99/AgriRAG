import logging

from app.rag.embedding import EmbeddingService
from app.rag.vector_store import VectorStore
from app.rag.models import SearchResult


logger = logging.getLogger(__name__)


class RetrievalService:

    def __init__(
        self,
        embedding_service: EmbeddingService,
        vector_store: VectorStore,
    ):
        self.embedding_service = embedding_service
        self.vector_store = vector_store

    def retrieve(
        self,
        question: str,
        k: int = 4,
        max_distance: float | None = None,
    ) -> list[SearchResult]:

        logger.info(
            "Starting retrieval for question"
        )

        query_embedding = (
            self.embedding_service.embed_query(
                question
            )
        )

        results = self.vector_store.search(
            query_embedding=query_embedding,
            k=k,
        )

        logger.info(
            "Vector search returned %d results",
            len(results),
        )

        if max_distance is not None:
            results = [
                result
                for result in results
                if result.distance <= max_distance
            ]

            logger.info(
                "%d results remained after distance filtering",
                len(results),
            )

        return results