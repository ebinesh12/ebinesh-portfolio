"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Navigation links configuration for the main app
const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/contacts", label: "Messages" },
];

const Header = ({ themes }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Determine if the current page is an authentication page
  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register";

  // Effect for scroll progress bar (runs on all pages)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      // Avoid division by zero on pages with no scroll
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/v1/logout", { method: "POST" });
      if (res.ok) {
        router.push("/auth/login");
        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Button styles for consistency
  const buttonClassName = cn(
    "px-4 py-2 text-white rounded-lg font-semibold",
    themes?.isGradient
      ? themes?.primaryGradient
      : "bg-gradient-to-r from-blue-600 to-cyan-600"
  );

  return (
    <nav className="fixed top-0 left-0 w-full text-black bg-gradient-to-r from-blue-100 via-white to-cyan-100 dark:bg-gradient-to-r dark:from-blue-950 dark:via-gray-900 dark:to-black dark:text-white shadow-md z-40 transition-all duration-700">
      {/* Progress Bar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-1 z-50",
          themes?.isGradient
            ? themes?.primaryGradient
            : "bg-gradient-to-r from-blue-600 to-cyan-600"
        )}
        style={{ width: `${progress}%` }}
      />

      <div className="mx-auto flex justify-between items-center px-6 md:px-16 py-3">
        <Link
          href={isAuthPage ? "/auth/login" : "/admin"}
          className={cn(
            "text-xl font-bold bg-clip-text text-transparent",
            themes?.isGradient
              ? themes?.primaryGradient
              : "bg-gradient-to-r from-blue-600 to-cyan-600"
          )}
        >
          {isAuthPage ? "Admin" : "Admin Panel"}
        </Link>

        {/* === CONDITIONAL UI === */}
        {isAuthPage ? (
          // --- UI for Login/Register pages ---
          <div className="flex justify-between items-center gap-5">
            <Link
              href={"/auth/register"}
              className={cn(
                "nav-link transition-colors duration-300 p-2.5 bg-clip-text hover:text-transparent hover:rounded-md hover:bg-black/10",
                "hover:dark:bg-white/10 hover:backdrop-blur-lg hover:border hover:border-black/15 hover:dark:border-white/20",
                pathname === "/auth/register" &&
                  "text-transparent bg-gradient-to-r rounded-md backdrop-blur-lg border border-black/15 dark:border-white/20",
                themes?.isGradient
                  ? `hover:${themes?.primaryGradient}`
                  : "hover:bg-gradient-to-r from-blue-600 to-cyan-600"
              )}
            >
              Register
            </Link>
            <Link
              href={"/auth/login"}
              className={cn(
                "nav-link transition-colors duration-300 p-2.5 bg-clip-text hover:text-transparent hover:rounded-md hover:bg-black/10",
                "hover:dark:bg-white/10 hover:backdrop-blur-lg hover:border hover:border-black/15 hover:dark:border-white/20",
                pathname === "/auth/login" &&
                  "text-transparent bg-gradient-to-r rounded-md backdrop-blur-lg border border-black/15 dark:border-white/20",
                themes?.isGradient
                  ? `hover:${themes?.primaryGradient}`
                  : "hover:bg-gradient-to-r from-blue-600 to-cyan-600"
              )}
            >
              Login
            </Link>
          </div>
        ) : (
          // --- UI for all other pages ---
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <ul className="flex items-center space-x-4 font-medium">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "nav-link transition-colors duration-300 p-2.5 bg-clip-text hover:text-transparent hover:rounded-md hover:bg-black/10",
                        "hover:dark:bg-white/10 hover:backdrop-blur-lg hover:border hover:border-black/15 hover:dark:border-white/20",
                        pathname === link.href &&
                          "text-transparent bg-gradient-to-r rounded-md backdrop-blur-lg border border-black/15 dark:border-white/20",
                        themes?.isGradient
                          ? `hover:${themes?.primaryGradient}`
                          : "hover:bg-gradient-to-r from-blue-600 to-cyan-600"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={buttonClassName}
              >
                Logout
              </Button>
            </div>

            {/* Mobile Toggle */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col space-y-1 cursor-pointer"
            >
              <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-200"></span>
              <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-200"></span>
              <span className="block w-6 h-0.5 bg-gray-700 dark:bg-gray-200"></span>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu (only shows if not on an auth page) */}
      {!isAuthPage && menuOpen && (
        <div className="md:hidden flex flex-col bg-gradient-to-r from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black px-6 py-4 space-y-3 transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "nav-link transition-colors duration-300 p-2 text-md font-semibold text-center bg-clip-text hover:text-transparent",
                pathname === link.href &&
                  "text-transparent bg-gradient-to-r rounded-md backdrop-blur-lg border border-black/15 dark:border-white/50",
                themes?.isGradient
                  ? `hover:${themes?.primaryGradient}`
                  : "hover:bg-gradient-to-r from-blue-600 to-cyan-600"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn("w-full p-2",themes?.isGradient
                  ? themes?.primaryGradient
                  : "bg-gradient-to-r from-blue-600 to-cyan-600")}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;