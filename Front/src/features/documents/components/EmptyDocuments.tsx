import { FileSearch } from "lucide-react";

export function EmptyDocuments() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-12 text-center">
      <FileSearch className="mb-4 h-12 w-12 text-gray-400" />

      <h3 className="text-lg font-semibold text-gray-800">
        No Documents Yet
      </h3>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Upload your first agricultural PDF to start chatting with the AI.
      </p>
    </div>
  );
}