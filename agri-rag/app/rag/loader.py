from pathlib import Path

import fitz

from app.rag.models import PageDocument


class PDFLoader:
    """
    Responsible for extracting text from PDF files.
    """

    def load(self, file_path: str | Path) -> list[PageDocument]:

        document = fitz.open(file_path)

        pages: list[PageDocument] = []

        for index, page in enumerate(document):

            text = page.get_text()

            pages.append(
                PageDocument(
                    page_number=index + 1,
                    text=text,
                    source=Path(file_path).name,
                    metadata={
                        "page": index + 1
                    }
                )
            )

        document.close()

        return pages