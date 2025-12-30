"use client";

import { Loader2, Command } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* Background Pattern (Dot Grid) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#262626_1px,transparent_1px)]"></div>
        {/* Vignette mask to fade edges */}
        <div className="absolute inset-0 bg-white/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-neutral-950/50"></div>
      </div>

      <div className="z-10 flex flex-col items-center gap-6">
        {/* Logo / Brand Icon Wrapper */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/50 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
          <Command className="h-8 w-8 text-neutral-600 dark:text-neutral-400 animate-pulse" />

          {/* Decorative corners */}
          <div className="absolute -left-1 -top-1 h-2 w-2 border-l-2 border-t-2 border-neutral-300 dark:border-neutral-700" />
          <div className="absolute -right-1 -bottom-1 h-2 w-2 border-r-2 border-b-2 border-neutral-300 dark:border-neutral-700" />
        </div>

        {/* Loading Text & Spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-neutral-500 dark:text-neutral-500" />
            <p className="font-mono text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-400">
              LOADING ASSETS...
            </p>
          </div>

          {/* Cosmetic Progress Bar */}
          <div className="h-1 w-32 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full w-1/2 animate-[shimmer_1.5s_infinite] bg-neutral-800 rounded-full dark:bg-neutral-200"
              style={{
                animation: "indeterminate 1.5s infinite linear",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Global Style for the progress animation */}
      <style jsx global>{`
        @keyframes indeterminate {
          0% {
            transform: translateX(-100%);
            width: 20%;
          }
          50% {
            width: 60%;
          }
          100% {
            transform: translateX(200%);
            width: 20%;
          }
        }
      `}</style>
    </div>
  );
}
