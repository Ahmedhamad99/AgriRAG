import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  value: number;
}

export function UploadProgress({
  value,
}: UploadProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading...</span>

        <span>{value}%</span>
      </div>

      <Progress value={value} />
    </div>
  );
}