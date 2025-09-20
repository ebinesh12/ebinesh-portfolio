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
// import gradients from "@/components/themes"

export default function ThemeSidebar() {
  const { theme: mode, setTheme: setMode } = useNextTheme();
  const { theme, saveTheme, clearTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

const gradients=[
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
      name: "Aurora Purple",
      text: "text-purple-400",
      border: "hover:border-fuchsia-500",
      primaryGradient:
        "bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700",
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
      outlineBtn:
        "border border-yellow-400 text-amber-300 hover:bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 hover:text-black",
      sectionBgGradient:
        "bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 dark:from-amber-500 dark:via-yellow-600 dark:to-orange-700",
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
      name: "Ruby Radiance",
      text: "text-rose-400",
      border: "hover:border-red-500",
      primaryGradient:
        "bg-gradient-to-r from-rose-400 to-pink-400 dark:from-rose-600 dark:to-pink-600",
      outlineBtn:
        "border border-red-500 text-rose-400 hover:bg-gradient-to-r from-rose-400 via-red-500 to-pink-400 hover:text-white",
      sectionBgGradient:
        "bg-gradient-to-r from-rose-400 via-red-500 to-pink-400 dark:from-rose-600 dark:via-red-700 dark:to-pink-600",
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
      name: "Starlight",
      text: "text-indigo-200",
      border: "hover:border-indigo-300",
      primaryGradient:
        "bg-gradient-to-r from-indigo-300 to-violet-400 dark:from-indigo-400 dark:to-violet-500",
      outlineBtn:
        "border border-violet-300 text-indigo-200 hover:bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 hover:text-black",
      sectionBgGradient:
       "bg-gradient-to-br from-gray-900 via-black to-violet-950 dark:from-black dark:via-gray-900 dark:to-violet-900"
    },
    {
      name: "Lavender Fields",
      text: "text-violet-400",
      border: "hover:border-purple-400",
      primaryGradient:
        "bg-gradient-to-r from-violet-400 to-indigo-400 dark:from-violet-600 dark:to-indigo-600",
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
                        // outlineHover: gradient.hover.outline,
                        // textHover: gradient.hover.text,
                        // bgHover: gradient.hover.bg,
                        // text: gradient.text,
                        
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
