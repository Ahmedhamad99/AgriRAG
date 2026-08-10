import { Bot } from "lucide-react";

import { Card } from "@/components/ui/card";

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <Card className="rounded-2xl p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Bot className="h-4 w-4 text-emerald-600" />

          <span className="font-semibold">
            AgriRAG
          </span>
        </div>

        <div className="flex gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" />

          <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 delay-150" />

          <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 delay-300" />
        </div>
      </Card>
    </div>
  );
}