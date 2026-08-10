
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  uploadSchema,
  type UploadFormValues,
} from "../validation/upload.schema";

import { uploadDocument } from "../services/upload.service";

interface UseUploadOptions {
  onSuccess?: () => void;
}

export function useUpload(
  options?: UseUploadOptions
) {
  const [progress, setProgress] =
    useState(0);

  const [isUploading, setUploading] =
    useState(false);

  const form =
    useForm<UploadFormValues>({
      resolver:
        zodResolver(uploadSchema),
    });

  const upload =
    form.handleSubmit(async (data) => {
      try {
        setUploading(true);

        setProgress(0);

        await uploadDocument(
          data.file,
          setProgress
        );

        toast.success(
          "Document uploaded successfully."
        );

        form.reset();

        options?.onSuccess?.();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.detail ??
            "Upload failed."
        );
      } finally {
        setUploading(false);
      }
    });

  return {
    form,

    upload,

    progress,

    isUploading,
  };
}