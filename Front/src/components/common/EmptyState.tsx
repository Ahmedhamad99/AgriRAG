
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center",
        className
      )}
    >
      <div className="mb-5 rounded-2xl bg-emerald-100 p-4 text-emerald-600">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}