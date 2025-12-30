"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  LayoutDashboard,
  MessageSquare,
  User,
} from "lucide-react";

// --- Configuration ---

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Messages", icon: MessageSquare },
  { href: "/admin/profile", label: "Profile", icon: User },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: Facebook,
    hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    href: "https://twitter.com/",
    label: "Twitter",
    icon: Twitter,
    hoverColor: "hover:text-sky-500 dark:hover:text-sky-400",
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: Instagram,
    hoverColor: "hover:text-pink-600 dark:hover:text-pink-400",
  },
  {
    href: "https://www.linkedin.com/in/ebinesh-rabin-c19",
    label: "LinkedIn",
    icon: Linkedin,
    hoverColor: "hover:text-blue-700 dark:hover:text-blue-500",
  },
  {
    href: "https://github.com/ebinesh12",
    label: "GitHub",
    icon: Github,
    hoverColor: "hover:text-neutral-900 dark:hover:text-white",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Check if we are on an auth page (Login/Register)
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-8 text-sm dark:border-neutral-800 dark:bg-neutral-950 transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4">
        {/* Social Media Icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className={cn(
                  "group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition-all hover:scale-110 dark:bg-neutral-900",
                  "text-neutral-500 dark:text-neutral-400",
                  item.hoverColor,
                )}
              >
                <Icon className="h-5 w-5 transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Navigation Links (Hidden on Auth Pages) */}
        {!isAuthPage && (
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "font-medium transition-colors hover:underline hover:underline-offset-4",
                      pathname === link.href
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Separator Line (Small visual detail) */}
        <div className="h-px w-12 bg-neutral-200 dark:bg-neutral-800" />

        {/* Copyright */}
        <div className="text-center text-neutral-500 dark:text-neutral-400">
          <p>
            &copy; {currentYear}{" "}
            <Link
              href="/admin"
              className="font-semibold text-neutral-900 hover:underline dark:text-white"
            >
              Ebinesh Rabin
            </Link>
            . All Rights Reserved.
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Designed for Portfolio Admin Panel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
