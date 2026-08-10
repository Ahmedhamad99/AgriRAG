from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    app_name: str = "AgriRAG API"
    app_version: str = "1.0.0"

    llm_model: str = "llama3.2"

    embedding_model: str = (
        "intfloat/multilingual-e5-large"
    )

    chroma_path: str = "data/chroma"
    chroma_collection: str = "agri_documents"

    upload_dir: str = "data/pdfs"

    retrieval_top_k: int = 5
    retrieval_max_distance: float = 1.3

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()