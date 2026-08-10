import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { SectionTitle } from "@/components/common/SectionTitle";

import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

import { useChat } from "../hooks/useChat";

export function ChatSection() {
  const {
    messages,
    loading,
    send,
  } = useChat();

  return (
    <section className="space-y-6">
      <SectionTitle
        title="AI Assistant"
        description="Ask questions based on your uploaded agricultural PDF documents."
      />

      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <CardContent className="p-0">
          <div className="p-6">
            <ChatMessages
              messages={messages}
              loading={loading}
            />
          </div>

          <div className="bg-white px-6 pb-6">
            <ChatInput
              loading={loading}
              onSend={send}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}