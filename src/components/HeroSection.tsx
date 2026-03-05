"use client";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
 const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Same pattern as AnimatedThemeToggler — directly watch the class
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme(); // Initial read

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const jellyCircleRef = useRef<SVGCircleElement>(null);

  // Ambient floating blob for mobile (no mouse)
  const blobAngle = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Desktop: jelly follows mouse
  useEffect(() => {
    if (isTouchDevice) return;
    const unsubX = smoothX.on("change", (val) => {
      jellyCircleRef.current?.setAttribute("cx", String(val));
    });
    const unsubY = smoothY.on("change", (val) => {
      jellyCircleRef.current?.setAttribute("cy", String(val));
    });
    return () => { unsubX(); unsubY(); };
  }, [smoothX, smoothY, isTouchDevice]);

  // Mobile: ambient blob floats in a slow elliptical path
  useAnimationFrame((t) => {
    if (!isTouchDevice || !jellyCircleRef.current || !containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;
    const cx = w * 0.5 + Math.sin(t * 0.0003) * w * 0.25;
    const cy = h * 0.45 + Math.cos(t * 0.0002) * h * 0.2;
    jellyCircleRef.current.setAttribute("cx", String(cx));
    jellyCircleRef.current.setAttribute("cy", String(cy));
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    if (!hasMoved) setHasMoved(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full bg-background h-[100svh] overflow-hidden flex flex-col justify-center items-center font-monaco ${!isTouchDevice ? "cursor-none" : ""}`}
    >
      {/* ── SVG FILTERS & MASKS ── */}
      <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="jelly-distort" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.016"
              numOctaves="3"
              seed="42"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.04 0.016; 0.018 0.010; 0.010 0.020; 0.016 0.013; 0.012 0.016"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <mask id="jelly-reveal-mask">
            <rect width="10000" height="10000" fill="black" />
            <circle
              ref={jellyCircleRef}
              cx="-200"
              cy="-200"
              /* Bigger blob on mobile for ambient effect */
              r="150"
              fill="white"
              filter="url(#jelly-distort)"
            />
          </mask>
        </defs>
      </svg>

      {/* ── LAYER 1: Dim background ── */}
      <div className="absolute inset-0 z-0">
        <img src="/heroback.png" className="w-full h-full object-cover opacity-30" alt="" />
      </div>

      {/* ── LAYER 2: Jelly revealed image ── */}
      <svg
        className="absolute inset-0 bg-background z-10 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <image
          href={"/heroback.png"}
          x="0" y="0"
          width="100%" height="100%"
          preserveAspectRatio="xMidYMid slice"
          opacity="0.9"
          mask="url(#jelly-reveal-mask)"
        />
      </svg>

      {/* ── LAYER 3: Marquee ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative flex whitespace-nowrap">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            {[...Array(8)].map((_, i) => (
              <h1
                key={i}
                /* Responsive: smaller on mobile so it doesn't overwhelm */
                className="font-grok text-[22vw] sm:text-[18vw] leading-none uppercase text-premium-pink/70 px-6 sm:px-10"
              >
                WEB DEVELOPER —
              </h1>
            ))}
          </motion.div>
        </div>
      </div>

    {/* ── LAYER 4: Hero image with Reveal Effect ── */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-30 h-[80vh] sm:h-full w-full flex items-end sm:items-center justify-center overflow-hidden"
      >
        {/* Base Image (Girl) */}
        <img
          src={isDark ? "/herogirldark.png" : "/herogirllightc.jpg"}
          className="h-full  w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          alt="Hero"
        />

        {/* Masked Reveal Image (Samman) - Ye Girl ke bilkul upar hai lekin sirf mask area mein dikhegi */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Hum wahi same mask ID use kar sakte hain jo upar define ki hai */}
          </defs>
          <foreignObject
            mask="url(#jelly-reveal-mask)"
            width="100%"
            height="100%"
          >
            <div className="w-full h-[80vh] sm:h-full  relative xs:top-[55vh] sm:top-[23vh] lg:top-[11vh] flex items-end sm:items-center justify-center">
              <img
                src={isDark ? "/sammandark.png" : "/sammanlightc.png"}
                className="h-full w-auto lg:block object-center object-contain hidden"
                alt="Samman Reveal"
              />
            </div>
          </foreignObject>
        </svg>
      </motion.div>

      {/* ── LAYER 5: Text UI ── */}
      <div className="absolute inset-0 z-50 pointer-events-none">

        {/* ── TOP LEFT: Introduction ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute lg:top-28 top-34 left-4 sm:left-12 max-w-[200px] sm:max-w-[280px]"
        >
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-premium-pink font-bold mb-1">
            Introduction
          </p>
          <p className="text-[10px] sm:text-[11px] leading-relaxed text-foreground uppercase tracking-widest">
            Specialized in MERN Stack, Shopify & WordPress development
          </p>
          <div className="flex gap-3 sm:gap-4 mt-2 pointer-events-auto">
            {["IG", "TW"].map((s) => (
              <div
                key={s}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-premium-pink flex items-center justify-center text-[10px] text-foreground hover:text-premium-pink hover:bg-premium-pink/10 transition-colors"
              >
                {s}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── TOP RIGHT: Availability ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute lg:top-28 top-34 right-4 sm:right-12 text-right"
        >
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-premium-pink font-bold mb-1">
            Availability
          </p>
          <div className="flex items-center justify-end gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <p className="font-grok   sm:text-4xl uppercase italic">Open for Projects</p>
          </div>
        </motion.div>

        {/* ── BOTTOM LEFT: Location ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute lg:bottom-10 bottom-24 left-4 sm:left-12"
        >
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-premium-pink font-bold mb-0.5">
            Base Location
          </p>
          <h2 className="font-grok  sm:text-4xl uppercase leading-none italic">
            Pakistan, Sargodha <br />
            <span className="text-premium-pink italic">32.08° N</span>
          </h2>
        </motion.div>

        {/* ── BOTTOM RIGHT: Tags + Tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          /* Hide tagline text on mobile, show only tags to avoid overlap */
          className="absolute lg:bottom-10 bottom-24 right-4 sm:right-12 max-w-[180px] sm:max-w-[320px] text-right"
        >
          <p className="hidden sm:block text-[11px] leading-relaxed uppercase tracking-widest mb-2">
            Immerse yourself in a world where each line of{" "}
            <span>code tells a tale</span>, capturing the beauty of the ordinary
            and the extraordinary.
          </p>
          <div className="flex flex-col items-end gap-1.5">
            {["MERN Stack", "Shopify & WordPress"].map((tag) => (
              <span
                key={tag}
                className="text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-0.5 sm:py-1 border border-premium-pink rounded-full  uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

 
    </div>
  );
};

export default HeroSection;