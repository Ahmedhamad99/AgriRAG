import { Bot, User } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { ChatMessageModel } from "../types/chat.types";
import { SourceBadges } from "./SourceBadges";

interface ChatMessageProps {
  message: ChatMessageModel;
}

export function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <Card
        className={`max-w-3xl rounded-2xl p-5 shadow-sm ${
          isUser
            ? "bg-emerald-600 text-white"
            : "bg-white"
        }`}
      >
        <div className="mb-3 flex items-center gap-2">
          {isUser ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4 text-emerald-600" />
          )}

          <span className="text-sm font-semibold">
            {isUser ? "You" : "AgriRAG"}
          </span>
        </div>

        <p className="whitespace-pre-wrap leading-7">
          {message.content}
        </p>

        {!isUser &&
          message.sources && (
            <SourceBadges
              sources={message.sources}
            />
          )}
      </Card>
    </div>
  );
}