"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveHoverButton } from '../Component/ui/interactive-hover-button';

gsap.registerPlugin(ScrollTrigger);

// --- Sub-Component: Floating Input ---
const FloatingInput = ({ label, name, type = "text", required = true }: any) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full mb-10 group">
      <label 
        className={`absolute left-0 transition-all duration-500 pointer-events-none uppercase font-bold
        ${(focused || value) ? "-top-6 text-premium-pink opacity-100" : "top-4 text-primary opacity-60"}`}
      >
        {label}
      </label>
      <input
        required={required}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-zinc-800/50 py-4 text-primary focus:outline-none focus:border-premium-pink/50 transition-all text-base tracking-tight"
      />
    </div>
  );
};

// --- Main Component ---
const ContactReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  const [rotate, setRotate] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Trail state using refs for performance (no re-renders)
  const imageIndex = useRef(0);
  const lastSpawnPos = useRef({ x: -999, y: -999 });
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isInsideSection = useRef(false);

const IMAGE_SOURCES = [
  // Abstract 3D & Colorful
  "/image1.avif",
  "/image2.avif",
  
  // Dark Code & Terminal
  "/image3.avif",

  
  // Dev Setup & Workspace
  "/image4.avif",
  "/image5.avif",
  
  // Keyboard Macro
  "/image6.avif",
  "/image7.avif",
];

  const createTrailImage = (x: number, y: number) => {
    if (!trailRef.current) return;

    const img = document.createElement("img");
    img.src = IMAGE_SOURCES[imageIndex.current % IMAGE_SOURCES.length];
    imageIndex.current++;

    // Use transform for GPU-accelerated positioning (no top/left jitter)
    img.style.cssText = `
      position: absolute;
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 12px;
      pointer-events: none;
      will-change: transform, opacity;
      left: 0;
      top: 0;
      transform: translate(${x - 40}px, ${y - 40}px) scale(0.4) rotate(${Math.random() * 20 - 10}deg);
      opacity: 0;
      z-index: 5;
      box-shadow: 0 20px 40px rgba(0,0,0,0.35);
    `;

    trailRef.current.appendChild(img);

    // Tight, snappy appear
    gsap.to(img, {
      opacity: 1,
      scale: 1,
      rotate: Math.random() * 10 - 5,
      duration: 0.25,
      ease: "back.out(1.4)",
      overwrite: true,
    });

    // Smooth float-away and fade
    gsap.to(img, {
    
      y: "-=60",
      opacity:0,
      scale: 1.1,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      overwrite: false,
      onComplete: () => img.remove(),
    });
  };

  useEffect(() => {
    // Lerp factor — higher = snappier, lower = dreamier silk
    const LERP = 0.12;
    // Minimum distance before a new image spawns (lower = more images, smoother trail)
    const SPAWN_DISTANCE = 45;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Smoothly interpolate toward real mouse position
      smoothPos.current.x = lerp(smoothPos.current.x, mousePos.current.x, LERP);
      smoothPos.current.y = lerp(smoothPos.current.y, mousePos.current.y, LERP);
      

      if (isInsideSection.current) {
        const dx = smoothPos.current.x - lastSpawnPos.current.x;
        const dy = smoothPos.current.y - lastSpawnPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > SPAWN_DISTANCE) {
          createTrailImage(smoothPos.current.x, smoothPos.current.y);
          lastSpawnPos.current = { x: smoothPos.current.x, y: smoothPos.current.y };
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };
const handleMouseMove = (e: MouseEvent) => {
  const deltaX = e.clientX - window.innerWidth / 2;
  const deltaY = e.clientY - window.innerHeight / 2;
  setRotate(Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 180);

  if (!containerRef.current) return;
  const rect = containerRef.current.getBoundingClientRect();
  
  if (e.clientY >= rect.top && e.clientY <= rect.bottom) {

    // ✅ SIRF TAB CHECK KARO JAB FORM ACTUALLY VISIBLE HO
    const maskLayer = containerRef.current.querySelector('.mask-layer') as HTMLElement;
    const currentMaskSize = maskLayer?.style.maskSize || "0%";
    const maskVisible = parseFloat(currentMaskSize) > 20; // 20% se zyada ho tab form visible hai

    if (maskVisible) {
      const maskRect = maskLayer?.getBoundingClientRect();
      if (maskRect &&
          e.clientX >= maskRect.left && e.clientX <= maskRect.right &&
          e.clientY >= maskRect.top && e.clientY <= maskRect.bottom) {
        isInsideSection.current = false;
        return;
      }
    }

    isInsideSection.current = true;
    mousePos.current = {
      x: e.clientX,
      y: e.clientY - rect.top,
    };
  } else {
    isInsideSection.current = false;
  }
};

    // Initialize smoothPos to avoid initial jump
    smoothPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    lastSpawnPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || status !== 'idle') return;
    setStatus('sending');

    emailjs.sendForm('service_2zae35h', 'template_9xnvsp8', formRef.current, '2TKVcBBfXo3-c-gjY')
      .then(() => {
        setTimeout(() => {
          setStatus('sent');
          formRef.current?.reset();
          setTimeout(() => setStatus('idle'), 4000);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setStatus('idle');
      });
  };

  useGSAP(() => {
    gsap.to(".mask-layer", {
      maskSize: "350%",
      ease: "none",
      scrollTrigger: {
        trigger: ".anim-con",
        start: "bottom bottom",
        end: "+=120%",

        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          if (trailRef.current) {
            trailRef.current.style.opacity = (1 - self.progress).toString();
          }
        }
      }
    });
  }, { scope: containerRef });

  return (
    <div id='contact' ref={containerRef} className="relative overflow-hidden cursor-none bg-background">
      
      {/* SECTION-SPECIFIC TRAIL CONTAINER */}
      <div ref={trailRef} className="absolute inset-0 pointer-events-none z-[5] overflow-hidden" />

      <div className="anim-con  w-[90%] rounded-md mx-auto h-screen flex flex-col items-center justify-center relative bg-premium-pink">
        
        {/* EYES */}
        <div className="flex gap-10 mb-12 z-10">
          {[1, 2].map((i) => (
            <div key={i} className="w-[12vw] h-[12vw] bg-white rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <div className="w-2/3 h-2/3 bg-[#111] rounded-full relative overflow-hidden">
                <div 
                  style={{ 
                    position: 'absolute', top: '50%', left: '50%',
                    transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                    width: '100%', height: '40px'
                  }} 
                  className="transition-transform duration-100 ease-out"
                >
                  <div className="w-6 h-6 bg-white rounded-full ml-3 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-[11vw] font-black tracking-tighter leading-[0.8] text-primary text-center uppercase z-10">
          READY TO START<br /><span className='text-background'>THE PROJECT?</span>
        </h1>

        {/* MASK LAYER (FORM REVEAL) */}
        <div 
          className="mask-layer absolute inset-0 bg-background z-20 flex items-center justify-center"
          style={{
            maskImage: "url('/Polygon1.svg')",
            maskRepeat: "no-repeat", maskPosition: "center", maskSize: "0%"
          }}
        >
          <div className="w-full max-w-5xl px-12 py-20">
            <h2 className="lg:text-6xl text-2xl md:text-8xl font-black mb-16 text-primary tracking-tight">
              Let's build <span className="text-premium-pink">impact.</span>
            </h2>
            
            <form ref={formRef} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
              <FloatingInput label="Full Name" name="from_name" />
              <FloatingInput label="Email Address" name="from_email" type="email" />
              
              <div className="col-span-full mt-4">
                 <textarea 
                   required name="message" 
                   placeholder="DESCRIBE YOUR VISION"
                   className="w-full bg-transparent border-b border-zinc-800/50 p-4 text-primary focus:outline-none focus:border-premium-pink h-32 text-base placeholder:text-primary/50 uppercase resize-none transition-all"
                 ></textarea>
              </div>
              
              <div className="col-span-full mt-8 flex justify-center md:justify-start">
                <InteractiveHoverButton 
                  disabled={status !== 'idle'}
                  className={`${status === 'sent' ? "bg-green-600 border-green-600 text-white" : "border-premium-pink text-premium-pink"} transition-all duration-500`}
                >
                  {status === 'idle' ? "Send Inquiry" : status === 'sending' ? "Fueling..." : "Dispatched!"}
                </InteractiveHoverButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
    </div>
  );
};

export default ContactReveal;