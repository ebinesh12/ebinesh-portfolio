"use client";

import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 font-sans text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Wrapper */}
      {/* pt-20 ensures content isn't hidden behind the fixed header */}
      <main className="relative isolate flex-1 pt-24 pb-12">
        {/* --- Background: Technical Grid --- */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* Subtle Gradient Glow at top-center */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-20">
            <div className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-blue-500 to-cyan-500 opacity-30" />
          </div>
        </div>

        {/* --- Content Container --- */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header Area */}
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dashboard
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Manage your portfolio content, projects, and personal details.
            </p>
          </div>

          {/* Injected Page Content */}
          <div className="min-h-[600px] rounded-xl border border-neutral-200 bg-white/50 p-1 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
