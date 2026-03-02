"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <footer className="w-full bg-background pt-20 pb-10 px-8">
      {/* Top Links Row */}
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4">
        <a href="https://www.linkedin.com/in/samman-qaiser-39178431a" target="_blank" rel="noopener noreferrer" className="hover:text-premium-pink transition-colors">LINKEDIN</a>
        <a href="https://github.com/Samman-Qaiser" target="_blank" rel="noopener noreferrer" className="hover:text-premium-pink transition-colors">GITHUB</a>
      </div>

      

      {/* Info Row */}
      <div className="flex py-5 border-primary border-t border-b flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 gap-6">
        <div>PRIVACY POLICY</div>
        <div className="hover:text-white cursor-pointer transition-colors uppercase">sammansheikh6@gmail.com</div>
        <div className="hidden md:block">ALL RIGHTS RESERVED SAMMAN QAISER {currentYear}©</div>
        <div>SARGODHA, PK {currentTime}</div>
        <div>COOKIE POLICY</div>
      </div>
 
      {/* BIG NAME WITH 6-SIDED 3D CUBE */}
      <div className="mt-16 overflow-hidden">
        <h1 className="text-[11vw] lg:text-[13vw] leading-[0.8] font-black tracking-tighter text-primary flex items-baseline justify-center whitespace-nowrap">
          <span>SAMMAN QAI</span>
          
          {/* 3D PERSPECTIVE CONTAINER */}
<div className="relative px-4 h-[0.8em] w-[0.8em] overflow-hidden flex items-center justify-center">

  {/* VERTICAL LOOP */}
  <motion.div
    className="absolute inset-0 flex flex-col items-center"
    animate={{ y: ["0%", "-100%"] }}
    transition={{
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
      repeat: Infinity,
      repeatDelay: 0, // pause before horizontal starts
    }}
  >
   <span className="text-premium-pink ">S</span>
    <span className="text-premium-pink -bottom-full">S</span>
   
  </motion.div>

  {/* HORIZONTAL LOOP */}
  <motion.div
    className="absolute inset-0 flex items-center"
    animate={{ x: ["0%", "100%"] }}
    transition={{
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
      repeat: Infinity,
      delay: 2, // starts after vertical
      repeatDelay: 2,
    }}
  >



  </motion.div>

</div>
          
          <span className="ml-[-0.5vw]">ER</span>
        </h1>
      </div>

      <div className="md:hidden text-center mt-8 text-[8px] tracking-widest text-zinc-700">
        ALL RIGHTS RESERVED SAMMAN QAISER {currentYear}©
      </div>
    </footer>
  );
};

export default Footer;