"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Staircase from "./Staircase";
import { gsap } from "gsap";
import { TypingAnimation } from "../Component/ui/typing-animation"
import { InteractiveHoverButton } from "@/Component/ui/interactive-hover-button";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isClicked, setIsClicked] = useState(false);
  const [showStaircase, setShowStaircase] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSignatureDone, setIsSignatureDone] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
 const premium= "var(--premium-purple)";
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

  if (!mounted) {
    return <div className="fixed inset-0 z-[9999] bg-background" />;
  }

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-background overflow-hidden flex flex-col items-center justify-center"
    >
      {/* --- SIGNATURE ANIMATION LAYER --- */}
      <AnimatePresence>
        {!isSignatureDone && (
          <motion.div
            key="signature-layer"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ 
                scale: 0, 
                opacity: 0,
                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="absolute inset-0 z-[10000] flex items-center justify-center bg-premium-pink"
          >
            <svg 
              width="400" 
              height="300" 
              viewBox="0 0 1440 1024" 
              fill="none" 
              className="w-[70%] max-w-[500px] h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Path 1: Initial stroke */}
              <motion.path
                d="M225.843 360.601C225.843 347.819 227.151 305.869 232.85 286.751C236.385 274.893 234.416 232.312 231.125 218.945C226.522 200.254 225.843 178.045 202.696 136.134C193.624 119.709 193.331 108.584 189.789 105.235C187.327 102.907 186.216 117.208 194.745 178.045C202.297 231.916 220.331 331.88 231.125 388.79C241.918 445.699 245.932 456.371 249.003 467.713C252.074 479.055 254.08 490.743 263.392 522.174C272.704 553.605 289.259 604.424 300.045 641.021C310.832 677.619 315.347 698.455 318.676 717.827C336.945 824.129 319.93 771.575 318.676 797.5M318.676 797.5C318.254 806.229 321.223 798.524 318.676 797.5ZM318.676 797.5C306.216 771.232 323.267 815.803 318.676 797.5ZM318.676 797.5C313.611 777.308 135.251 672.036 148.727 566.862C152.634 536.363 214.432 535.187 234.553 530.259C250.297 526.403 268.219 517.2 294.314 502.07C307.655 494.334 323.465 486.401 338.675 473.611C374.995 443.072 374.698 422.769 380.034 407.369C381.407 403.405 380.809 399.177 379.555 397.337"
                stroke={premium}
                strokeWidth="14"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Path 2: Middle details */}
              <motion.path
                d="M415.899 359.898C414.148 359.898 410.181 359.898 404.225 360.336C398.568 360.752 393.374 366.053 388.3 373.986C382.515 383.031 376.559 403.219 382.54 407.004M382.54 408.652C378.315 412.084 407.037 401.034 410.347 397.293C420.54 385.773 413.697 366.584 412.801 356.396C412.602 354.135 414.546 352.417 416.754 352.39C428.027 352.255 433.117 363.4 438.218 366.538C450.288 373.962 431.817 338.727 432.693 330.111C433.044 326.654 435.319 325.435 437.534 325.196C448.465 324.018 455.668 338.196 462.082 346.381C463.647 348.379 464.954 350.135 465.411 349.724C472.795 343.089 459.674 327.664 460.769 320.812C461.195 318.141 464.052 317.9 466.274 317.675C474.717 316.818 479.559 323.18 481.549 324.739C486.945 328.966 475.619 305.59 475.579 289.201C475.572 286.199 479.519 286.063 482.842 287.808C497.966 295.747 499.457 304.608 501.009 306.167C502.748 307.914 499.47 291.9 500.565 276.652C500.974 270.943 503.848 269.721 506.507 269.044C520.219 265.556 533.934 272.785 539.008 272.792C541.493 272.795 543.644 271.047 544.99 269.057C547.764 264.958 547.225 258.233 546.569 251.832C546.012 246.405 541.495 243.177 537.747 241.187C535.886 240.198 533.562 240.51 531.778 241.824C529.994 243.137 528.68 245.763 528.223 248.43C527.327 253.646 530.843 259.931 535.035 265.894C538.096 270.248 543.657 272.334 549.832 273.667C552.873 274.324 556.007 272.374 558.68 269.508C571.095 256.2 569.776 235.297 571.09 220.931C571.576 215.615 575.029 214.882 577.477 214.431C586.018 212.857 591.425 219.273 592.984 218.636C607.471 212.718 587.021 197.199 588.116 193.007C588.692 190.799 591.399 189.253 594.715 188.351C609.049 184.452 621.883 195.382 632.09 197.836C634.262 198.358 636.501 198.061 638.942 196.967C648.904 186.613 655.975 173.335 663.052 154.803C664.398 150.333 664.836 147.706 665.287 145"
                stroke={premium}
                strokeWidth="14"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1, ease: "linear" }}
              />
              {/* Path 3: Extension */}
              <motion.path
                d="M476.449 401.686C481.777 396.789 441.423 431.722 476.449 401.686ZM476.449 401.686C505.374 376.883 559.099 335.245 594.859 306.726C630.618 278.208 696 221.402 706.795 212.925C717.59 204.448 721.954 201.382 730.486 194.513"
                stroke={premium}
                strokeWidth="14"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 2.5, ease: "easeInOut" }}
              />
              {/* Path 4: Final dot/stroke */}
              <motion.path
                d="M767.52 170L766 171.52"
                stroke={premium}
                strokeWidth="14"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                onAnimationComplete={() => {
                   // Thora wait kar k shrink start karein
                   setTimeout(() => setIsSignatureDone(true), 600);
                }}
                transition={{ duration: 0.5, delay: 3.5 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

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
          animate={isSignatureDone ? "visible" : "hidden"}
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
            className="text-premium-pink tracking-wider text-[16px] md:text-[16px] uppercase mt-8"
          />
        </motion.div>

        {!isClicked && isSignatureDone && (
          <InteractiveHoverButton onClick={handleEnter} className="border-premium-pink text-premium-pink">
            Initialize Experience
          </InteractiveHoverButton>
        )}
      </div>

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}