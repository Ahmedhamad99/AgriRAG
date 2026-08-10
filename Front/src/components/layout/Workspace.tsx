import { useRef } from "react";

import { UploadSection } from "@/features/upload/components/UploadSection";
import { DocumentsSection } from "@/features/documents/components/DocumentsSection";
import { ChatSection } from "@/features/chat/components/ChatSection";

export function Workspace() {
  const documentsRef = useRef<{
    refresh: () => void;
  } | null>(null);

  return (
    <main className="mt-10 space-y-10">
      <UploadSection
        onUploadSuccess={() =>
          documentsRef.current?.refresh()
        }
      />

      <DocumentsSection
        ref={documentsRef}
      />

      <ChatSection />
    </main>
  );
}