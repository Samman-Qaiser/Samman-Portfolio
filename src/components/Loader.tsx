"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Staircase from "./Staircase";
import { gsap } from "gsap";
import { TypingAnimation } from "../Component/ui/typing-animation"
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isClicked, setIsClicked] = useState(false);
  const [showStaircase, setShowStaircase] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = () => {
    setIsClicked(true);
    const tl = gsap.timeline();
    
    tl.to(nameRef.current, {
      letterSpacing: "1.5em",
      opacity: 0,
      filter: "blur(15px)",
      skewX: -15, 
      duration: 1.2,
      ease: "power4.inOut"
    })
    .to(containerRef.current, {
      backgroundColor: "transparent",
      duration: 0.5,
      onComplete: () => {
        setShowStaircase(true);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, filter: "blur(10px)", skewY: 2 },
    visible: {
      y: 0, opacity: 1, filter: "blur(0px)", skewY: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  // HYDRATION ERROR FIX: Render a placeholder until client-side is ready
  if (!mounted) {
    return <div className="fixed inset-0 z-[9999] bg-background" />;
  }

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-background overflow-hidden flex flex-col items-center justify-center"
    >
      {/* 1. BACKGROUND LAYER */}
      {!showStaircase && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 80, 0], y: [0, -40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-premium-pink/15 blur-[100px] rounded-full"
          />
        </div>
      )}

      {/* 2. TRANSITION LAYER */}
      <AnimatePresence mode="wait">
        {showStaircase && <Staircase key="staircase" />}
      </AnimatePresence>

      {/* 3. CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          ref={nameRef} 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 pointer-events-none"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-premium-pink font-monaco text-[10px] md:text-xs uppercase tracking-[1.2em] opacity-40 mb-6"
          >
            Portfolio System v2.0
          </motion.h1>

          <div className="overflow-hidden py-2">
            <motion.h2 
              variants={itemVariants}
              className="text-premium-pink font-grok text-5xl md:text-8xl lg:text-9xl uppercase leading-none italic flex flex-wrap items-center justify-center gap-4 md:gap-6"
            >
              <span className="inline-block">Samman</span> 
              <span className=" border-t border-b border-premium-pink/50 px-4 md:px-6 py-2">
                Qaiser
              </span>
            </motion.h2>
          </div>

      
           <TypingAnimation 
  text="Crafting Digital Emotions Through Code"

  className="text-premium-pink tracking-wider text-[16px] md:text-[16px] uppercase  mt-8"
/>
          
      
        </motion.div>

        {/* 4. INTERACTIVE LAYER */}
        {!isClicked && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={handleEnter}
            className="group relative px-10 py-4 md:px-12 md:py-5 bg-transparent border border-premium-pink/30 rounded-full overflow-hidden transition-all hover:border-premium-pink"
          >
            <span className="relative z-10 text-premium-pink font-monaco text-[10px] md:text-[11px] uppercase tracking-[0.4em] group-hover:scale-105 transition-transform inline-block">
              Initialize Experience
            </span>
            <motion.div 
              className="absolute inset-0 bg-premium-pink/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" 
            />
          </motion.button>
        )}
      </div>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}