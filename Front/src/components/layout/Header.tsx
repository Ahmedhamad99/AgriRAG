import { Sprout, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { APP } from "@/constants/app";

export function Header() {
  return (
    <header className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-white via-white to-emerald-50 p-8 shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_40%)]" />

      <div className="relative">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 shadow-sm">
            <Sprout className="h-10 w-10 text-emerald-600" />
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              {APP.name}
            </h1>

            <p className="text-xl font-medium text-emerald-700">
              {APP.subtitle}
            </p>

            <p className="mx-auto max-w-3xl text-base leading-7 text-gray-600">
              {APP.description}
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}