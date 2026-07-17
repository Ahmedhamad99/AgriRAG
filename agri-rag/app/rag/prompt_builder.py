from app.rag.models import Prompt, SearchResult


class PromptBuilder:

    SYSTEM_PROMPT = """
You are an expert Agricultural AI Assistant.

Rules:
1. Answer ONLY using the provided context.
2. Never use outside knowledge.
3. If the answer is not found, reply:
"I couldn't find the answer in the uploaded documents."
4. Mention the source page whenever possible.
"""

    def build(
        self,
        question: str,
        search_results: list[SearchResult],
    ) -> Prompt:

        context = "\n\n".join(
            f"""
Source: {result.source}
Page: {result.page_number}

Content:
{result.text}
"""
            for result in search_results
        )

        user_prompt = f"""
Context:

{context}

Question:

{question}
"""

        return Prompt(
            system=self.SYSTEM_PROMPT,
            user=user_prompt,
        )