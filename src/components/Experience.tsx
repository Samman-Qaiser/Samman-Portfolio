"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaLaptopCode } from "react-icons/fa6";
const experiences = [
  {
    company: "Enfotrix",
    role: "Web Developer",
    duration: "Aug — Sep 2025",
    logo: "/enfotrix.jpg",
  },
  {
    company: "Maaz Informatics",
    role: "Web Developer",
    duration: "Jan — June 2026",
    logo: "/maaz-logo.png",
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    duration: "2024 — Present",
    logo: "/freelance-icon.png", // apna icon lagao ya neeche wala default use karo
    isFreelance: true,
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} id="experience" className="py-20 px-6 md:px-12 lg:px-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10"
          >
            <div className="">
              <span className="text-xs uppercase tracking-[0.3em] text-premium-pink font-medium">
                04 / Experience
              </span>
              <h2 className="text-5xl md:text-8xl font-grok text-primary uppercase italic leading-[0.8]">
                Where <br />
                <span className="text-premium-pink italic">I've Worked</span>
              </h2>
            </div>
          </motion.div>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start pt-24">

          {/* Desktop Line */}
          <motion.div
            style={{ scaleX }}
            className="hidden md:block absolute top-[124px] left-0 w-full h-[2px] bg-foreground/20 origin-left"
          />

          {/* Mobile Line */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="md:hidden absolute left-1/2 top-0 w-[2px] h-full bg-foreground/20 origin-top -translate-x-1/2"
          />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center mb-16 md:mb-0 w-full md:w-1/3"
            >
              {/* Role — logo ke upar */}
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-sm font-medium text-muted-foreground text-center mb-3 md:absolute md:-top-16 md:w-full"
              >
                {exp.role}
              </motion.h3>

              {/* Logo Circle */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1,
                }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-2xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Freelance ke liye custom icon */}
                {exp.isFreelance ? (
                  <div className="flex text-primary flex-col items-center justify-center z-10">
                   <FaLaptopCode size={40} className="text-premium-pink"/>
                  </div>
                ) : (
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain z-10 p-1"
                  />
                )}
              </motion.div>

              {/* Company Name */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.1 }}
                className="mt-4 font-bold tracking-widest text-sm uppercase"
              >
                {exp.company}
              </motion.p>

              {/* Duration */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.15 }}
                className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                {exp.duration}
              </motion.span>

              {/* Freelance badge */}
              {exp.isFreelance && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="mt-2 text-[9px] uppercase tracking-widest text-premium-pink border border-premium-pink/30 px-2 py-0.5 rounded-full"
                >
                  National & International Projects
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}