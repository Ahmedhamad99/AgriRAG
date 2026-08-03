from langchain_core.messages import HumanMessage, SystemMessage
from langchain_ollama import ChatOllama
from app.core.config import settings
from app.rag.models import ChatResult
from app.rag.prompt_builder import PromptBuilder
from app.services.retrieval import RetrievalService
import logging
from app.core.exceptions import LLMError

logger = logging.getLogger(__name__)
class ChatService:

    def __init__(
        self,
        retriever: RetrievalService,
    ):
        self.retriever = retriever
        self.prompt_builder = PromptBuilder()

        self.llm = ChatOllama(
            model=settings.llm_model,
            temperature=0,
        )
        
    def ask(
        self,
        question: str,
    ) -> ChatResult:

        logger.info(
            "Processing new RAG question"
        )

        results = self.retriever.retrieve(
            question,
            k=settings.retrieval_top_k,
            max_distance=settings.retrieval_max_distance,
        )

        if not results:

            logger.warning(
                "No relevant context found"
            )

            return ChatResult(
                answer=(
                    "I couldn't find the answer "
                    "in the uploaded documents."
                ),
                sources=[],
            )

        logger.info(
            "Building prompt using %d retrieved chunks",
            len(results),
        )

        prompt = self.prompt_builder.build(
            question=question,
            search_results=results,
        )

        logger.info(
            "Sending prompt to LLM"
        )

        try:

                response = self.llm.invoke(
                    [
                        SystemMessage(
                            content=prompt.system
                        ),
                        HumanMessage(
                            content=prompt.user
                        ),
                    ]
                )

        except Exception as exc:

            logger.exception(
                "Failed to generate LLM response"
            )

            raise LLMError(
                "Failed to generate an answer from the language model."
            ) from exc

        logger.info(
            "LLM answer generated successfully"
        )

        return ChatResult(
            answer=response.content,
            sources=results,
        )