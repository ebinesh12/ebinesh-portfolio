"use client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export default function TypingAnimation({ text, duration = 200, className }) {
  const [displayedText, setDisplayedText] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        setI(0);
        setDisplayedText("");
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i]);

  return (
    <h1
      className={cn(
        "text-center text-xl font-bold  tracking-[-0.02em] drop-shadow-xs",
        className,
      )}
    >
      {displayedText ? displayedText : text}
      <span className="animate-pulse">|</span>
    </h1>
  );
}
