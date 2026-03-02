"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const WaterDroplet = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Viscous physics - Thora heavy feel dene ke liye
  const springConfig = { damping: 30, stiffness: 120, mass: 1.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Mouse ko center mein rakhne ke liye scroll offset bhi add kar rahe hain
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* SVG Filter: Iske bagair liquid feel nahi aati */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="liquid-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          filter: "url(#liquid-goo)", // Filter apply karna zaroori hai
        }}
        className="relative"
      >
        {/* Main Body of the Droplet */}
        <motion.div
          animate={{
            scale: [1, 1.05, 0.95, 1],
            rotate: [0, 10, -10, 0],
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "50% 50% 50% 50% / 50% 50% 50% 50%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "40% 60% 70% 30% / 40% 50% 60% 50%",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[350px] h-[350px] bg-gradient-to-br from-premium-pink/40 via-lavender/30 to-premium-pink/10 shadow-[inset_0_0_80px_rgba(255,255,255,0.3)] backdrop-blur-3xl border border-white/20"
        />
        
        {/* Secondary "Satellite" Blob for extra gooey effect */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 left-10 w-24 h-24 bg-premium-pink/30 rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default WaterDroplet;