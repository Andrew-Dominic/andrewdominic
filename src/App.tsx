import { useState, useEffect, useRef } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AuthorityLayer from "./components/AuthorityLayer";
import CaseStudies from "./components/CaseStudies";
import FounderNarrative from "./components/FounderNarrative";
import ContactFooter from "./components/ContactFooter";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="selection:bg-grit-900 selection:text-white relative cursor-none">
      <CustomCursor />
      <div className="noise-overlay" />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <div key="loader">
            <LoadingScreen onComplete={() => setLoading(false)} />
          </div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SmoothScroll>
              <Navigation />
              <Hero />
              <AuthorityLayer />
              <CaseStudies />
              <FounderNarrative />
              <ContactFooter />
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
