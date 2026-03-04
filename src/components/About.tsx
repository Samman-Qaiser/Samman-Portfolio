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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

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

  return (
    <section className="relative py-14 px-6 md:px-12 lg:px-20 overflow-hidden bg-background">
      
      <motion.div style={{ x: videoX, y: videoY }} className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center scale-110">
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- 1. BOX REVEAL HEADER --- */}
        <div className="relative overflow-hidden w-fit mb-12">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0 bg-premium-pink z-20"
          />
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-premium-pink font-medium block"
          >
            01 / Background
          </motion.span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            
            {/* --- 2. HEADLINE WITH COLORED SPAN --- */}
            <motion.h2 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-primary flex flex-wrap">
              {["Turning", "complex", "problems", "into"].map((word, i) => (
                <span key={i} className="mr-3 overflow-hidden inline-block">
                  <motion.span 
                    className="inline-block"
                    initial={{ y: "100%" }} 
                    whileInView={{ y: 0 }} 
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                  >{word}</motion.span>
                </span>
              ))}
              
              <span className="text-premium-pink mr-3 overflow-hidden inline-block">
                <motion.span 
                   className="inline-block"
                   initial={{ y: "100%" }} 
                   whileInView={{ y: 0 }} 
                   transition={{ delay: 0.5, duration: 0.8 }}
                >simple, beautiful</motion.span>
              </span>

              {["and", "intuitive", "solutions."].map((word, i) => (
                <span key={i} className="mr-3 overflow-hidden inline-block">
                  <motion.span 
                    className="inline-block"
                    initial={{ y: "100%" }} 
                    whileInView={{ y: 0 }} 
                    transition={{ delay: 0.6 + (i * 0.1), duration: 0.8 }}
                  >{word}</motion.span>
                </span>
              ))}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8"
            >
              <FloatingDock 
                items={[
                  { title: "LinkedIn", icon: <IconBrandLinkedin className="h-full w-full text-premium-pink" />, href: "https://www.linkedin.com/in/samman-qaiser-39178431a" },
                  { title: "GitHub", icon: <IconBrandGithub className="h-full w-full text-premium-pink" />, href: "https://github.com/Samman-Qaiser" },
                  { title: "Email", icon: <IconMail className="h-full w-full text-premium-pink" />, href: "mailto:sammansheikh6@gmail.com" },
                  { title: "Resume", icon: <IconFileDownload className="h-full w-full text-premium-pink" />, href: "/Samman_Resume.pdf" },
                ]} 
                mobileClassName='bg-transparent border-none'
                
                desktopClassName='bg-transparent border-none'
              />
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-8 text-primary text-lg leading-relaxed">
            
            {/* --- 3. PASSIONATE DEVELOPER REVEAL --- */}
            <div className="relative overflow-hidden">
               <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                I am a passionate <span className='font-bold text-premium-pink'>Software Engineer</span> and  developer with 4+ years of experience building scalable applications. 
                What started as frontend curiosity evolved into a full-stack mastery of the MERN stack.
              </motion.p>
            </div>

            {/* --- 4. MY EVOLUTION BOX REVEAL --- */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              
              transition={{ delay: 1, duration: 2 }}
              className="relative border-l border-premium-pink pl-6 space-y-4"
            >
              {/* Box Slide for the Sidebar */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1, delay: 1.1, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-[2px] bg-premium-pink origin-top"
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="text-sm uppercase tracking-widest text-premium-pink font-bold mb-2"
              >
                My Evolution
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-base"
              >
                From Shopify and WordPress for e-commerce to deep learning models for image classification—I blend creative design with intelligent automation.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* --- 5. STAGGERED TECH STACK --- */}
        <div className="mt-20 flex flex-wrap gap-x-12 gap-y-4 border-t border-premium-pink/30 pt-8">
          {['MERN Stack', 'Shopify', 'WordPress','AI / ML'].map((tech, i) => (
            <motion.span 
              key={tech}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + (i * 0.1), type: "spring", stiffness: 100 }}
              className="text-[10px] uppercase tracking-[0.2em] text-primary/90 font-medium"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;