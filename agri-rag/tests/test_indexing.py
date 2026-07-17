from app.rag.loader import PDFLoader
from app.rag.splitter import TextSplitter
from app.rag.embedding import EmbeddingService
from app.rag.vector_store import VectorStore
from app.services.indexing_service import IndexingService


indexer = IndexingService(
    loader=PDFLoader(),
    splitter=TextSplitter(),
    embedding_service=EmbeddingService(),
    vector_store=VectorStore(),
)

count = indexer.index_pdf(
    "data/pdfs/plant_diseases.pdf"
)

print(f"Indexed {count} chunks")