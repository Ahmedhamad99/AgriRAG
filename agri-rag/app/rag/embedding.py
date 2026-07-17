from sentence_transformers import SentenceTransformer

from app.core.config import settings


class EmbeddingService:

    def __init__(
        self,
        model_name: str | None = None,
    ):
        self.model_name = (
            model_name or settings.embedding_model
        )

        self.model = SentenceTransformer(
            self.model_name
        )

    def embed_documents(
        self,
        texts: list[str],
    ) -> list[list[float]]:

        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )

        return embeddings.tolist()

    def embed_query(
        self,
        query: str,
    ) -> list[float]:

        embedding = self.model.encode(
            query,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )

        return embedding.tolist()