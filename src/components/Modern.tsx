"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// DESKTOP — original animated section
// ─────────────────────────────────────────────


const DesktopTechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const techWordRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !videoContainerRef.current || !techWordRef.current) return;

    const letters = containerRef.current.querySelectorAll('.letter');
    const wordWrappers = containerRef.current.querySelectorAll('.word-wrapper');

    // 1. Initial Positioning (Calculating exactly where TECH ends)
    const techRect = techWordRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Video starts exactly at the end of TECH word
    const initialLeft = techRect.right - containerRect.left + 80; 
    const initialTop = techRect.top - containerRect.top + (techRect.height / 2);

    gsap.set(videoContainerRef.current, {
      left: initialLeft,
      top: initialTop,
      opacity: 1, // Pehle se visible
      scale: 1,
    });

    // --- MAIN TIMELINE ---
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", 
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // A. Alternate Letter Translation (Smooth scroll movement)
    mainTl.to(letters, {
      y: (i) => (i % 2 === 0 ? -120 : 120), 
      duration: 1,
      ease: "power2.inOut",
    }, 0);

    // B. Video Scaling (Moving from layout position to full screen)
    mainTl.to(videoContainerRef.current, {
      left: "50%",
      top: "50%",
      width: "90vw",
      height: "95vh",
      borderRadius: "12px",
      duration: 2,
      marginLeft:"0",
      ease: "expo.inOut"
    }, 0.1); 

    // C. Content Fade Out (High-end agency style)
    mainTl.to(wordWrappers, {
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
      duration: 1.5,
      stagger: 0.1
    }, 0.3);

  }, { scope: containerRef });

  const words = ["Modern", "Tech", "Stack"];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background z-10"
    >
      {/* Scaling Video Container */}
      <div 
        ref={videoContainerRef}
        className="absolute w-[220px] h-[130px] overflow-hidden rounded-md z-20 
             -translate-x-[30%]   translate-y-1/2   lg:-translate-x-1/2 ml-10   lg:-translate-y-1/2 shadow-2xl border border-white/5"
      >
        <video 
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
          src="/video.mp4" 
        />
        <div className="absolute inset-0 bg-premium-pink/5 mix-blend-overlay" />
      </div>

      {/* Typography */}
      <div className="relative z-10 text-center flex flex-col items-center">
        {words.map((word, wIdx) => (
          <div 
            key={wIdx} 
            ref={word === "Tech" ? techWordRef : null}
            // "Tech" word ke row mein margin-right add kiya taake video ki jagah banay
            className={`word-wrapper flex items-center leading-[0.8] ${word === "Tech" ? "mr-[180px]" : ""}`}
          >
            {word.split("").map((char, cIdx) => (
              <span 
                key={cIdx} 
                className="letter inline-block text-[15vw] font-black uppercase text-primary tracking-tighter"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Footer Details */}
      <div className="absolute bottom-12 w-full px-12 flex justify-between items-end opacity-30">
        <div className="flex items-center gap-4 text-primary">
          <div className="w-8 h-[1px] bg-premium-pink" />
          <p className="font-mono text-[10px] uppercase tracking-[0.4em]">Full-Stack Excellence</p>
        </div>
  
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// MOBILE — static: text upar, video neeche center
// ─────────────────────────────────────────────
const MobileTechStack: React.FC = () => {
  const words = ["Modern", "Tech", "Stack"];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-background px-6 py-16 gap-8">
      {/* Text block */}
      <div className="flex flex-col items-center leading-[0.85]">
        {words.map((word, wIdx) => (
          <div key={wIdx} className="flex items-center">
            {word.split("").map((char, cIdx) => (
              <span
                key={cIdx}
                className="inline-block text-[18vw] font-black uppercase text-primary tracking-tighter"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Video — centered, fixed size */}
      <div className="w-full max-w-[320px] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 mx-auto">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="/video.mp4" />
        <div className="absolute inset-0 bg-premium-pink/5 mix-blend-overlay" />
      </div>

      {/* Footer label */}
      <div className="absolute bottom-8 left-6 flex items-center gap-3 opacity-30">
        <div className="w-6 h-[1px] bg-premium-pink" />
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary">Full-Stack Excellence</p>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// MAIN EXPORT — renders correct version per screen
// ─────────────────────────────────────────────
const TechStackSection: React.FC = () => {
  return (
    <>
      {/* Mobile only */}
      <div className="block md:hidden">
        <MobileTechStack />
      </div>

      {/* Desktop only */}
      <div className="hidden md:block">
        <DesktopTechStack />
      </div>
    </>
  );
};

export default TechStackSection;