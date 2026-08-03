from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from app.core.dependencies import get_indexing_service
from app.schemas.upload import UploadResponse
from app.services.indexing_service import IndexingService
from app.core.config import settings

from app.core.dependencies import get_vector_store
from app.rag.vector_store import VectorStore

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)

UPLOAD_DIR = Path(settings.upload_dir)
UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


@router.post(
    "/upload",
    response_model=UploadResponse,
)
async def upload_pdf(
    file: UploadFile = File(...),
    indexing_service: IndexingService = Depends(get_indexing_service),
):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Invalid filename.",
        )

    destination = UPLOAD_DIR / file.filename

    try:
        content = await file.read()

        with open(destination, "wb") as buffer:
            buffer.write(content)

        chunks = indexing_service.index_pdf(destination)

    except Exception as exc:

        if destination.exists():
            destination.unlink()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to process PDF: {str(exc)}",
        )

    return UploadResponse(
        filename=file.filename,
        chunks=chunks,
        message="PDF uploaded and indexed successfully.",
    )


@router.delete("/{filename}")
def delete_document(
    filename: str,
    vector_store: VectorStore = Depends(get_vector_store),
):

    file_path = UPLOAD_DIR / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    try:

        # Delete chunks from ChromaDB
        vector_store.delete_document(
            source=filename
        )

        # Delete PDF from disk
        file_path.unlink()

        return {
            "filename": filename,
            "message": "Document deleted successfully.",
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete document: {str(exc)}",
        )