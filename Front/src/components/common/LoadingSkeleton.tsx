
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export function LoadingSkeleton({
  rows = 3,
  className,
}: LoadingSkeletonProps) {
  return (
    <div className={className}>
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-20 w-full rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}