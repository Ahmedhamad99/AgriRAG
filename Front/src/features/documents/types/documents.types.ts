export interface DocumentItem {
  filename: string;
}

export interface DocumentsState {
  documents: DocumentItem[];
  isLoading: boolean;
}

export interface DeleteResponse {
  message: string;
}
export interface Document {
    filename: string;
}


export interface DeleteDocumentResponse {
  message: string;
}