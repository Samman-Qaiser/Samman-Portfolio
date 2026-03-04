"use client";
import React, { useState, useMemo } from "react";
import { projects } from "../data/Projects";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = [
  "All",
  "MERN",
  "Shopify",
  "WordPress",
  "ML/AI",
  "React",
  "HTML/CSS",
];

export default function PremiumProjects() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = useMemo(() => {
    return activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <section
      id="projects"
      className="relative py-24 bg-background transition-colors duration-500 overflow-hidden"
    >
      <style>{`
        .project-swiper { 
          width: 100%;
          padding-top: 50px;
          padding-bottom: 100px !important; 
        }
        /* Skiper Style Card Container */
        .project-swiper .swiper-slide { 
          background-position: center;
          background-size: cover;
          width: 320px; 
          height: 450px; /* Vertical / Portrait feel like Skiper */
          filter: grayscale(100%) blur(2px); 
          transition: 0.6s cubic-bezier(0.25, 1, 0.5, 1); 
          border-radius: 10px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .project-swiper .swiper-slide { width: 400px; height: 550px; }
        }
        .project-swiper .swiper-slide-active { 
          filter: grayscale(0%) blur(0px); 
          box-shadow: 0 25px 50px -12px rgba(235, 61, 145, 0.3); /* Premium Pink Shadow */
        }
        .swiper-pagination-bullet { background: var(--primary) !important; opacity: 0.2; }
        .swiper-pagination-bullet-active { 
          background: var(--premium-pink) !important; 
          opacity: 1; 
          width: 25px; 
          border-radius: 4px; 
        }
      `}</style>
      {/* --- HEADER --- */}
      <div className="max-w-7xl px-6 md:px-12 lg:px-20 mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <span className="text-premium-pink text-[10px] tracking-[0.5em] uppercase font-bold italic">
            02 / Artifacts
          </span>
          <h2 className="text-5xl md:text-8xl font-grok text-primary uppercase italic leading-[0.8]">
            Selected <br /> <span className="text-premium-pink">Works</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 md:max-w-md justify-end">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-[9px] uppercase tracking-widest transition-all rounded-full border ${
                activeTab === tab
                  ? "bg-premium-pink text-black border-premium-pink font-bold"
                  : "bg-primary/5 text-primary/60 border-primary/10 hover:border-premium-pink/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* --- INVERTED 3D CAROUSEL --- */}
      <div className="w-[90%] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              speed={7000}
              loop={filteredProjects.length > 3}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              coverflowEffect={{
                rotate: 35, // Inverted effect ke liye rotation zaroori hai
                stretch: 0, // Gap zero rakhein taake focus center pe rahe
                depth: 250, // Depth badhane se side wale cards peeche "invert" nazar ayenge
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              className="project-swiper"
            >
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={project.title + index}>
                  <motion.div
                    layoutId={`card-${project.title}`}
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full h-full cursor-pointer group bg-black"
                  >
                    {/* Project Image */}
                    <img
                      src={project.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={project.title}
                    />

                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-premium-pink text-[10px] uppercase font-bold tracking-widest mb-2">
                        {project.category}
                      </p>
                      <h3 className="text-3xl font-grok text-white uppercase italic leading-none">
                        {project.title}
                      </h3>
                      <div className="mt-4 w-12 h-[1px] bg-premium-pink group-hover:w-full transition-all duration-700" />
                    </div>

                    {/* Minimal Title (Visible when not hovered) */}
                    <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity">
                      <h3 className="text-white/80 text-xl font-grok uppercase italic">
                        {project.title}
                      </h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* --- ACETERNITY EXPANDABLE MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
            />

            <motion.div
              layoutId={`card-${selectedProject.title}`}
              className="relative w-full max-w-6xl bg-background border border-primary/10 rounded-md overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-primary/10 rounded-full text-primary hover:bg-premium-pink transition-all"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden">
                <motion.img
                  src={selectedProject.image}
                  className="w-[90%] h-full object-contain mx-auto"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col justify-center">
                <span className="text-premium-pink text-[10px] uppercase font-bold tracking-[0.5em]">
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl md:text-6xl font-grok text-primary uppercase italic leading-[0.8] mt-4 mb-8">
                  {selectedProject.title}
                </h2>
                <p className="text-primary/60 text-sm leading-relaxed  mb-8">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedProject.technologies.map((t: string) => (
                    <span
                      key={t}
                      className="px-3 py-1 border border-primary/10 bg-primary/5 rounded-full text-[9px] text-primary/80 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6 border-t border-primary/10 pt-8">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-premium-pink text-[10px] uppercase font-bold hover:underline underline-offset-8"
                  >
                    Visit <ExternalLink size={12} />
                  </a>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      className="flex items-center gap-2 text-primary/40 text-[10px] uppercase font-bold hover:text-primary"
                    >
                      Github <Github size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
