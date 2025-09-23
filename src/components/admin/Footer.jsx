"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- Data for Links ---

// Navigation links for the footer
const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/contacts", label: "Messages" },
  { href: "/admin/profile", label: "Profile" },
];

// Social media links for reusability
const socialLinks = [
  {
    href: "https://www.facebook.com/",
    title: "Facebook",
    icon: "fab fa-facebook-f",
    hoverClass: "hover:text-blue-600 dark:hover:text-cyan-400",
  },
  {
    href: "https://twitter.com/",
    title: "Twitter",
    icon: "fab fa-twitter",
    hoverClass: "hover:text-blue-600 dark:hover:text-cyan-400",
  },
  {
    href: "https://www.instagram.com/",
    title: "Instagram",
    icon: "fab fa-instagram",
    hoverClass: "hover:text-pink-500 dark:hover:text-pink-400",
  },
  {
    href: "https://www.linkedin.com/in/ebinesh-rabin-c19",
    title: "LinkedIn",
    icon: "fab fa-linkedin-in",
    hoverClass: "hover:text-blue-600 dark:hover:text-cyan-400",
  },
  {
    href: "https://github.com/ebinesh12",
    title: "GitHub",
    icon: "fab fa-github",
    hoverClass: "hover:text-gray-800 dark:hover:text-white",
  },
];

const Footer = ({ themes }) => {
  const Year = () => new Date().getFullYear();
  const pathname = usePathname();

  // Check if the current page is an authentication page
  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";

  return (
    <footer
      className="w-full bg-gradient-to-r from-blue-100 via-white to-cyan-100
            dark:from-blue-950 dark:via-gray-900 dark:to-black
            text-gray-800 dark:text-gray-300 py-8 transition-colors duration-700"
    >
      <div className="container mx-auto px-4 text-center">
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              title={link.title}
              className={cn("transition-colors duration-300", link.hoverClass)}
              rel="noopener noreferrer"
            >
              <i className={cn(link.icon, "text-xl")}></i>
            </a>
          ))}
        </div>

        {/* Footer Navigation (hidden on auth pages) */}
        {!isAuthPage && (
          <div className="mb-4">
            <ul className="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-400">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "nav-link transition-colors duration-300 p-2.5 bg-clip-text hover:text-transparent hover:rounded-md hover:bg-black/10",
                      "hover:dark:bg-white/10 hover:backdrop-blur-lg",
                      pathname === link.href &&
                        "text-transparent bg-gradient-to-r rounded-md backdrop-blur-lg",
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
          </div>
        )}

        {/* Copyright */}
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {Year()}{" "}
          <Link href="/admin" className="hover:underline">
            Ebinesh Rabin.
          </Link>{" "}
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
