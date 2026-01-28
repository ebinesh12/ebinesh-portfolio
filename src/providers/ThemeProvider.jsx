"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeContext = createContext();

const defaultTheme = {
  text: "text-teal-300",
  border: "hover:border-cyan-400",
  primaryGradient:
    "bg-gradient-to-r from-teal-300 to-sky-500 dark:from-teal-500 dark:to-sky-700",
  outlineBtn:
    "border border-cyan-400 text-teal-300 hover:bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 hover:text-black",
  sectionBgGradient:
    "bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 dark:from-teal-500 dark:via-cyan-600 dark:to-sky-700",
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
