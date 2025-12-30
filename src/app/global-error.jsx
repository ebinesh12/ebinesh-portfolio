"use client";

import { AlertTriangle, RefreshCcw, Home, Terminal } from "lucide-react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white p-4 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* Background: Subtle Technical Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Ambient Red Glow for "Critical" feel */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[100px] dark:bg-red-900/20" />

      <div className="w-full max-w-lg space-y-8 text-center">
        {/* Icon Group */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-100 dark:bg-red-900/20 dark:ring-red-900/50">
          <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-500" />
          {/* Pulsing Ring Effect */}
          <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping" />
        </div>

        {/* Main Text */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            System Error
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Something went wrong on our end.
          </p>
        </div>

        {/* Error Log / Terminal Window */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 text-left dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100/50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800/50">
            <Terminal className="h-4 w-4 text-neutral-500" />
            <span className="text-xs font-medium text-neutral-500">
              console_output.log
            </span>
          </div>
          <div className="p-4">
            <p className="font-mono text-sm text-red-600 dark:text-red-400 break-all">
              <span className="opacity-50 mr-2">{">"}</span>
              {error?.message || "Critical runtime exception detected."}
            </p>
            <p className="font-mono text-xs text-neutral-400 mt-2">
              <span className="opacity-50 mr-2">{">"}</span>
              Code: 500_INTERNAL_SERVER_ERROR
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-red-700 hover:ring-4 hover:ring-red-500/20 focus:outline-none dark:hover:bg-red-500"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:hover:bg-neutral-900"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>

      {/* Footer Code */}
      <div className="absolute bottom-8 font-mono text-xs text-neutral-400">
        ERR_CONNECTION_REFUSED
      </div>
    </div>
  );
}
