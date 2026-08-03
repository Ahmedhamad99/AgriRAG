import logging

from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.exceptions import AppException


logger = logging.getLogger(__name__)


async def app_exception_handler(
    request: Request,
    exc: AppException,
) -> JSONResponse:

    logger.error(
        "Application error: %s",
        exc.message,
    )

    return JSONResponse(
        status_code=500,
        content={
            "error_code": exc.error_code,
            "message": exc.message,
        },
    )


async def unexpected_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:

    logger.exception(
        "Unexpected error while processing request"
    )

    return JSONResponse(
        status_code=500,
        content={
            "error_code": "INTERNAL_SERVER_ERROR",
            "message": "An unexpected error occurred.",
        },
    )