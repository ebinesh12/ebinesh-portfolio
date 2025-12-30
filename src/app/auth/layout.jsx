"use client";

import { cn } from "@/lib/utils";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
      {/* Header (Fixed) */}
      <Header />

      {/* Main Content Wrapper */}
      {/* pt-20 accounts for the fixed header height so content isn't hidden */}
      <main className="relative flex flex-1 flex-col items-center justify-center p-4 pt-24 sm:px-6 lg:px-8">
        {/* --- Background Decoration --- */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* 1. Technical Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-image-gradient" />

          {/* 2. Central Spotlight Glow (Focuses eye on the form) */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/10" />

          {/* 3. Ambient Corner Gradients (Subtle) */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-900/20" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-900/20" />
        </div>

        {/* --- Content Area --- */}
        <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
