"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMusic } from "../components/MusicContext"; // Path check karlein

export const MusicToggleButton = () => {
    const [isReady, setIsReady] = useState(true);
  const { isPlaying, togglePlay } = useMusic();
  const bars = 6;
  const [heights, setHeights] = useState(Array(bars).fill(0.15));

  // Visualizer Animation
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
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-black/20 backdrop-blur-md border border-white/10 cursor-pointer rounded-full px-6 py-4 flex items-center gap-1.5 transition-all duration-500"
      >
        {heights.map((height, index) => (
          <motion.div
            key={index}
            className="w-[2px] rounded-full"
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