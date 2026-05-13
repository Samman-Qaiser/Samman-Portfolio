"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedThemeToggler() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Ripple canvas animation
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.display = "block";

      const newDark = !isDark;
      const fillColor = newDark ? "#0a0a0a" : "#ffffff";

      let radius = 0;
      const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
      const btnRect = canvasRef.current.parentElement
        ?.querySelector("button")
        ?.getBoundingClientRect();
      const cx = btnRect ? btnRect.left + btnRect.width / 2 : window.innerWidth / 2;
      const cy = btnRect ? btnRect.top + btnRect.height / 2 : window.innerHeight / 2;

      const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
        radius += maxRadius / 18;

        if (radius < maxRadius) {
          requestAnimationFrame(animate);
        } else {
          // Apply theme at peak
          if (newDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          setIsDark(newDark);
          canvas.style.display = "none";
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setIsAnimating(false);
        }
      };
      animate();
    } else {
      const newDark = !isDark;
      if (newDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setIsDark(newDark);
      setIsAnimating(false);
    }
  };

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <>
      {/* Full-screen ripple canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ display: "none" }}
      />

      <button
        onClick={toggleTheme}
        disabled={isAnimating}
        aria-label="Toggle theme"
        className="relative w-14 h-7 rounded-full flex items-center group"
        style={{
          background: isDark
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.06)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid rgba(0,0,0,0.10)",
        }}
      >
        {/* Track glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isDark
              ? "inset 0 0 12px rgba(251,191,36,0.08)"
              : "inset 0 0 12px rgba(99,102,241,0.08)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Sliding thumb */}
        <motion.div
          animate={{ x: isDark ? 30 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="relative w-5 h-5 rounded-full flex items-center justify-center z-10 shadow-md"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              /* Sun rays icon */
              <motion.svg
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                viewBox="0 0 24 24"
                fill="none"
                className="w-3 h-3"
                stroke="white"
                strokeWidth={2.5}
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </motion.svg>
            ) : (
              /* Moon icon */
              <motion.svg
                key="moon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                viewBox="0 0 24 24"
                fill="white"
                className="w-3 h-3"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stars (dark mode) */}
        <AnimatePresence>
          {isDark && (
            <>
              {[
                { top: "20%", left: "18%", size: 1.5, delay: 0 },
                { top: "60%", left: "22%", size: 1, delay: 0.1 },
                { top: "35%", left: "30%", size: 1, delay: 0.15 },
              ].map((star, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: star.delay, duration: 0.3 }}
                  className="absolute rounded-full bg-white"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Sun rays burst (light mode) */}
        <AnimatePresence>
          {!isDark && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              {[0, 45, 90, 135].map((deg, i) => (
                <motion.span
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="absolute bg-indigo-400/40 rounded-full"
                  style={{
                    width: 1,
                    height: 5,
                    transform: `rotate(${deg}deg) translateY(-5px)`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}