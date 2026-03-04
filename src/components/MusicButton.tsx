"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef, useCallback } from "react";

export const MusicToggleButton = () => {
  const bars = 6;
  const [isPlaying, setIsPlaying] = useState(false);
  const [heights, setHeights] = useState(Array(bars).fill(0.15));
  const [isReady, setIsReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInitialized = useRef(false);

  // Audio initialize karo — lekin play mat karo abhi
  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setIsReady(true));

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Bar animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setHeights(Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2));
      }, 150);
    } else {
      setHeights(Array(bars).fill(0.15));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-play: sirf desktop pe (pointer: fine = mouse wala device)
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return; // Mobile pe autoplay bilkul nahi

    const tryAutoPlay = () => {
      if (hasInitialized.current || !audioRef.current) return;
      hasInitialized.current = true;
      cleanup();

      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Desktop pe bhi block ho sakta hai — silently fail
        hasInitialized.current = false;
      });
    };

    const cleanup = () => {
      window.removeEventListener("mousemove", tryAutoPlay);
      window.removeEventListener("keydown", tryAutoPlay);
    };

    window.addEventListener("mousemove", tryAutoPlay);
    window.addEventListener("keydown", tryAutoPlay);
    return cleanup;
  }, []);

  // ✅ KEY FIX: onClick directly play karo — yeh guaranteed user gesture hai
  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // .play() returns a Promise — mobile pe zaroor await karo
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        hasInitialized.current = true;
      }).catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3">
      {!isPlaying && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          className="font-monaco text-[8px] uppercase tracking-[0.4em] text-primary whitespace-nowrap"
        >
          {isReady ? "Click to play vibe" : "Loading..."}
        </motion.span>
      )}

      <motion.div
        onClick={handleClick}
        onTouchEnd={handleClick as any} // ✅ Mobile ke liye explicit touchEnd
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-black/20 backdrop-blur-md border border-white/10 cursor-pointer rounded-full px-6 py-4 flex items-center gap-1.5 transition-all duration-500 shadow-2xl"
      >
        {heights.map((height, index) => (
          <motion.div
            key={index}
            className="w-[2px] rounded-full"
            initial={{ height: 4 }}
            animate={{
              height: isPlaying ? Math.max(4, height * 20) : 4,
              backgroundColor: isPlaying ? "#BF5AF2" : "#FFFFFF",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
        ))}
      </motion.div>
    </div>
  );
};