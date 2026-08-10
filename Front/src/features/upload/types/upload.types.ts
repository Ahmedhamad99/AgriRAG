export interface UploadResponse {
  message: string;
}

export interface UploadError {
  detail: string;
}



export interface UploadSectionProps {
  onUploadSuccess?: () => void;
}