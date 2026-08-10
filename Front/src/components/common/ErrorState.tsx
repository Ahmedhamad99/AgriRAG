import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({
  message,
}: ErrorStateProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
      <AlertCircle className="h-5 w-5" />

      <p>{message}</p>
    </div>
  );
}