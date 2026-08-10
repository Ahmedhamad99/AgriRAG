import { api } from "@/services/api";
import { API } from "@/constants/api";

import type {
  DocumentItem,
  DeleteDocumentResponse,
} from "../types/documents.types";

export async function fetchDocuments(): Promise<DocumentItem[]> {
  const response = await api.get<DocumentItem[]>(
    API.ENDPOINTS.DOCUMENTS
  );

  return response.data;
}

export async function removeDocument(
  filename: string
): Promise<DeleteDocumentResponse> {
  const response =
    await api.delete<DeleteDocumentResponse>(
      `${API.ENDPOINTS.DOCUMENTS}/${encodeURIComponent(
        filename
      )}`
    );

  return response.data;
}