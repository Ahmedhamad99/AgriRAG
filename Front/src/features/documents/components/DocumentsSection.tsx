import { Card, CardContent } from "@/components/ui/card";
import { FileSearch } from "lucide-react";

import { SectionTitle } from "@/components/common/SectionTitle";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";

import { useDocuments } from "../hooks/useDocuments";
import { DocumentCard } from "./DocumentCard";

export function DocumentsSection() {
  const {
    documents,
    isLoading,
    remove,
  } = useDocuments();

  return (
    <section className="space-y-6">
      <SectionTitle
        title="Uploaded Documents"
        description="Manage the documents available to the AI assistant."
      />

      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            <LoadingSkeleton rows={3} />
          ) : documents.length === 0 ? (
            <EmptyState
              icon={<FileSearch className="h-10 w-10" />}
              title="No Documents"
              description="Upload your first PDF to begin chatting with AgriRAG."
            />
          ) : (
            <div className="space-y-4">
              {documents.map((document) => (
                <DocumentCard
                  key={document.filename}
                  document={document}
                  onDelete={remove}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}