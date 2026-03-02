"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
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

  if (!mounted) return null;

  return (
    <nav className="fixed h-[10vh] top-0 left-0 w-full z-100 flex items-center justify-between px-4 md:px-12 py-5">
      {/* --- LEFT: LOGO --- */}
      <div className="relative w-[200px] h-[60px]">
        <img
          src={isDark ? "/logodark.png" : "/logolight.png"}
          alt="Logo"
          width={200}
          className="absolute -left-20 top-12 -translate-y-1/2 transition-opacity duration-500"
        />
      </div>

      {/* --- RIGHT: DESKTOP MENU --- */}
      <div className="flex items-center gap-6 md:gap-10">
        <ul className="hidden md:flex items-center gap-8 font-monaco text-[11px] uppercase tracking-[0.3em]">
          {navLinks.map((link) => (
            <NavLink key={link.name} name={link.name} href={link.href} />
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <AnimatedThemeToggler />

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-background backdrop-blur-2xl md:hidden flex flex-col items-center justify-center z-[-1]"
          >
            <ul className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-grok text-3xl uppercase text-premium-pink hover:text-premium-pink transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- SUB-COMPONENT: Modern Link Animation ---
function NavLink({ name, href }: { name: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden cursor-pointer"
    >
      <motion.div
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95] }}
        className="flex flex-col"
      >
        <span className="block">{name}</span>
        <span className="absolute top-full block text-premium-pink">{name}</span>
      </motion.div>
    </Link>
  );
}