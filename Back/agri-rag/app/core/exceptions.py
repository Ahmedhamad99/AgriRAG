class AppException(Exception):
    """Base exception for application errors."""

    def __init__(
        self,
        message: str,
        error_code: str = "APPLICATION_ERROR",
    ):
        self.message = message
        self.error_code = error_code

        super().__init__(message)


class DocumentProcessingError(AppException):

    def __init__(self, message: str):
        super().__init__(
            message=message,
            error_code="DOCUMENT_PROCESSING_ERROR",
        )


class RetrievalError(AppException):

    def __init__(self, message: str):
        super().__init__(
            message=message,
            error_code="RETRIEVAL_ERROR",
        )


class LLMError(AppException):

    def __init__(self, message: str):
        super().__init__(
            message=message,
            error_code="LLM_ERROR",
        )