import {
  useState,
  KeyboardEvent,
} from "react";

import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  loading: boolean;
  onSend: (
    message: string
  ) => Promise<void>;
}

export function ChatInput({
  loading,
  onSend,
}: ChatInputProps) {
  const [message, setMessage] =
    useState("");

  async function submit() {
    const value = message.trim();

    if (!value || loading) return;

    await onSend(value);

    setMessage("");
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      void submit();
    }
  }

  return (
    <div className="border-t pt-5">
      <Textarea
        rows={4}
        value={message}
        disabled={loading}
        placeholder="Ask anything about your uploaded agricultural documents..."
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />

      <div className="mt-4 flex justify-end">
        <Button
          disabled={
            loading ||
            !message.trim()
          }
          onClick={submit}
        >
          <SendHorizontal className="mr-2 h-4 w-4" />

          Send
        </Button>
      </div>
    </div>
  );
}