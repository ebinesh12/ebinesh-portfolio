"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "@/slices/userSlice";

// UI Components
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
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Icons
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  MessageSquare,
  User,
  ChevronDown,
  ShieldCheck,
  ExternalLink
} from "lucide-react";

// Navigation Configuration
const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Messages", icon: MessageSquare },
  { href: "/admin/profile", label: "Profile", icon: User },
];

const Header = () => {
  // const { user, logoutUser } = useUserStore();
  const user = useSelector((state) => state.userInfo.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  // Detect Auth Pages to simplify header
  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Progress Bar logic
      const prog = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setProgress(prog);

      // Shadow/Blur trigger logic
      setScrolled(scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      dispatch(removeUser());
      await axios.post("/api/v1/logout");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/auth/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const imageUrl = user?.id ? `/api/v1/admin/${user.id}/img` : null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-neutral-200 dark:border-neutral-800"
          : "bg-white dark:bg-neutral-950 border-transparent",
      )}
    >
      {/* Reading Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-blue-600 dark:bg-blue-500 transition-all duration-150 ease-out z-[60]"
        style={{ width: `${progress}%` }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Area */}
        <Link
          href={isAuthPage ? "/auth/login" : "/admin"}
          className="flex items-center gap-2 group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            Admin<span className="text-neutral-400">Panel</span>
          </span>
        </Link>

{/* View Live Site Button (Desktop) */}
          <div className="hidden md:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-2 text-muted-foreground rounded-full border-dashed" asChild>
                    <Link href="/" target="_blank">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Site
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View your public portfolio</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {isAuthPage ? (
            /* Auth Page Navigation (Login/Register) */
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/auth/login">
                <Button
                  variant={pathname === "/auth/login" ? "secondary" : "ghost"}
                  size="sm"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  variant={
                    pathname === "/auth/register" ? "secondary" : "ghost"
                  }
                  size="sm"
                >
                  Register
                </Button>
              </Link>
            </nav>
          ) : (
            /* Admin Navigation */
            <>
              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                          : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-neutral-400 group-hover:text-neutral-600",
                        )}
                      />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* User Dropdown */}
              {user && (
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 gap-2 rounded-full pl-2 pr-4 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <Avatar className="h-8 w-8 border border-neutral-200 dark:border-neutral-700">
                          <AvatarImage
                            src={imageUrl || "/images/profile.jpg"}
                            alt={user.username}
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                            {user.username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {user.username}
                        </span>
                        <ChevronDown className="h-4 w-4 text-neutral-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
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
                        className="text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20 cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>
                          {isLoggingOut ? "Logging out..." : "Log out"}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col space-y-4">
            {/* Mobile User Info */}
            {user && (
              <div className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={imageUrl || "/images/profile.jpg"} />
                  <AvatarFallback>
                    {user.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {user.username}
                  </p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                </div>
              </div>
            )}

            {/* Mobile Links */}
            <nav className="flex flex-col space-y-1">
              {!isAuthPage ? (
                navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-3 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-3 text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Logout */}
            {!isAuthPage && user && (
              <Button
                variant="destructive"
                className="w-full justify-start gap-3"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Log out"}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
