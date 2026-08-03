from fastapi import APIRouter, Depends

from app.core.dependencies import get_chat_service
from app.services.chat_service import ChatService
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    SourceResponse,
)


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "/ask",
    response_model=ChatResponse,
)
async def ask_question(
    request: ChatRequest,
    chat_service: ChatService = Depends(
        get_chat_service
    ),
):

    result = chat_service.ask(
        request.question
    )

    unique_sources = {}

    for source in result.sources:

        key = (
            source.source,
            source.page_number,
        )

        unique_sources[key] = SourceResponse(
            filename=source.source,
            page=source.page_number,
        )

    return ChatResponse(
        answer=result.answer,
        sources=list(
            unique_sources.values()
        ),
    )