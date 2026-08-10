
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { toast } from "sonner";

import {
  fetchDocuments,
  removeDocument,
} from "../services/documents.service";

import type { DocumentItem } from "../types/documents.types";

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await fetchDocuments();

      setDocuments(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Unable to load documents."
        );
      } else {
        toast.error("Unexpected error.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remove = async (filename: string) => {
    try {
      await removeDocument(filename);

      toast.success("Document deleted.");

      await refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Delete failed."
        );
      } else {
        toast.error("Unexpected error.");
      }
    }
  };

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    documents,
    isLoading,
    refresh,
    remove,
  };
}