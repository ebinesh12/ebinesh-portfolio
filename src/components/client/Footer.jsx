"use client";

import { cn } from "@/lib/utils";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowUpRight,
} from "lucide-react";

// Social Data Configuration
const socialLinks = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: Facebook,
    color: "hover:text-blue-600 dark:hover:text-blue-500",
  },
  {
    href: "https://twitter.com/",
    label: "Twitter",
    icon: Twitter,
    color: "hover:text-sky-500 dark:hover:text-sky-400",
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: Instagram,
    color: "hover:text-pink-600 dark:hover:text-pink-500",
  },
  {
    href: "https://www.linkedin.com/in/ebinesh-rabin-c19",
    label: "LinkedIn",
    icon: Linkedin,
    color: "hover:text-blue-700 dark:hover:text-blue-400",
  },
  {
    href: "https://github.com/ebinesh12",
    label: "GitHub",
    icon: Github,
    color: "hover:text-neutral-900 dark:hover:text-white",
  },
];

const navLinks = [
  "home",
  "about",
  "skills",
  "projects",
  "achievements",
  "contact",
];

const Footer = ({ themes }) => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-neutral-200 bg-white/50 py-12 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* 1. CTA / Brand */}
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Let&apos;s build something{" "}
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  themes?.primaryGradient || "bg-blue-600",
                )}
              >
                amazing
              </span>
              .
            </h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              Open for opportunities and collaborations.
            </p>
          </div>

          {/* 2. Navigation Links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="group relative text-sm font-medium capitalize text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {link}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full",
                        themes?.isGradient
                          ? themes?.primaryGradient
                          : "bg-neutral-900 dark:bg-white",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={cn(
                    "group relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-neutral-900",
                    "text-neutral-500 dark:text-neutral-400",
                    item.color,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* 4. Divider */}
          <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          {/* 5. Copyright */}
          <div className="flex flex-col items-center gap-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
            <p>
              &copy; {currentYear}{" "}
              <a
                href="/admin"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Ebinesh Rabin
              </a>
              . All Rights Reserved.
            </p>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1 text-xs hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Back to top <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
