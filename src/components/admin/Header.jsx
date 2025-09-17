"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Header = ({ themes }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Scroll events for progress bar & active link
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollY / docHeight) * 100);

      document.querySelectorAll("section[id]").forEach((section) => {
        if (scrollY >= section.offsetTop - 80) {
          setActiveLink(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, id) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed pt-1 top-0 left-0 w-full text-black bg-gradient-to-r from-blue-100 via-white to-cyan-100 dark:bg-gradient-to-r dark:from-blue-950 dark:via-gray-900 dark:to-black dark:text-white shadow-md z-40 transition-all duration-700">
      {/* Progress Bar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-1 z-50",
          themes?.isGradient
            ? themes?.primaryGradient
            : "bg-gradient-to-r from-blue-600 to-cyan-600",
        )}
        style={{ width: `${progress}%` }}
      ></div>

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <div
          className={cn(
            "text-xl font-bold bg-clip-text text-transparent",
            themes?.isGradient
              ? themes?.primaryGradient
              : "bg-gradient-to-r from-blue-600 to-cyan-600",
          )}
        >
          Ebinesh Rabin
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium">
          {[
            "home",
            "about",
            "skills",
            "projects",
            "achievements",
            "contact",
          ].map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "nav-link transition-colors duration-300 p-2.5 bg-clip-text hover:text-transparent hover:rounded-md hover:bg-black/10 ",
                  "hover:dark:bg-white/10 hover:backdrop-blur-lg hover:border hover:border-black/15 hover:dark:border-white/20",
                  `${activeLink === link ? "text-transparent bg-gradient-to-r rounded-md backdrop-blur-lg border border-black/15 dark:border-white/20" : ""}`,
                  themes?.isGradient
                    ? `hover:${themes?.primaryGradient}`
                    : "hover:bg-gradient-to-r from-blue-600 to-cyan-600",
                )}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        {/* Dark Mode + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col space-y-1 cursor-pointer"
          >
            <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-200"></span>
            <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-200"></span>
            <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-200"></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-gradient-to-r from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black px-6 py-4 space-y-3 transition-all">
          {[
            "home",
            "about",
            "skills",
            "projects",
            "achievements",
            "contact",
          ].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={(e) => handleNavClick(e, link)}
              className={cn(
                "nav-link transition-colors duration-300 p-2 text-md font-semibold text-center bg-clip-text hover:text-transparent",
                `${activeLink === link ? "text-transparent bg-gradient-to-r rounded-md backdrop-blur-lg border border-black/15 dark:border-white/50" : ""}`,
                themes?.isGradient
                  ? `hover:${themes?.primaryGradient}`
                  : "hover:bg-gradient-to-r from-blue-600 to-cyan-600",
              )}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
