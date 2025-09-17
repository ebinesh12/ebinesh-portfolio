"use client";

import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useTheme } from "@/utils/ThemeProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logout from "@/components/Logout";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";

export default function AdminLayout({ children }) {
  const { theme } = useTheme();

  return (
    <>
      <Header themes={theme}  />
      <div className="mt-12 min-h-screen">

        <div
          className={cn(
            "relative min-h-screen p-6 md:p-10 overflow-hidden transition-colors duration-300",
            "bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black",
          )}
        >
          {/* Floating gradient effects with blue glow */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left Blob */}
            <div
              className={cn(
                "absolute top-0 right-0 w-[350px] h-[350px] opacity-20 rounded-full blur-3xl animate-pulse",
                theme?.isGradient
                  ? theme?.primaryGradient
                  : "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 dark:from-blue-500 dark:via-indigo-600 dark:to-cyan-500",
              )}
            ></div>
            {/* Right Blob */}
            <div
              className="absolute bottom-0 left-0 w-[350px] h-[350px]
                                bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500
                                dark:from-indigo-500 dark:via-blue-600 dark:to-cyan-500
                                opacity-20 rounded-full blur-3xl animate-pulse"
            ></div>
          </div>

          <h1
            className={cn(
              "text-3xl font-bold mb-6 bg-clip-text text-transparent",
              theme?.isGradient
                ? theme?.primaryGradient
                : "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500",
            )}
          >
            Manage Portfolio Content
          </h1>
          <p className="text-muted-foreground mb-8">
            Select a section below to update its content. Changes are saved
            automatically when you click the save button in each section.
          </p>

          {children}
        </div>
      </div>
      <Footer themes={theme} />
    </>
  );
}
