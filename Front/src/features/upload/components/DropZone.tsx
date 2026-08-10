import { useRef, useState } from "react";
import {
  CloudUpload,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface DropZoneProps {
  value?: File;

  error?: string;

  disabled?: boolean;

  onChange: (
    file: File | undefined
  ) => void;
}

export function DropZone({
  value,
  error,
  disabled = false,
  onChange,
}: DropZoneProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [
    isDragging,
    setDragging,
  ] = useState(false);

  function openPicker() {
    if (disabled) return;

    inputRef.current?.click();
  }

  function handleFile(
    file?: File
  ) {
    onChange(file);
  }

  function formatSize(bytes: number) {
    return `${(
      bytes /
      1024 /
      1024
    ).toFixed(2)} MB`;
  }

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="application/pdf,.pdf"
        disabled={disabled}
        onChange={(e) =>
          handleFile(
            e.target.files?.[0]
          )
        }
      />

      <div
        role="button"
        tabIndex={
          disabled ? -1 : 0
        }
        onClick={openPicker}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" ||
            e.key === " "
          ) {
            e.preventDefault();

            openPicker();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();

          setDragging(true);
        }}
        onDragOver={(e) =>
          e.preventDefault()
        }
        onDragLeave={(e) => {
          e.preventDefault();

          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();

          setDragging(false);

          handleFile(
            e.dataTransfer.files?.[0]
          );
        }}
        className={cn(
          "cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500",

          isDragging
            ? "border-emerald-500 bg-emerald-50"
            : "border-gray-300 bg-gray-50",

          disabled &&
            "cursor-not-allowed opacity-60",

          error &&
            "border-red-400 bg-red-50"
        )}
      >
        <CloudUpload className="mx-auto mb-5 h-12 w-12 text-emerald-600" />

        <h3 className="text-lg font-semibold">
          Drag & Drop your PDF
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          or click to browse
        </p>

        <p className="mt-1 text-xs text-gray-400">
          PDF • Max 20 MB
        </p>

        {value && (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-emerald-600" />

              <div className="text-left">
                <p className="text-sm font-medium">
                  {value.name}
                </p>

                <p className="text-xs text-gray-500">
                  {formatSize(
                    value.size
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </>
  );
}