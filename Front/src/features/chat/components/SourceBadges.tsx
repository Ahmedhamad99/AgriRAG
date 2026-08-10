import { Badge } from "@/components/ui/badge";
import {
  FileText,
  MapPin,
} from "lucide-react";

import type { ChatSource } from "../types/chat.types";

interface Props {
  sources: ChatSource[];
}

export function SourceBadges({
  sources,
}: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {sources.map((source) => (
        <div
          key={`${source.filename}-${source.page}`}
          className="flex gap-2"
        >
          <Badge
            variant="secondary"
            className="gap-1"
          >
            <FileText className="h-3 w-3" />
            {source.filename}
          </Badge>

          <Badge
            variant="outline"
            className="gap-1"
          >
            <MapPin className="h-3 w-3" />
            Page {source.page}
          </Badge>
        </div>
      ))}
    </div>
  );
}