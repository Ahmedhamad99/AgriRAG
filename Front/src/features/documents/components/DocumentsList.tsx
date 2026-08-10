import type { DocumentItem } from "../types/documents.types";

import { EmptyDocuments } from "./EmptyDocuments";
import { DocumentCard } from "./DocumentCard";

interface DocumentsListProps {
  documents: DocumentItem[];
  onDelete: (filename: string) => void;
}

export function DocumentsList({
  documents,
  onDelete,
}: DocumentsListProps) {
  if (documents.length === 0) {
    return <EmptyDocuments />;
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.filename}
          document={document}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}