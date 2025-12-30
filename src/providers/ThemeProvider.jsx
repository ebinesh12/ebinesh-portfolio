"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeContext = createContext();

const defaultTheme = {
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
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("custom-theme");
    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
