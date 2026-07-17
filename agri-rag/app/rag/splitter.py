from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.rag.models import PageDocument,ChunkDocument


class TextSplitter:
    """
    Splits PageDocument objects into smaller chunks
    while preserving metadata.
    """

    def __init__(
        self,
        chunk_size: int = 800,
        chunk_overlap: int = 150,
    ):

        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                "",
            ],
        )

    def split(self, pages: list[PageDocument]):

        chunks = []

        for page in pages:

            split_texts = self.splitter.split_text(page.text)

            for index, chunk in enumerate(split_texts):

                chunks.append(
                    ChunkDocument(
                        chunk_number=index + 1,
                        page_number=page.page_number,
                        text=chunk,
                        source=page.source,
                        metadata={
                            **page.metadata
                        }
                    )
                )

        return chunks