"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BoxReveal } from "@/components/magicui/box-reveal";
const ServiceSection = () => {
  const [hovered, setHovered] = useState<number | null>(0);
      const pinkColor = "var(--premium-pink)";

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
    <section id='services' className="pb-8 px-6 md:px-12 lg:px-20 bg-background h-100vh overflow-hidden font-sans">
      {/* --- Header Section --- */}
<div className=" mb-20">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }} // Re-animates every time it comes into view
    transition={{ duration: 0.8 }}
    className="flex  flex-col  md:flex-row md:items-end justify-between gap-10"
  >
    <div className="max-w-3xl w-[50%]">
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

    {/* Main Evolving Text Section */}
<BoxReveal boxColor={pinkColor} duration={1.5} >
  <h2 className="text-lg md:text-xl  lg:text-[21px]  tracking-tight text-primary leading-[1.2] max-w-2xl lg:text-left">
    Evolving with every brief and built for impact, my process spans design, 
    development, and brand strategy—aligning vision with execution to bring 
    clarity and edge to every project.
  </h2>
</BoxReveal>
  </motion.div>
</div>

      {/* --- Accordion Cards --- */}
      <div className="flex flex-col md:flex-row  md:h-[600px] w-full max-w-[1400px] mx-auto gap-3">
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
         {/* Content Container */}
<div className="relative z-20 h-full w-full flex flex-col justify-end p-4 md:p-8">
  <div 
    className={`grid transition-all duration-700 ease-[0.22,1,0.36,1] ${
      hovered === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`}
  >
    <div className="overflow-hidden">
      {/* Pink Box Content */}
      <div className="w-full bg-premium-pink/30 p-6 rounded-xl border border-premium-pink/20">
        <motion.div
          animate={hovered === i ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-white font-bold text-sm tracking-tighter">{service.id}</span>
            <div className="h-[1px] w-12 bg-white/50" />
            <span className="text-white/80 text-[9px] tracking-[0.4em] uppercase">{service.subtitle}</span>
          </div>
          
          <h3 className="text-white text-2xl md:text-4xl font-black tracking-tighter mb-4 leading-none uppercase">
            {service.title}
          </h3>
          
          <p className="text-zinc-100 text-xs md:text-sm max-w-md tracking-wide leading-relaxed opacity-90">
            {service.description}
          </p>
        </motion.div>
      </div>
    </div>
  </div>

  {/* Inactive Title - Yeh hamesha bottom pe rahega jab hover na ho */}
  <AnimatePresence>
    {hovered !== i && (
      <motion.div
        key="inactive-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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