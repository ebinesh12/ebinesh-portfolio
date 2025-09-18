"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeContext = createContext();

const defaultTheme = {
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
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("custom-theme");
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme.radius) {
      root.style.setProperty("--radius", `${theme.radius}rem`);
    }
  }, [theme]);

  const saveTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("custom-theme", JSON.stringify(newTheme));
  };

  const clearTheme = () => {
    setTheme(defaultTheme);
    localStorage.removeItem("custom-theme");
  };

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeContext.Provider value={{ theme, saveTheme, clearTheme }}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
