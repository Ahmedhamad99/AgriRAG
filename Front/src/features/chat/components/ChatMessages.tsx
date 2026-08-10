import {
  useEffect,
  useRef,
} from "react";

import { Bot } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { EmptyState } from "@/components/common/EmptyState";

import { ChatMessage } from "./ChatMessage";

import type { ChatMessageModel } from "../types/chat.types";

interface Props {
  messages: ChatMessageModel[];
  loading: boolean;
}

export function ChatMessages({
  messages,
  loading,
}: Props) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (
    messages.length === 0 &&
    !loading
  ) {
    return (
      <EmptyState
        icon={<Bot className="h-10 w-10" />}
        title="Start a Conversation"
        description="Ask questions about your uploaded agricultural documents."
      />
    );
  }

  return (
    <ScrollArea className="h-[500px] rounded-2xl border bg-gray-50 p-4">
      <div className="space-y-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:150ms]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}