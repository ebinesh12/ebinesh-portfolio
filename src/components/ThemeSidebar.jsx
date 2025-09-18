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
      name: "Ocean Breeze",
      text: "text-cyan-300",
      border: "hover:border-sky-400",
      primaryGradient:
        "bg-gradient-to-r from-cyan-300 to-blue-500 dark:from-cyan-500 dark:to-blue-700",
      hover: {
        text: "hover:text-blue-500",
        bg: "hover:bg-gradient-to-r hover:from-cyan-300 hover:via-sky-400 hover:to-blue-500",
        outline: "hover:outline-cyan-500",
      },
      outlineBtn:
        "border border-sky-400 text-cyan-300 hover:bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 dark:from-cyan-500 dark:via-sky-600 dark:to-blue-700",
    },
    {
      name: "Aurora Purple",
      text: "text-purple-400",
      border: "hover:border-fuchsia-500",
      primaryGradient:
        "bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700",
      hover: {
        text: "hover:text-pink-500",
        bg: "hover:bg-gradient-to-r hover:from-purple-400 hover:via-fuchsia-500 hover:to-pink-500",
        outline: "hover:outline-purple-600",
      },
      outlineBtn:
        "border border-fuchsia-500 text-purple-400 hover:bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 dark:from-purple-600 dark:via-fuchsia-700 dark:to-pink-700",
    },
    {
      name: "Golden Hour",
      text: "text-amber-300",
      border: "hover:border-yellow-400",
      primaryGradient:
        "bg-gradient-to-r from-amber-300 to-orange-500 dark:from-amber-500 dark:to-orange-700",
      hover: {
        text: "hover:text-orange-500",
        bg: "hover:bg-gradient-to-r hover:from-amber-300 hover:via-yellow-400 hover:to-orange-500",
        outline: "hover:outline-amber-500",
      },
      outlineBtn:
        "border border-yellow-400 text-amber-300 hover:bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 dark:from-amber-500 dark:via-yellow-600 dark:to-orange-700",
    },
    {
      name: "Crimson Fire",
      text: "text-red-400",
      border: "hover:border-orange-500",
      primaryGradient:
        "bg-gradient-to-r from-red-400 to-yellow-400 dark:from-red-600 dark:to-yellow-600",
      hover: {
        text: "hover:text-yellow-400",
        bg: "hover:bg-gradient-to-r hover:from-red-400 hover:via-orange-500 hover:to-yellow-400",
        outline: "hover:outline-red-600",
      },
      outlineBtn:
        "border border-orange-500 text-red-400 hover:bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 dark:from-red-600 dark:via-orange-700 dark:to-yellow-600",
    },
    {
      name: "Emerald Isle",
      text: "text-emerald-300",
      border: "hover:border-green-400",
      primaryGradient:
        "bg-gradient-to-r from-emerald-300 to-lime-400 dark:from-emerald-500 dark:to-lime-600",
      hover: {
        text: "hover:text-lime-400",
        bg: "hover:bg-gradient-to-r hover:from-emerald-300 hover:via-green-400 hover:to-lime-400",
        outline: "hover:outline-emerald-500",
      },
      outlineBtn:
        "border border-green-400 text-emerald-300 hover:bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 dark:from-emerald-500 dark:via-green-600 dark:to-lime-600",
    },
    {
      name: "Sapphire Night",
      text: "text-blue-400",
      border: "hover:border-indigo-500",
      primaryGradient:
        "bg-gradient-to-r from-blue-400 to-slate-800 dark:from-blue-700 dark:to-slate-900",
      hover: {
        text: "hover:text-slate-300",
        bg: "hover:bg-gradient-to-r hover:from-blue-400 hover:via-indigo-500 hover:to-slate-800",
        outline: "hover:outline-blue-600",
      },
      outlineBtn:
        "border border-indigo-500 text-blue-400 hover:bg-gradient-to-r from-blue-400 via-indigo-500 to-slate-800 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-blue-500 via-indigo-600 to-slate-800 dark:from-blue-700 dark:via-indigo-800 dark:to-slate-900",
    },
    {
      name: "Ruby Radiance",
      text: "text-rose-400",
      border: "hover:border-red-500",
      primaryGradient:
        "bg-gradient-to-r from-rose-400 to-pink-400 dark:from-rose-600 dark:to-pink-600",
      hover: {
        text: "hover:text-pink-400",
        bg: "hover:bg-gradient-to-r hover:from-rose-400 hover:via-red-500 hover:to-pink-400",
        outline: "hover:outline-rose-600",
      },
      outlineBtn:
        "border border-red-500 text-rose-400 hover:bg-gradient-to-r from-rose-400 via-red-500 to-pink-400 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-rose-400 via-red-500 to-pink-400 dark:from-rose-600 dark:via-red-700 dark:to-pink-600",
    },
    {
      name: "Galactic Teal",
      text: "text-teal-300",
      border: "hover:border-cyan-400",
      primaryGradient:
        "bg-gradient-to-r from-teal-300 to-sky-500 dark:from-teal-500 dark:to-sky-700",
      hover: {
        text: "hover:text-sky-300",
        bg: "hover:bg-gradient-to-r hover:from-teal-300 hover:via-cyan-400 hover:to-sky-500",
        outline: "hover:outline-teal-500",
      },
      outlineBtn:
        "border border-cyan-400 text-teal-300 hover:bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 dark:from-teal-500 dark:via-cyan-600 dark:to-sky-700",
    },
    {
      name: "Volcanic Ash",
      text: "text-slate-400",
      border: "hover:border-gray-500",
      primaryGradient:
        "bg-gradient-to-r from-slate-400 to-zinc-600 dark:from-slate-700 dark:to-zinc-900",
      hover: {
        text: "hover:text-zinc-300",
        bg: "hover:bg-gradient-to-r hover:from-slate-400 hover:via-gray-500 hover:to-zinc-600",
        outline: "hover:outline-slate-600",
      },
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
      hover: {
        text: "hover:text-orange-500",
        bg: "hover:bg-gradient-to-r hover:from-yellow-600 hover:via-amber-700 hover:to-orange-800",
        outline: "hover:outline-yellow-800",
      },
      outlineBtn:
        "border border-amber-700 text-yellow-600 hover:bg-gradient-to-r from-yellow-600 via-amber-700 to-orange-800 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-700 dark:from-yellow-700 dark:via-amber-800 dark:to-orange-900",
    },
    {
      name: "Coral Reef",
      text: "text-orange-300",
      border: "hover:border-rose-300",
      primaryGradient:
        "bg-gradient-to-r from-orange-300 to-pink-300 dark:from-orange-500 dark:to-pink-500",
      hover: {
        text: "hover:text-pink-300",
        bg: "hover:bg-gradient-to-r hover:from-orange-300 hover:via-rose-300 hover:to-pink-300",
        outline: "hover:outline-orange-500",
      },
      outlineBtn:
        "border border-rose-300 text-orange-300 hover:bg-gradient-to-r from-orange-300 via-rose-300 to-pink-300 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-orange-300 via-rose-300 to-pink-300 dark:from-orange-500 dark:via-rose-500 dark:to-pink-500",
    },
    {
      name: "Lavender Fields",
      text: "text-violet-400",
      border: "hover:border-purple-400",
      primaryGradient:
        "bg-gradient-to-r from-violet-400 to-indigo-400 dark:from-violet-600 dark:to-indigo-600",
      hover: {
        text: "hover:text-indigo-400",
        bg: "hover:bg-gradient-to-r hover:from-violet-400 hover:via-purple-400 hover:to-indigo-400",
        outline: "hover:outline-violet-600",
      },
      outlineBtn:
        "border border-purple-400 text-violet-400 hover:bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 dark:from-violet-600 dark:via-purple-600 dark:to-indigo-600",
    },
    {
      name: "Wild Berry",
      text: "text-fuchsia-500",
      border: "hover:border-purple-600",
      primaryGradient:
        "bg-gradient-to-r from-fuchsia-500 to-indigo-700 dark:from-fuchsia-700 dark:to-indigo-900",
      hover: {
        text: "hover:text-indigo-500",
        bg: "hover:bg-gradient-to-r hover:from-fuchsia-500 hover:via-purple-600 hover:to-indigo-700",
        outline: "hover:outline-fuchsia-700",
      },
      outlineBtn:
        "border border-purple-600 text-fuchsia-500 hover:bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-700 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-700 dark:from-fuchsia-700 dark:via-purple-800 dark:to-indigo-900",
    },
    {
      name: "Solar Flare",
      text: "text-yellow-300",
      border: "hover:border-orange-400",
      primaryGradient:
        "bg-gradient-to-r from-yellow-300 to-red-500 dark:from-yellow-500 dark:to-red-700",
      hover: {
        text: "hover:text-red-500",
        bg: "hover:bg-gradient-to-r hover:from-yellow-300 hover:via-orange-400 hover:to-red-500",
        outline: "hover:outline-yellow-500",
      },
      outlineBtn:
        "border border-orange-400 text-yellow-300 hover:bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 dark:from-yellow-500 dark:via-orange-600 dark:to-red-700",
    },
    {
      name: "Arctic Ice",
      text: "text-sky-200",
      border: "hover:border-cyan-200",
      primaryGradient:
        "bg-gradient-to-r from-sky-200 to-blue-300 dark:from-sky-400 dark:to-blue-500",
      hover: {
        text: "hover:text-blue-300",
        bg: "hover:bg-gradient-to-r hover:from-sky-200 hover:via-cyan-200 hover:to-blue-300",
        outline: "hover:outline-sky-400",
      },
      outlineBtn:
        "border border-cyan-200 text-sky-200 hover:bg-gradient-to-r from-sky-200 via-cyan-200 to-blue-300 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-sky-200 via-cyan-200 to-blue-300 dark:from-sky-400 dark:via-cyan-400 dark:to-blue-500",
    },
    {
      name: "Midnight Plum",
      text: "text-purple-300",
      border: "hover:border-indigo-400",
      primaryGradient:
        "bg-gradient-to-r from-purple-300 to-slate-900 dark:from-purple-600 dark:to-slate-950",
      hover: {
        text: "hover:text-violet-300",
        bg: "hover:bg-gradient-to-r hover:from-purple-300 hover:via-indigo-400 hover:to-slate-900",
        outline: "hover:outline-purple-500",
      },
      outlineBtn:
        "border border-indigo-400 text-purple-300 hover:bg-gradient-to-r from-purple-300 via-indigo-400 to-slate-900 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-purple-400 via-indigo-500 to-slate-900 dark:from-purple-600 dark:via-indigo-700 dark:to-slate-950",
    },
    {
      name: "Kiwi Green",
      text: "text-lime-400",
      border: "hover:border-green-500",
      primaryGradient:
        "bg-gradient-to-r from-lime-400 to-emerald-600 dark:from-lime-600 dark:to-emerald-800",
      hover: {
        text: "hover:text-emerald-500",
        bg: "hover:bg-gradient-to-r hover:from-lime-400 hover:via-green-500 hover:to-emerald-600",
        outline: "hover:outline-lime-600",
      },
      outlineBtn:
        "border border-green-500 text-lime-400 hover:bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 dark:from-lime-600 dark:via-green-700 dark:to-emerald-800",
    },
    {
      name: "Rose Gold",
      text: "text-rose-300",
      border: "hover:border-pink-400",
      primaryGradient:
        "bg-gradient-to-r from-rose-300 to-amber-300 dark:from-rose-500 dark:to-amber-500",
      hover: {
        text: "hover:text-amber-300",
        bg: "hover:bg-gradient-to-r hover:from-rose-300 hover:via-pink-400 hover:to-amber-300",
        outline: "hover:outline-rose-500",
      },
      outlineBtn:
        "border border-pink-400 text-rose-300 hover:bg-gradient-to-r from-rose-300 via-pink-400 to-amber-300 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-rose-300 via-pink-400 to-amber-300 dark:from-rose-500 dark:via-pink-600 dark:to-amber-500",
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
      primaryGradient:
        "bg-gradient-to-r from-teal-300 to-sky-500 dark:from-teal-500 dark:to-sky-700",
      sectionGradient:
        "bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black",
      outlineBtn:
        "border border-sky-400 text-cyan-300 hover:bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:text-white",
      bgHover:
        "hover:bg-gradient-to-r hover:from-cyan-300 hover:via-sky-400 hover:to-blue-500",
      outlineHover: "hover:outline-cyan-500",
      textHover: "hover:text-blue-500",
      border: "hover:border-sky-400",
      text: "text-cyan-300",
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
                        outlineHover: gradient.hover.outline,
                        outlineBtn: gradient.outlineBtn,
                        textHover: gradient.hover.text,
                        bgHover: gradient.hover.bg,
                        border: gradient.border,
                        text: gradient.text,
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
