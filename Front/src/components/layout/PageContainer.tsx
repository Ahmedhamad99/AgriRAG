

import { PropsWithChildren } from "react";

import { APP } from "@/constants/app";

export function PageContainer({
  children,
}: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-emerald-50">
      <div
        className={`mx-auto ${APP.maxWidth} px-4 py-8 sm:px-6 lg:px-8`}
      >
        {children}
      </div>
    </div>
  );
}