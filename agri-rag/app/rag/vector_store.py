import chromadb

from app.core.config import settings
from app.rag.models import ChunkDocument, SearchResult


class VectorStore:

    def __init__(self):

        self.client = chromadb.PersistentClient(
            path=settings.chroma_path
        )

        self.collection = (
            self.client.get_or_create_collection(
                name=settings.chroma_collection
            )
        )
    def add_chunks(
        self,
        chunks: list[ChunkDocument],
        embeddings: list[list[float]],
    ):

        ids = []

        documents = []

        metadatas = []

        for chunk in chunks:

            ids.append(
                f"{chunk.source}_{chunk.page_number}_{chunk.chunk_number}"
            )

            documents.append(chunk.text)

            metadatas.append(
                {
                    "page": chunk.page_number,
                    "source": chunk.source,
                    "chunk": chunk.chunk_number,
                }
            )

        self.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
        )
    def search(
            self,
            query_embedding: list[float],
            k: int = 4,
        )->list[SearchResult]:

            results = self.collection.query(

                query_embeddings=[query_embedding],

                n_results=k,

            )
            search_results = []

            documents = results["documents"][0]
            metadatas = results["metadatas"][0]
            distances = results["distances"][0]

            for doc, metadata, distance in zip(documents, metadatas, distances):

                search_results.append(
                    SearchResult(
                        text=doc,
                        source=metadata["source"],
                        page_number=metadata["page"],
                        chunk_number=metadata["chunk"],
                        distance=distance,
                        metadata=metadata,
                    )
                )

            return search_results
    def count(self) -> int:
         return self.collection.count()
    
    def delete_document(
    self,
    source: str,
    ) -> None:

        self.collection.delete(
            where={
                "source": source
            }
        )
            