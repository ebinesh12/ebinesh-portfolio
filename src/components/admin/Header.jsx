"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios"; // Using axios for consistency
import { useUserStore } from "@/stores/userStore"; // 1. Import the Zustand store

// 2. Import UI components for the dropdown and avatar
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

// Navigation links configuration for the main app
const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/contacts", label: "Messages" },
  { href: "/admin/profile", label: "Profile" },
];

const Header = ({ themes }) => {
  // 3. Access user data and actions from the Zustand store
  const { user, logoutUser } = useUserStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 4. Enhanced logout function
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Immediately clear the user state from Zustand for a snappy UI response
      logoutUser();
      // Invalidate the session on the server
      await axios.post("/api/v1/logout");
      // Redirect to login page
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("An error occurred during logout:", error);
      // Even if API fails, ensure user is logged out on the client and redirected
      router.push("/auth/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Construct the URL to your new API endpoint.
  const imageUrl = `/api/v1/admin/${user?.id}/img`;

  return (
    <nav className="fixed top-0 left-0 w-full text-black bg-gradient-to-r from-blue-100 via-white to-cyan-100 dark:bg-gradient-to-r dark:from-blue-950 dark:via-gray-900 dark:to-black dark:text-white shadow-md z-40 transition-all duration-700">
      <div
        className={cn(
          "fixed top-0 left-0 h-1 z-50",
          themes?.isGradient
            ? themes?.primaryGradient
            : "bg-gradient-to-r from-blue-600 to-cyan-600",
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
              : "bg-gradient-to-r from-blue-600 to-cyan-600",
          )}
        >
          {isAuthPage ? "Admin" : "Admin Panel"}
        </Link>

        {isAuthPage ? (
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
                  : "hover:bg-gradient-to-r from-blue-600 to-cyan-600",
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
                  : "hover:bg-gradient-to-r from-blue-600 to-cyan-600",
              )}
            >
              Login
            </Link>
          </div>
        ) : (
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
                          : "hover:bg-gradient-to-r from-blue-600 to-cyan-600",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* 5. User Profile Dropdown */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            `data:${
                              user?.profileImage?.contentType
                            };base64,${Buffer?.from(
                              user?.profileImage?.data,
                            )?.toString("base64")}` ||
                            imageUrl ||
                            "/images/profile.jpg"
                          }
                          alt={user?.username}
                        />
                        <AvatarFallback>
                          {user?.username?.charAt(0).toUpperCase() || "A"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.username}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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

      {/* Mobile Menu */}
      {!isAuthPage && menuOpen && (
        <div className="md:hidden flex flex-col bg-gradient-to-r from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black px-6 py-4 space-y-3 transition-all">
          {/* 6. Mobile user info */}
          {user && (
            <div className="flex items-center justify-center gap-x-4 border-b border-gray-200 dark:border-gray-700">
              <img
                src={
                  `data:${
                    user?.profileImage?.contentType
                  };base64,${Buffer?.from(user?.profileImage?.data)?.toString(
                    "base64",
                  )}` ||
                  imageUrl ||
                  "/images/profile.jpg"
                }
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-center py-2">
                <p className="font-semibold">{user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          )}

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
                  : "hover:bg-gradient-to-r from-blue-600 to-cyan-600",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "w-full p-2",
              themes?.isGradient
                ? themes?.primaryGradient
                : "bg-gradient-to-r from-blue-600 to-cyan-600",
            )}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
