import {
  Loader2,
  RotateCcw,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface UploadActionsProps {
  hasFile: boolean;
  isUploading: boolean;

  onUpload: () => void;

  onReset: () => void;
}

export function UploadActions({
  hasFile,
  isUploading,
  onUpload,
  onReset,
}: UploadActionsProps) {
  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="outline"
        onClick={onReset}
        disabled={!hasFile || isUploading}
      >
        <RotateCcw className="mr-2 h-4 w-4" />

        Reset
      </Button>

      <Button
        onClick={onUpload}
        disabled={!hasFile || isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />

            Upload
          </>
        )}
      </Button>
    </div>
  );
}