import { FileText } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { Document } from "../types/documents.types";
import { DeleteDialog } from "./DeleteDialog";

interface DocumentCardProps {
  document: Document;
  onDelete: (filename: string) => void;
}

export function DocumentCard({
  document,
  onDelete,
}: DocumentCardProps) {
  return (
    <Card className="flex items-center justify-between rounded-2xl p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-emerald-100 p-3">
          <FileText className="h-6 w-6 text-emerald-600" />
        </div>

        <div>
          <p className="font-semibold">
            {document.filename}
          </p>

          <Badge
            variant="secondary"
            className="mt-2"
          >
            PDF Document
          </Badge>
        </div>
      </div>

      <DeleteDialog
        filename={document.filename}
        onConfirm={onDelete}
      />
    </Card>
  );
}