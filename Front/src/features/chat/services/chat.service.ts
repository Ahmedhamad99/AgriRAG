import { api } from "@/services/api";
import { API } from "@/constants/api";

import type {
    ChatRequest,
    ChatResponse,
} from "../types/chat.types";

export async function askQuestion(
    question: string
): Promise<ChatResponse> {

    const body: ChatRequest = {
        question,
    };

    const response =
        await api.post<ChatResponse>(
            API.ENDPOINTS.CHAT,
            body
        );

    return response.data;
}