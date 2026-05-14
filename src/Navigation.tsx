"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { AnimatedThemeToggler } from "./Component/ui/animated-theme-toggler";
import { InteractiveHoverButton } from "./Component/ui/interactive-hover-button";

const navLinks = [
  { name: "Home", href: "/", num: "01" },
  { name: "Projects", href: "#projects", num: "02" },
  { name: "Services", href: "#services", num: "03" },
    { name: "Experience", href: "#experience", num: "04" },
  { name: "Contact", href: "#contact", num: "05" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    setMounted(true);
    const updateTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  // Nav floats down as a pill after scrolling 80px
  const floated = scrollY > 80;

  return (
    <>
      {/* ── FLOATING PILL NAV ── */}
      <motion.div
        className="fixed z-[100] left-0 right-0 flex justify-center pointer-events-none"
        animate={{ top: floated ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <motion.nav
          animate={{
            borderRadius: floated ? "9999px" : "0px",
            paddingLeft: floated ? "10px" : "38px",
            paddingRight: floated ? "20px" : "38px",
            paddingTop: floated ? "5px" : "10px",
            paddingBottom: floated ? "5px" : "10px",
            maxWidth: floated ? "880px" : "100%",
            backdropFilter: floated ? "blur(24px)" : "blur(0px)",
            backgroundColor: floated
              ? isDark
                ? "rgba(10,10,10,0.85)"
                : ""
              : "transparent",
            boxShadow: floated
              ? "0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.06)"
              : "none",
          }}
          transition={{ type: "spring", stiffness: 180, damping: 28 }}
          className="w-full bg-premium-purple/30 flex items-center justify-between pointer-events-auto"
        >
          {/* Logo */}
          <motion.div layout whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 400 }}>
            <img
              src={isDark ? "/logodark.png" : "/logolight.png"}
              alt="Logo"
              width={floated ? 100 : 100}
              className="transition-all  duration-500"
            />
          </motion.div>

          {/* Desktop links — morph into icon dots when floated */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className="relative group px-3 py-1.5 flex items-center gap-1.5"
                >
                  {/* Active dot */}
                  {activeLink === link.name && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute inset-0 rounded-full  bg-lavender/60
                       border border-premium-pink/20"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {floated ? (
                      /* Floated: just a tiny dot + short label */
                      <motion.span
                        key="short"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                        className="text-[12px]  uppercase tracking-[0.2em] font-medium text-foreground/90 hover:text-premium-pink transition-colors relative z-10"
                      >
                        {link.name}
                      </motion.span>
                    ) : (
                      /* Expanded: number + name */
                      <motion.span
                        key="full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 relative z-10"
                      >
                        <span className="text-[13px] font-mono text-lavender">
                          {link.num}
                        </span>
                        <span className="text-[13px] uppercase tracking-[0.25em] font-medium text-foreground/70 hover:text-foreground transition-colors">
                          {link.name}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-3">
            <AnimatedThemeToggler />
            <InteractiveHoverButton id="contact" className="hidden border-lavender lg:block">
         Let’s Cook
            </InteractiveHoverButton>


            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-8 h-8 flex flex-col gap-[5px] items-center justify-center"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1px] bg-foreground"
                transition={{ duration: 0.4 }}
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="block w-3 h-[1px] bg-foreground self-end"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1px] bg-foreground"
                transition={{ duration: 0.4 }}
              />
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* ── CORNER LOGO MARK (top-left decorative) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollY > 80 ? 0 : 1, scale: scrollY > 80 ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-6 z-[99] hidden md:flex flex-col gap-1 pointer-events-none"
      >
        <span className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">Portfolio</span>
        <span className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">© 2026</span>
      </motion.div>

      {/* ── CURSOR FOLLOWER ── */}
      <CursorFollower />

      {/* ── MOBILE MENU — SPLIT SCREEN ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] md:hidden flex"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Left half */}
            <motion.div
              variants={{
                closed: { x: "-100%" },
                open: { x: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="w-1/2 h-full bg-premium-pink flex flex-col justify-end p-8"
            >
              <span className="text-white/30 text-[80px] font-grok italic leading-none select-none">
                NAV
              </span>
            </motion.div>

            {/* Right half */}
            <motion.div
              variants={{
                closed: { x: "100%" },
                open: { x: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="w-1/2 h-full bg-background flex flex-col justify-center p-8"
            >
              <ul className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex flex-col"
                    >
                      <span className="text-[8px] font-mono text-premium-pink mb-1">
                        {link.num}
                      </span>
                      <span className="text-2xl font-grok uppercase italic text-foreground group-hover:text-premium-pink transition-colors">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Close X center */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-foreground/10 flex items-center justify-center text-foreground z-10 shadow-xl"
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── CUSTOM CURSOR ── */
function CursorFollower() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });
  const [hoveringLink, setHoveringLink] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const enterLink = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button"))
        setHoveringLink(true);
    };
    const leaveLink = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button"))
        setHoveringLink(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", enterLink);
    window.addEventListener("mouseout", leaveLink);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", enterLink);
      window.removeEventListener("mouseout", leaveLink);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none hidden md:block"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: hoveringLink ? 48 : 32,
            height: hoveringLink ? 48 : 32,
            borderColor: hoveringLink ? "var(--premium-pink)" : "rgba(255,255,255,0.3)",
            backgroundColor: hoveringLink ? "rgba(var(--premium-pink-rgb),0.1)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-full border"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            scale: hoveringLink ? 0 : 1,
            backgroundColor: "var(--premium-pink)",
          }}
          className="w-1.5 h-1.5 rounded-full"
        />
      </motion.div>
    </>
  );
}