from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    return {
        "message": "AgriRAG API is running."
    }