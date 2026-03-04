"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import useSound from "use-sound";

export const MusicToggleButton = () => {
  const bars = 6;
  const [isPlaying, setIsPlaying] = useState(false);
  const [heights, setHeights] = useState(Array(bars).fill(0.15));
  const hasAutoPlayed = useRef(false);

  const [play, { pause }] = useSound("/music.mp3", {
    loop: true,
    volume: 0.5,
    format: ["mp3"],
  });

  // play ko ref mein rakh — stale closure se bachne ke liye
  const playRef = useRef(play);
  useEffect(() => { playRef.current = play; }, [play]);

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

  // Auto-play on FIRST interaction — mousemove se desktop pe jaldi trigger hoga
  useEffect(() => {
    const tryAutoPlay = () => {
      if (hasAutoPlayed.current) return;
      hasAutoPlayed.current = true;
      cleanup();
      playRef.current(); // Ref se call — hamesha latest function
      setIsPlaying(true);
    };

    const cleanup = () => {
      window.removeEventListener("mousemove", tryAutoPlay);
      window.removeEventListener("click", tryAutoPlay);
      window.removeEventListener("scroll", tryAutoPlay);
      window.removeEventListener("keydown", tryAutoPlay);
      window.removeEventListener("touchstart", tryAutoPlay);
    };

    window.addEventListener("mousemove", tryAutoPlay);
    window.addEventListener("click", tryAutoPlay);
    window.addEventListener("scroll", tryAutoPlay);
    window.addEventListener("keydown", tryAutoPlay);
    window.addEventListener("touchstart", tryAutoPlay);

    return cleanup;
  }, []); // Empty deps — playRef se latest milta rahega

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      playRef.current();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3">
      {/* Click Hint — sirf tab dikhe jab play nahi ho raha */}
      {!isPlaying && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          className="font-monaco text-[8px] uppercase tracking-[0.4em] text-primary whitespace-nowrap"
        >
          Click to play vibe
        </motion.span>
      )}

      <motion.div
        onClick={handleClick}
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