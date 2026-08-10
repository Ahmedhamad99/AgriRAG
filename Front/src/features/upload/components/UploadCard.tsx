import { Card, CardContent } from "@/components/ui/card";

import { DropZone } from "./DropZone";
import { UploadActions } from "./UploadActions";
import { UploadProgress } from "../../../components/ui/UploadProgress";

interface UploadCardProps {
  file: File | null;
  progress: number;
  isUploading: boolean;

  onSelectFile: (file: File | null) => void;

  onUpload: () => void;

  onClear: () => void;
}

export function UploadCard({
  file,
  progress,
  isUploading,
  onSelectFile,
  onUpload,
  onClear,
}: UploadCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="space-y-6 p-6">
        <DropZone
          file={file}
          onFileSelect={onSelectFile}
        />

        {isUploading && (
          <UploadProgress progress={progress} />
        )}

        <UploadActions
          hasFile={!!file}
          isUploading={isUploading}
          onUpload={onUpload}
          onClear={onClear}
        />
      </CardContent>
    </Card>
  );
}