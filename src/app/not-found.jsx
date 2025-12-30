import React from "react";
import Link from "next/link"; // Assuming Next.js, change to 'react-router-dom' if using Create React App
import { Home, MoveLeft, SearchX, Waypoints } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 text-center dark:bg-neutral-950 sm:px-6 lg:px-8">
      {/* Background Decoration (Optional: Blurry Blobs for modern feel) */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-500/20" />
      <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px] dark:bg-purple-500/20" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="flex w-full max-w-md flex-col items-center gap-6">
        {/* Icon / Graphic */}
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-neutral-100 p-4 dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800">
          <Waypoints className="h-12 w-12 text-neutral-500 dark:text-neutral-400" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-600">
            404
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
            Page not found
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been removed or the link is broken.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center mt-4">
          {/* Primary Action */}
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-900 hover:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:hover:ring-white dark:hover:ring-offset-neutral-950"
          >
            <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Go Home
          </Link>

          {/* Secondary Action (e.g., Contact or Portfolio) */}
          <Link
            href="/contact" // Update this to your contact or work page
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
          >
            <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Go Back
          </Link>
        </div>
      </div>

      {/* Footer / Copyright (Optional) */}
      <div className="absolute bottom-8 text-xs text-neutral-400 dark:text-neutral-600">
        <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </div>
    </div>
  );
}
