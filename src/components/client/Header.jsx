"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X, Code2 } from "lucide-react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const Header = ({ themes }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Progress Bar Logic
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      // 2. Header Background Logic
      setIsScrolled(scrollY > 20);

      // 3. Active Link Spy Logic
      // Adding a small offset (100px) improves accuracy when clicking links
      const offset = 100;
      const sections = navItems.map((item) => document.getElementById(item.id));

      let currentActive = "home";
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop - offset;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentActive = section.id;
          }
        }
      });
      setActiveLink(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Close menu first on mobile to prevent layout shift during scroll
      setMenuOpen(false);

      // Small timeout to allow menu close animation (optional)
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80"
          : "bg-transparent border-transparent py-2",
      )}
    >
      {/* Reading Progress Bar */}
      <div
        className={cn(
          "absolute top-0 left-0 h-[2px] transition-all duration-150 ease-out z-[60]",
          themes?.isGradient
            ? themes?.primaryGradient
            : "bg-blue-600 dark:bg-blue-400",
        )}
        style={{ width: `${progress}%` }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="group flex items-center gap-2"
        >
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-md transition-transform group-hover:scale-105",
              themes?.isGradient
                ? themes?.primaryGradient
                : "bg-neutral-900 dark:bg-white dark:text-black",
            )}
          >
            <Code2 className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Ebinesh<span className="text-neutral-400">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeLink === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all rounded-full duration-300",
                      isActive
                        ? "text-white shadow-md"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white",
                      // Apply gradient only if active
                      isActive &&
                        (themes?.isGradient
                          ? themes?.primaryGradient
                          : "bg-neutral-900 dark:bg-white dark:text-neutral-950"),
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "absolute left-0 w-full overflow-hidden bg-white/95 backdrop-blur-xl transition-all duration-300 dark:bg-neutral-950/95 md:hidden",
          menuOpen
            ? "max-h-[400px] border-b border-neutral-200 dark:border-neutral-800"
            : "max-h-0",
        )}
      >
        <ul className="flex flex-col space-y-2 px-6 py-6">
          {navItems.map((item) => {
            const isActive = activeLink === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900/50 dark:hover:text-white",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
