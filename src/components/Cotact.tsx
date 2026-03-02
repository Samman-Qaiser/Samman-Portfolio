"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveHoverButton } from '../../components/ui/interactive-hover-button';

gsap.registerPlugin(ScrollTrigger);

const FloatingInput = ({ label, name, type = "text", required = true }: any) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full mb-10 group">
      <label 
        className={`absolute left-0 transition-all duration-500 pointer-events-none uppercase tracking-[0.4em] text-[9px] font-bold
        ${(focused || value) ? "-top-6 text-premium-pink opacity-100" : "top-4 text-primary "}`}
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

const ContactReveal = () => {
  const containerRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [rotate, setRotate] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - window.innerWidth / 2;
      const deltaY = e.clientY - window.innerHeight / 2;
      setRotate(Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 180);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      }, 2500);
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
        start: "top top",
        end: "+=120%",
        scrub: 1,
        pin: true,
      }
    });
  }, { scope: containerRef });

  return (
    <div id='contact' ref={containerRef} className="relative  overflow-hidden">
      

      {/* <div className="absolute inset-0 pointer-events-none z-[50] overflow-hidden"> 
        <AnimatePresence>
          {status === 'sending' && (
            <motion.div
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ 
                offsetDistance: ["0%", "100%"], 
                opacity: [0, 1, 1, 1, 0] 
              }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              className="absolute text-premium-pink drop-shadow-[0_0_20px_rgba(255,51,102,0.8)]"
              style={{
                // Enhanced Infinity Loop Path
                offsetPath: `path("M -100,500 C -100,0 400,0 500,500 C 600,1000 1100,1000 1100,500 C 1100,0 600,0 500,500 C 400,1000 -100,1000 -100,500")`,
                width: "40px", height: "40px"
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rotate-[90deg]">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}

      <div className="anim-con w-full h-screen flex flex-col items-center justify-center relative bg-background">
        
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

        <h1 className="text-[11vw] font-black tracking-tighter leading-[0.8] text-primary text-center uppercase">
          READY TO START<br /><span className='text-premium-pink'>THE PROJECT?</span>
        </h1>

        {/* MASK LAYER */}
        <div 
          className="mask-layer absolute inset-0 bg-background z-20 flex items-center justify-center"
          style={{
            maskImage: "url('/Polygon1.svg')",
            maskRepeat: "no-repeat", maskPosition: "center", maskSize: "0%"
          }}
        >
          <div className="w-full max-w-5xl px-12 py-20">
            <h2 className="text-6xl md:text-8xl font-black mb-16 text-primary tracking-tight">
              Let's build <span className="text-premium-pink">impact.</span>
            </h2>
            
            <form ref={formRef} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
              <FloatingInput label="Full Name" name="from_name"  />
              <FloatingInput label="Email Address" name="from_email" type="email" />
              
              <div className="col-span-full mt-4">
                 <textarea 
                   required name="message" 
                   placeholder="DESCRIBE YOUR VISION"
                   className="w-full bg-transparent border-b border-zinc-800/50 p-4 text-primary focus:outline-none focus:border-premium-pink h-32 text-base placeholder:text-primary placeholder:text-[10px] placeholder:tracking-[0.5em] uppercase resize-none transition-all"
                 ></textarea>
              </div>
              
              <div className="col-span-full mt-5 flex justify-center md:justify-start">
                <div className="relative">
                  {/* Button wrapped in a div to control submit action precisely if needed */}
                  <InteractiveHoverButton 
                  
                    disabled={status !== 'idle'}
                    className={`${status === 'sent' ? "bg-green-600 border-green-600 text-white" : ""} transition-colors duration-500 border-premium-pink`}
                  >{status === 'idle' ? "Send Inquiry" : status === 'sending' ? "Fueling..." : "Dispatched!"}</InteractiveHoverButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactReveal;