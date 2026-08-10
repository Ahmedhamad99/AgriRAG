

import { Controller, useWatch } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";

import { Upload } from "lucide-react";

import { SectionTitle } from "@/components/common/SectionTitle";

import { DropZone } from "./DropZone";
import { UploadProgress } from "../../../components/ui/UploadProgress";
import { UploadActions } from "./UploadActions";

import { useUpload } from "../hooks/useUpload";

interface UploadSectionProps {
  onUploadSuccess?: () => void;
}

export function UploadSection({
  onUploadSuccess,
}: UploadSectionProps) {
  const {
    form,
    upload,
    progress,
    isUploading,
  } = useUpload({
    onSuccess: onUploadSuccess,
  });

  const selectedFile = useWatch({
    control: form.control,
    name: "file",
  });

  return (
    <section className="space-y-6">
      <SectionTitle
        icon={<Upload className="h-5 w-5" />}
        title="Upload Documents"
        description="Upload agricultural PDF files to make them searchable by AgriRAG."
      />

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="space-y-6 p-6">
          <Controller
            control={form.control}
            name="file"
            render={({ field, fieldState }) => (
              <DropZone
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                disabled={isUploading}
              />
            )}
          />

          {isUploading && (
            <UploadProgress value={progress} />
          )}

          <UploadActions
            hasFile={!!selectedFile}
            isUploading={isUploading}
            onUpload={upload}
            onReset={() => form.reset()}
          />
        </CardContent>
      </Card>
    </section>
  );
}