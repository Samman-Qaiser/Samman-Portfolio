"use client";
import { useState } from "react";
import Loader from "../../src/components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/src/Navigation";
import HeroSection from "@/src/components/HeroSection";
import { MusicToggleButton } from "@/src/components/MusicButton";
import AboutSection from "@/src/components/About";
import ProjectsSection from "@/src/components/Projects";
import CustomCursor from "@/src/components/ui/CustomCusror";
import Services from "@/src/components/Services";
import ContactReveal from "@/src/components/Cotact";
import Footer from "@/src/components/Footer";
import SkillSection from "@/src/components/Skills";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <AnimatePresence mode="wait">
        {loading ? (
          
          <>
            <Loader key="loader" onComplete={() => setLoading(false)} />
           <CustomCursor />
          </>
        
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
         
        >
         <Navbar />
         <CustomCursor />
         <HeroSection />
             <AboutSection />
             <ProjectsSection />
             {/* <SkillSection /> */}
         <MusicToggleButton />
                  <Services />
         <ContactReveal />
        <Footer />
       
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}