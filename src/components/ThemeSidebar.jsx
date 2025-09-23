"use client";

import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme } from "@/utils/ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings, Sun, Moon } from "lucide-react";

export default function ThemeSidebar() {
  const { theme: mode, setTheme: setMode } = useNextTheme();
  const { theme, saveTheme, clearTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const gradients = [
    {
      name: "Holographic",
      text: "text-pink-300",
      border: "hover:border-pink-400",
      primaryGradient:
        "bg-gradient-to-r from-pink-400 to-blue-500 dark:from-pink-500 dark:to-blue-600",
      outlineBtn:
        "border border-blue-400 text-pink-300 hover:bg-gradient-to-r from-pink-400 via-blue-500 to-indigo-600 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-br from-gray-900 via-black to-blue-950 dark:from-black dark:via-gray-900 dark:to-blue-900",
    },
    {
      name: "Sunny Days",
      text: "text-amber-600",
      border: "hover:border-amber-500",
      primaryGradient:
        "bg-gradient-to-r from-amber-300 to-orange-400 dark:from-amber-500 dark:to-orange-700",
      outlineBtn:
        "border border-orange-400 text-amber-600 hover:bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-br from-yellow-100 via-white to-orange-100 dark:from-yellow-950 dark:via-gray-900 dark:to-black",
    },
    {
      name: "Ocean Breeze",
      text: "text-cyan-300",
      border: "hover:border-sky-400",
      primaryGradient:
        "bg-gradient-to-r from-cyan-300 to-blue-500 dark:from-cyan-500 dark:to-blue-700",
      outlineBtn:
        "border border-sky-400 text-cyan-300 hover:bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 dark:from-cyan-500 dark:via-sky-600 dark:to-blue-700",
    },
    {
      name: "Tropical Punch",
      text: "text-pink-500",
      border: "hover:border-pink-600",
      primaryGradient:
        "bg-gradient-to-r from-pink-400 to-orange-500 dark:from-pink-500 dark:to-orange-600",
      outlineBtn:
        "border border-orange-500 text-pink-500 hover:bg-gradient-to-r from-pink-500 via-orange-500 to-red-600 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-br from-pink-100 via-white to-orange-100 dark:from-pink-950 dark:via-gray-900 dark:to-black",
    },
    {
      name: "Aurora Purple",
      text: "text-purple-400",
      border: "hover:border-fuchsia-500",
      primaryGradient:
        "bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-400 dark:to-pink-600",
      outlineBtn:
        "border border-fuchsia-500 text-purple-400 hover:bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 dark:from-purple-600 dark:via-fuchsia-700 dark:to-pink-700",
    },
    {
      name: "Galactic Teal",
      text: "text-teal-300",
      border: "hover:border-cyan-400",
      primaryGradient:
        "bg-gradient-to-r from-teal-300 to-sky-500 dark:from-teal-500 dark:to-sky-700",
      outlineBtn:
        "border border-cyan-400 text-teal-300 hover:bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 dark:from-teal-500 dark:via-cyan-600 dark:to-sky-700",
    },
    {
      name: "Olive Grove",
      text: "text-lime-700",
      border: "hover:border-lime-600",
      primaryGradient:
        "bg-gradient-to-r from-lime-500 to-green-700 dark:from-emerald-500 dark:to-lime-600",
      outlineBtn:
        "border border-green-600 text-lime-700 hover:bg-gradient-to-r from-lime-500 via-green-600 to-emerald-700 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-br from-lime-100 via-white to-green-100 dark:from-lime-900 dark:via-gray-800 dark:to-black",
    },
    {
      name: "Wild Berry",
      text: "text-fuchsia-500",
      border: "hover:border-purple-600",
      primaryGradient:
        "bg-gradient-to-r from-fuchsia-500 to-indigo-700 dark:from-fuchsia-700 dark:to-indigo-900",
      outlineBtn:
        "border border-purple-600 text-fuchsia-500 hover:bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-700 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-700 dark:from-fuchsia-700 dark:via-purple-800 dark:to-indigo-900",
    },
    {
      name: "Volcanic Ash",
      text: "text-slate-400",
      border: "hover:border-gray-500",
      primaryGradient:
        "bg-gradient-to-r from-slate-400 to-zinc-600 dark:from-slate-600 dark:to-zinc-600",
      outlineBtn:
        "border border-gray-500 text-slate-400 hover:bg-gradient-to-r from-slate-400 via-gray-500 to-zinc-600 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-slate-500 via-gray-600 to-zinc-700 dark:from-slate-700 dark:via-gray-800 dark:to-zinc-900",
    },
    {
      name: "Desert Mirage",
      text: "text-yellow-600",
      border: "hover:border-amber-700",
      primaryGradient:
        "bg-gradient-to-r from-yellow-600 to-orange-800 dark:from-yellow-700 dark:to-orange-900",
      outlineBtn:
        "border border-amber-700 text-yellow-600 hover:bg-gradient-to-r from-yellow-600 via-amber-700 to-orange-800 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-700 dark:from-yellow-700 dark:via-amber-800 dark:to-orange-900",
    },
    {
      name: "Maroon Majesty",
      text: "text-red-800",
      border: "hover:border-red-700",
      primaryGradient:
        "bg-gradient-to-r from-red-600 to-red-800 dark:from-red-700 dark:to-red-900",
      outlineBtn:
        "border border-red-700 text-red-800 hover:bg-gradient-to-r from-red-600 via-red-700 to-rose-800 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-br from-red-100 via-white to-rose-100 dark:from-red-900 dark:via-gray-800 dark:to-black",
    },
    {
      name: "Lavender Fields",
      text: "text-violet-400",
      border: "hover:border-purple-400",
      primaryGradient:
        "bg-gradient-to-r from-violet-400 to-indigo-400 dark:from-purple-400 dark:to-indigo-600",
      outlineBtn:
        "border border-purple-400 text-violet-400 hover:bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 dark:from-violet-600 dark:via-purple-600 dark:to-indigo-600",
    },
  ];

  const radiuses = [
    { name: "Small", value: 0.15 },
    { name: "Default", value: 0.3 },
    { name: "Large", value: 0.6 },
    { name: "Full", value: 0.75 },
  ];

  const handleSave = () => {
    saveTheme(currentTheme);
    setOpen(false);
  };

  const handleClear = () => {
    clearTheme();
    setCurrentTheme({
      text: "text-pink-300",
      border: "hover:border-pink-400",
      primaryGradient:
        "bg-gradient-to-r from-pink-400 to-blue-500 dark:from-pink-500 dark:to-blue-600",
      outlineBtn:
        "border border-blue-400 text-pink-300 hover:bg-gradient-to-r from-pink-400 via-blue-500 to-indigo-600 hover:text-black",
      sectionBgGradient:
       "bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black",
      isGradient: true,
      radius: 0.6,
    });
    setOpen(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      className="bg-white/40 dark:bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-gray-300 dark:border-white/20 transition-colors duration-700"
    >
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg"
          variant="default"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] px-5 pb-5 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" /> Customize Theme
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Dark Mode Toggle */}
          <div>
            <label className="block text-sm font-medium mb-2">Theme Mode</label>
            <div className="mt-3 flex gap-3">
              <p className="text-xs">Light / Dark</p>
              <Button
                variant="default"
                size="icon"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              >
                {mode === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Background Gradient */}
          <div>
            <label className="block text-sm font-medium mb-2">Background</label>
            <div className="grid grid-cols-2 gap-2">
              {gradients.map((gradient) => {
                const isActive =
                  currentTheme.primaryGradient === gradient.primaryGradient;
                return (
                  <button
                    key={gradient.name}
                    className={cn(
                      "rounded-lg p-2 text-sm text-center border-2 transition-all",
                      isActive ? "border-primary" : "border-transparent",
                    )}
                    onClick={() =>
                      setCurrentTheme({
                        ...currentTheme,
                        // sectionGradient: gradient.sectionBgGradient,
                        primaryGradient: gradient.primaryGradient,
                        border: gradient.border,
                        outlineBtn: gradient.outlineBtn,
                        isGradient: true,
                      })
                    }
                  >
                    <div
                      className={cn(
                        "h-12 w-full rounded-md",
                        gradient.primaryGradient,
                      )}
                    />
                    <span
                      className={cn(
                        "mt-1 block bg-clip-text text-transparent font-medium",
                        gradient.primaryGradient,
                      )}
                    >
                      {gradient.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corner Radius */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Corner Radius
            </label>
            <div className="flex w-full gap-x-4">
              {radiuses.map((radius) => (
                <Button
                  className={cn(
                    "w-full py-2",
                    currentTheme.radius === radius.value
                      ? currentTheme.primaryGradient
                      : "",
                  )}
                  key={radius.name}
                  variant={
                    currentTheme.radius === radius.value ? "primary" : "default"
                  }
                  onClick={() =>
                    setCurrentTheme({ ...currentTheme, radius: radius.value })
                  }
                >
                  {radius.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-2 pt-4">
            <Button
              className="flex-1 p-2 primary"
              variant="default"
              onClick={handleSave}
            >
              Save
            </Button>

            <Button
              className="flex-1 p-2"
              variant="default"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
