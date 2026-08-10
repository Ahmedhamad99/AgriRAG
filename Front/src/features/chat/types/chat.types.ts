export interface ChatRequest {
    question: string;
}

export interface ChatSource {
    filename: string;
    page: number;
}

export interface ChatResponse {
    answer: string;
    sources: ChatSource[];
}

export interface ChatMessageModel {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: ChatSource[];
}