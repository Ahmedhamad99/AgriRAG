from dataclasses import dataclass, field
from typing import Any


@dataclass
class PageDocument:
    """
    Represents a single page extracted from a PDF document.
    """

    page_number: int
    text: str
    source: str
    metadata: dict[str, Any] = field(default_factory=dict)



@dataclass
class ChunkDocument:
    chunk_number: int
    page_number: int
    text: str
    source: str
    metadata: dict[str, Any] = field(default_factory=dict)



@dataclass
class BaseDocument:
    text: str
    source: str
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class SearchResult:
    text: str
    source: str
    page_number: int
    chunk_number: int
    distance: float
    metadata: dict[str, Any] = field(default_factory=dict)


from dataclasses import dataclass


@dataclass
class Prompt:
    system: str
    user: str



@dataclass
class ChatResult:
    answer: str
    sources: list[SearchResult]