"use client";

import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Settings,
  Sun,
  Moon,
  Check,
  RotateCcw,
  Save,
  Palette,
  Monitor,
} from "lucide-react";
// import { Separator } from "@/components/ui/separator"; // Assuming you have a Separator or hr

// --- Data Configuration ---
const gradients = [
  {
    name: "Holographic",
    color: "bg-pink-400", // Representative color for the swatch
    primaryGradient:
      "bg-gradient-to-r from-pink-400 to-blue-500 dark:from-pink-500 dark:to-blue-600",
    sectionBgGradient:
      "bg-gradient-to-br from-gray-900 via-black to-blue-950 dark:from-black dark:via-gray-900 dark:to-blue-900",
    isGradient: true,
  },
  {
    name: "Sunny Days",
    color: "bg-orange-400",
    primaryGradient:
      "bg-gradient-to-r from-amber-300 to-orange-400 dark:from-amber-500 dark:to-orange-700",
    sectionBgGradient:
      "bg-gradient-to-br from-yellow-100 via-white to-orange-100 dark:from-yellow-950 dark:via-gray-900 dark:to-black",
    isGradient: true,
  },
  {
    name: "Ocean Breeze",
    color: "bg-cyan-400",
    primaryGradient:
      "bg-gradient-to-r from-cyan-300 to-blue-500 dark:from-cyan-500 dark:to-blue-700",
    sectionBgGradient:
      "bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 dark:from-cyan-500 dark:via-sky-600 dark:to-blue-700",
    isGradient: true,
  },
  {
    name: "Tropical Punch",
    color: "bg-pink-500",
    primaryGradient:
      "bg-gradient-to-r from-pink-400 to-orange-500 dark:from-pink-500 dark:to-orange-600",
    sectionBgGradient:
      "bg-gradient-to-br from-pink-100 via-white to-orange-100 dark:from-pink-950 dark:via-gray-900 dark:to-black",
    isGradient: true,
  },
  {
    name: "Aurora Purple",
    color: "bg-purple-500",
    primaryGradient:
      "bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-400 dark:to-pink-600",
    sectionBgGradient:
      "bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 dark:from-purple-600 dark:via-fuchsia-700 dark:to-pink-700",
    isGradient: true,
  },
  {
    name: "Galactic Teal",
    color: "bg-teal-400",
    primaryGradient:
      "bg-gradient-to-r from-teal-300 to-sky-500 dark:from-teal-500 dark:to-sky-700",
    sectionBgGradient:
      "bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 dark:from-teal-500 dark:via-cyan-600 dark:to-sky-700",
    isGradient: true,
  },
  {
    name: "Olive Grove",
    color: "bg-lime-600",
    primaryGradient:
      "bg-gradient-to-r from-lime-500 to-green-700 dark:from-emerald-500 dark:to-lime-600",
    sectionBgGradient:
      "bg-gradient-to-br from-lime-100 via-white to-green-100 dark:from-lime-900 dark:via-gray-800 dark:to-black",
    isGradient: true,
  },
  {
    name: "Wild Berry",
    color: "bg-fuchsia-600",
    primaryGradient:
      "bg-gradient-to-r from-fuchsia-500 to-indigo-700 dark:from-fuchsia-700 dark:to-indigo-900",
    sectionBgGradient:
      "bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-700 dark:from-fuchsia-700 dark:via-purple-800 dark:to-indigo-900",
    isGradient: true,
  },
  {
    name: "Volcanic Ash",
    color: "bg-slate-500",
    primaryGradient:
      "bg-gradient-to-r from-slate-400 to-zinc-600 dark:from-slate-600 dark:to-zinc-600",
    sectionBgGradient:
      "bg-gradient-to-r from-slate-500 via-gray-600 to-zinc-700 dark:from-slate-700 dark:via-gray-800 dark:to-zinc-900",
    isGradient: true,
  },
  {
    name: "Desert Mirage",
    color: "bg-yellow-600",
    primaryGradient:
      "bg-gradient-to-r from-yellow-600 to-orange-800 dark:from-yellow-700 dark:to-orange-900",
    sectionBgGradient:
      "bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-700 dark:from-yellow-700 dark:via-amber-800 dark:to-orange-900",
    isGradient: true,
  },
  {
    name: "Maroon Majesty",
    color: "bg-red-700",
    primaryGradient:
      "bg-gradient-to-r from-red-600 to-red-800 dark:from-red-700 dark:to-red-900",
    sectionBgGradient:
      "bg-gradient-to-br from-red-100 via-white to-rose-100 dark:from-red-900 dark:via-gray-800 dark:to-black",
    isGradient: true,
  },
  {
    name: "Lavender Fields",
    color: "bg-violet-400",
    primaryGradient:
      "bg-gradient-to-r from-violet-400 to-indigo-400 dark:from-purple-400 dark:to-indigo-600",
    sectionBgGradient:
      "bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 dark:from-violet-600 dark:via-purple-600 dark:to-indigo-600",
    isGradient: true,
  },
];

