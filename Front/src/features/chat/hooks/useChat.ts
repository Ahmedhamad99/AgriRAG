import { useState } from "react";
import { toast } from "sonner";

import { askQuestion } from "../services/chat.service";

import type { ChatMessageModel } from "../types/chat.types";

export function useChat() {

    const [
        messages,
        setMessages,
    ] = useState<ChatMessageModel[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    async function send(
        question: string
    ) {

        if (!question.trim()) return;

        const userMessage = {

            id: crypto.randomUUID(),

            role: "user",

            content: question,

        } satisfies ChatMessageModel;

        setMessages(prev => [

            ...prev,

            userMessage,

        ]);

        try {

            setLoading(true);

            const response =
                await askQuestion(question);

            const assistantMessage = {

                id: crypto.randomUUID(),

                role: "assistant",

                content:
                    response.answer,

                sources:
                    response.sources,

            } satisfies ChatMessageModel;

            setMessages(prev => [

                ...prev,

                assistantMessage,

            ]);

        } catch {

            toast.error(
                "Unable to contact AgriRAG."
            );

        } finally {

            setLoading(false);

        }

    }

    return {

        messages,

        loading,

        send,

    };

}