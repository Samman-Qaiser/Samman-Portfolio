"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ServiceSection = () => {
  const [hovered, setHovered] = useState<number | null>(0);

const services = [
  { 
    id: '01', 
    title: 'FULL-STACK ARCHITECTURE', 
    subtitle: 'MERN STACK MASTERY',
    description: 'Building scalable, high-performance web applications from the ground up with 2+ years of expertise.',
    img: '/mern.jpg' 
  },
  { 
    id: '02', 
    title: 'E-COMMERCE ECOSYSTEMS', 
    subtitle: 'SHOPIFY & WORDPRESS',
    description: 'Crafting dynamic, conversion-driven stores that blend seamless design with powerful functionality.',
    img: '/shopify.jpg' 
  },
  { 
    id: '03', 
    title: 'INTELLIGENT AUTOMATION', 
    subtitle: 'AI & DEEP LEARNING',
    description: 'Training sophisticated image classification models to merge creativity with machine intelligence.',
    img: '/AI.jpg' 
  },

  // Shopify Character
  { 
    id: '04', 
    title: 'REVENUE-DRIVEN STORES', 
    subtitle: 'SHOPIFY DEVELOPMENT',
    description: 'Designing high-converting Shopify experiences focused on performance, scalability, and measurable growth.',
    img: '/shopifygirl.jpg' 
  },

  // WordPress Character
  { 
    id: '05', 
    title: 'DYNAMIC CONTENT SYSTEMS', 
    subtitle: 'WORDPRESS DEVELOPMENT',
    description: 'Building flexible, SEO-optimized WordPress platforms tailored for brands, businesses, and creators.',
    img: '/wordpress.jpg' 
  },

  // Custom Web Development Character
  { 
    id: '06', 
    title: 'CUSTOM WEB SOLUTIONS', 
    subtitle: 'BESPOKE DEVELOPMENT',
    description: 'Engineering fully customized, performance-first web solutions designed for long-term scalability and control.',
    img: '/customweb.jpg' 
  },
];

  return (
    <section id='services' className="py-24 bg-background h-100vh overflow-hidden font-sans">
      {/* --- Header Section --- */}
      <div className="px-6 md:px-12 lg:px-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10"
        >
          <div className="max-w-3xl">
               <span className="text-xs uppercase tracking-[0.3em] text-premium-pink font-medium">
            03 / Services
          </span>
        
            <h2 className="text-5xl md:text-8xl font-grok text-primary uppercase italic leading-[0.8]">
              HOW <br />
              <span className="text-premium-pink italic">
                I CAN HELP
              </span>
            </h2>
          </div>
          
          <div className="md:text-right">
            <p className="text-zinc-500 max-w-[280px] text-[10px] leading-loose uppercase tracking-[0.3em] border-l-2 md:border-l-0 md:border-r-2 border-premium-pink pl-4 md:pr-4">
              I blend creative design with intelligent automation for scalable solutions.
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- Accordion Cards --- */}
      <div className="flex flex-col md:flex-row  md:h-[600px] w-full max-w-[1400px] mx-auto gap-3 px-6">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            className="group relative overflow-hidden rounded-md cursor-pointer"
            animate={{ 
              flex: hovered === i ? 4 : 1, // Increased ratio for more space
            }}
            onMouseEnter={() => setHovered(i)}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background Image with better filtering */}
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${service.img})` }}
              animate={{ 
                scale: hovered === i ? 1.05 : 1.2,
                filter: hovered === i ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.4)"
              }}
              transition={{ duration: 1 }}
            />
            
            {/* Border Glow Effect */}
            <div className={`absolute inset-0 border border-white/10 rounded-[30px] z-20 transition-opacity duration-500 ${hovered === i ? 'opacity-100' : 'opacity-0'}`} />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            {/* Content Container */}
            <div className="relative z-20 h-full w-full flex flex-col justify-end p-6 md:p-10">
              <AnimatePresence mode="popLayout">
                {hovered === i ? (
                  <motion.div
                    key="active-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="w-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-premium-pink font-bold text-sm tracking-tighter">{service.id}</span>
                        <div className="h-[1px] w-12 bg-premium-pink/50" />
                        <span className="text-white/60 text-[9px] tracking-[0.4em] uppercase">{service.subtitle}</span>
                    </div>
                    <h3 className="text-white text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">
                      {service.title}
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm max-w-md tracking-wide leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="inactive-title"
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <p className="text-white/30 font-black tracking-[0.5em] uppercase rotate-90 whitespace-nowrap text-[10px] group-hover:text-premium-pink transition-colors">
                      {service.title}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;