

import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function SectionTitle({
  title,
  description,
  icon,
  action,
}: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-1 rounded-xl bg-emerald-100 p-2 text-emerald-600">
            {icon}
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>

          {description && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}