import { api } from "@/services/api";

import { API } from "@/constants/api";

import type { UploadResponse } from "../types/upload.types";

export async function uploadDocument(
  file: File,
  onProgress?: (
    progress: number
  ) => void
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response =
    await api.post<UploadResponse>(
      API.ENDPOINTS.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },

        onUploadProgress(event) {
          if (!event.total) return;

          const progress =
            Math.round(
              (event.loaded * 100) /
                event.total
            );

          onProgress?.(progress);
        },
      }
    );

  return response.data;
}