import logging
from pathlib import Path

from app.rag.loader import PDFLoader
from app.rag.splitter import TextSplitter
from app.rag.embedding import EmbeddingService
from app.rag.vector_store import VectorStore


logger = logging.getLogger(__name__)


class IndexingService:

    def __init__(
        self,
        loader: PDFLoader,
        splitter: TextSplitter,
        embedding_service: EmbeddingService,
        vector_store: VectorStore,
    ):
        self.loader = loader
        self.splitter = splitter
        self.embedding_service = embedding_service
        self.vector_store = vector_store

    def index_pdf(
        self,
        pdf_path: str | Path,
    ) -> int:

        logger.info(
            "Starting PDF indexing: %s",
            pdf_path,
        )

        # Step 1: Load PDF
        pages = self.loader.load(pdf_path)

        logger.info(
            "Loaded %d pages from %s",
            len(pages),
            pdf_path,
        )

        # Step 2: Split into chunks
        chunks = self.splitter.split(pages)

        logger.info(
            "Created %d chunks",
            len(chunks),
        )

        # Step 3: Generate embeddings
        texts = [
            chunk.text
            for chunk in chunks
        ]

        logger.info(
            "Generating embeddings for %d chunks",
            len(texts),
        )

        embeddings = (
            self.embedding_service.embed_documents(
                texts
            )
        )

        logger.info(
            "Generated %d embeddings",
            len(embeddings),
        )

        # Step 4: Store in ChromaDB
        self.vector_store.add_chunks(
            chunks,
            embeddings,
        )

        logger.info(
            "Successfully indexed PDF: %s",
            pdf_path,
        )

        return len(chunks)