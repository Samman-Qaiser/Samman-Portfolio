"use client";
import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const MusicContext = createContext<any>(null);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playMusic = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, playMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);