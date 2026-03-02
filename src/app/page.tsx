"use client";
import { useState } from "react";
import Loader from "../../src/components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navigation";
import HeroSection from "../components/HeroSection";
import { MusicToggleButton } from "../components/MusicButton";
import AboutSection from "../components/About";
import ProjectsSection from "../components/Projects";
import CustomCursor from "../components/ui/CustomCursor";
import Services from "../components/Services";
import ContactReveal from "../components/Contact";
import Footer from "../components/Footer";
import SmoothWrapper from "@/components/SmoothWrapper";


export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothWrapper>
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
    </SmoothWrapper>
  );
}