const radiuses = [
  { name: "Small", value: 0.15, label: "0.2" },
  { name: "Standard", value: 0.3, label: "0.5" },
  { name: "Large", value: 0.6, label: "0.8" },
  { name: "Full", value: 0.75, label: "1.0" },
];

export default function ThemeSidebar() {
  const { theme: mode, setTheme: setMode } = useNextTheme();
  const { theme, saveTheme, clearTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(theme);

  // Sync state when global theme changes
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const handleSave = () => {
    saveTheme(currentTheme);
    setOpen(false);
  };

  const handleClear = () => {
    clearTheme();
    // Reset local state to default
    setCurrentTheme({
      primaryGradient:
        "bg-gradient-to-r from-pink-400 to-blue-500 dark:from-pink-500 dark:to-blue-600",
      sectionBgGradient:
        "bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black",
      isGradient: true,
      radius: 0.6,
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl transition-all hover:scale-110 hover:shadow-neutral-500/50 dark:shadow-black/50"
          size="icon"
        >
          <Settings className="h-6 w-6 animate-spin-slow" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full p-2  border-l border-neutral-200 bg-white/95 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/95 sm:w-[400px]"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Palette className="h-5 w-5 text-neutral-500" />
            Customize Theme
          </SheetTitle>
          <SheetDescription>
            Personalize the interface to match your style.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-8 pb-10">
          {/* 1. Theme Mode (Segmented Control) */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Appearance
            </label>
            <div className="flex w-full items-center rounded-lg border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900">
              <button
                onClick={() => setMode("light")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all",
                  mode === "light"
                    ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300",
                )}
              >
                <Sun className="h-4 w-4" />
                Light
              </button>
              <button
                onClick={() => setMode("dark")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all",
                  mode === "dark"
                    ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300",
                )}
              >
                <Moon className="h-4 w-4" />
                Dark
              </button>
            </div>
          </div>

          {/* <Separator className="bg-neutral-200 dark:bg-neutral-800" /> */}

          {/* 2. Color Scheme (Grid) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Color Profile
              </label>
              <span className="text-xs text-neutral-400">
                {gradients.find(
                  (g) => g.primaryGradient === currentTheme.primaryGradient,
                )?.name || "Custom"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {gradients.map((gradient) => {
                const isActive =
                  currentTheme.primaryGradient === gradient.primaryGradient;
                return (
                  <button
                    key={gradient.name}
                    onClick={() =>
                      setCurrentTheme({
                        ...currentTheme,
                        primaryGradient: gradient.primaryGradient,
                        sectionBgGradient: gradient.sectionBgGradient, // Preserving logic
                        isGradient: true,
                      })
                    }
                    className={cn(
                      "group relative flex aspect-square w-full items-center justify-center rounded-full border-2 transition-all hover:scale-105",
                      isActive
                        ? "border-neutral-900 dark:border-white"
                        : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-700",
                    )}
                    title={gradient.name}
                  >
                    <div
                      className={cn(
                        "h-full w-full rounded-full",
                        gradient.color,
                      )}
                    />
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* <Separator className="bg-neutral-200 dark:bg-neutral-800" /> */}

          {/* 3. Corner Radius */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Border Radius
            </label>
            <div className="grid grid-cols-4 gap-2">
              {radiuses.map((radius) => {
                const isActive = currentTheme.radius === radius.value;
                return (
                  <button
                    key={radius.name}
                    onClick={() =>
                      setCurrentTheme({ ...currentTheme, radius: radius.value })
                    }
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg border-2 py-2 text-xs transition-all",
                      isActive
                        ? "border-neutral-900 bg-neutral-50 text-neutral-900 dark:border-white dark:bg-neutral-900 dark:text-white"
                        : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 dark:border-neutral-800 dark:bg-transparent dark:hover:border-neutral-700",
                    )}
                  >
                    <span className="font-medium">{radius.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Action Footer */}
          <div className="mt-auto flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 gap-2 border-neutral-200 dark:border-neutral-800"
              onClick={handleClear}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              className="flex-1 gap-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
