"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasMoved) setHasMoved(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasMoved, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-10 h-10 border border-premium-pink rounded-full pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-[1px]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: hasMoved ? 1 : 0,
      }}
    >
      <div className="w-1.5 h-1.5 bg-premium-pink rounded-full shadow-[0_0_15px_rgba(255,0,122,0.8)]" />
    </motion.div>
  );
};

export default CustomCursor;