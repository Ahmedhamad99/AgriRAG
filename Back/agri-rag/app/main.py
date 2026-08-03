from fastapi import FastAPI

from app.api.chat import router as chat_router
from app.api.upload import router as upload_router

from app.core.config import settings
from app.core.logging_config import setup_logging
from app.core.exceptions import AppException
from app.core.exception_handlers import (
    app_exception_handler,
    unexpected_exception_handler,
)


setup_logging()


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)


app.add_exception_handler(
    AppException,
    app_exception_handler,
)

app.add_exception_handler(
    Exception,
    unexpected_exception_handler,
)


app.include_router(upload_router)
app.include_router(chat_router)


@app.get("/")
def home():
    print(app.routes)
    return {
        "message": "AgriRAG API is running."
    }