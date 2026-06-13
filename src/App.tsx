import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { motion, AnimatePresence } from "motion/react";

import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <main className="selection:bg-grit-900 selection:text-white relative cursor-none">
      <CustomCursor />
      <div className="noise-overlay" />
      
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 origin-top"
          >
            <LoadingScreen onComplete={() => setLoading(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full min-h-screen"
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:id" element={<CaseStudy />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
