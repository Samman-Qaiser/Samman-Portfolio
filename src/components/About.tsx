"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { FloatingDock } from '../components/ui/floating-dock'
import { 
  IconBrandLinkedin, 
  IconBrandGithub, 
  IconMail, 
  IconFileDownload 
} from "@tabler/icons-react";


const AboutSection = () => {
  // Mouse movement for video interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth "floating" effect
  const springConfig = { damping: 40, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Video ko thora sa move karwane ke liye (limit movement to 30px)
  const videoX = useTransform(smoothX, [0, 1000], [-15, 15]);
  const videoY = useTransform(smoothY, [0, 1000], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // FIX: Type defined to prevent ease array error
  const fadeUp: any = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

const dockItems = [
  { 
    title: "LinkedIn", 
    icon: <IconBrandLinkedin className="h-full w-full text-premium-pink" />, 
    href: "https://www.linkedin.com/in/samman-qaiser-39178431a" 
  },
  { 
    title: "GitHub", 
    icon: <IconBrandGithub className="h-full w-full text-premium-pink" />, 
    href: "https://github.com/Samman-Qaiser" 
  },
  { 
    title: "Email", 
    icon: <IconMail className="h-full w-full text-premium-pink" />, 
    href: "mailto:sammansheikh6@gmail.com" 
  },
  { 
    title: "Resume", 
    icon: <IconFileDownload className="h-full w-full text-premium-pink" />, 
    href: "/Samman_Resume.pdf",
    download: "Samman_Qaiser_Resume.pdf" // Ye line download trigger karegi
  },
];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden bg-background">
      
      {/* --- INTERACTIVE VIDEO BLOB LAYER --- */}
      <motion.div 
        style={{ x: videoX, y: videoY }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center scale-110"
      >
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="h-[90vh] object-cover md:object-contain opacity-40 mix-blend-multiply" 
        >
          <source src="/blob.webm" type="video/webm" /> 
        </video> */}
        
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Top Header */}
        <motion.div {...fadeUp} className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-premium-pink font-medium">
            01 / Background
          </span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7">
  
            <motion.h2 
              {...fadeUp}
              className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-primary"
            >
              Turning complex problems into <span className="text-premium-pink">simple, beautiful</span> and intuitive solutions.
            </motion.h2>
            
            <div className="mt-8">
              <FloatingDock 
                items={dockItems} 
                mobileClassName='bg-transparent'
                desktopClassName='bg-transparent border-none'
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 text-primary text-lg leading-relaxed">
            <motion.p {...fadeUp} transition={{ delay: 0.2 }}>
              I am a passionate developer with 4+ years of experience building scalable applications. 
              What started as frontend curiosity evolved into a full-stack mastery of the MERN stack.
            </motion.p>

            <motion.div 
              {...fadeUp} 
              transition={{ delay: 0.3 }}
              className="border-l border-premium-pink pl-6 space-y-4"
            >
              <p className="text-sm uppercase tracking-widest text-premium-pink font-bold mb-2">My Evolution</p>
              <p className="text-base">
                From Shopify and WordPress for e-commerce to deep learning models for image classification—I blend creative design with intelligent automation.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Tech Stack */}
        <motion.div 
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="mt-20 flex flex-wrap gap-x-12 gap-y-4 border-t border-premium-pink/30 pt-8"
        >
          {['MERN Stack', 'Shopify', 'WordPress','AI / ML'].map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-[0.2em] text-primary/90 font-medium">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;