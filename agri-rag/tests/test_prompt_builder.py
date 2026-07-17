from app.rag.models import SearchResult
from app.rag.prompt_builder import PromptBuilder

builder = PromptBuilder()

results = [
    SearchResult(
        text="""
Late blight is caused by Phytophthora infestans.
Symptoms include brown lesions on leaves.
""",
        source="plant_diseases.pdf",
        page_number=5,
        chunk_number=1,
        distance=0.08,
        metadata={},
    ),
    SearchResult(
        text="""
Treatment includes resistant varieties and fungicide applications.
""",
        source="plant_diseases.pdf",
        page_number=6,
        chunk_number=2,
        distance=0.11,
        metadata={},
    ),
]

prompt = builder.build(
    question="What causes potato late blight?",
    search_results=results,
)

print(prompt)