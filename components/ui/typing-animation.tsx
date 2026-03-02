"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TypingAnimation({
  text,
  duration = 100,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [i, text, duration]);

  return (
    <div className={cn("leading-[1]", className)}>
      {displayedText}
      <span className="ml-1 animate-pulse border-r-2 border-premium-pink" />
    </div>
  );
}