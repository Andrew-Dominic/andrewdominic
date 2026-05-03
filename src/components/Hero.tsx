import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Dither from "./ui/Dither";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-12 overflow-hidden bg-white text-center">
      {/* Background Dither Effect */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Dither
          waveColor={[0.8, 0.8, 0.8]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={3}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.12}
        />
      </div>
      {/* Background large text */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none overflow-hidden select-none opacity-[0.01]">
        <h1 className="text-[30vw] font-poster font-bold leading-none whitespace-nowrap tracking-[-0.05em] text-grit-900 uppercase">ANDREW</h1>
      </div>

      {/* Decorative Image Placeholders — HIDDEN on mobile, visible on larger screens */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden lg:block">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-[8%] left-[2%] w-44 xl:w-48 h-56 xl:h-64 border border-grit-900/20 bg-grit-200/10 shadow-2xl"
        >
          <img src="https://i.pinimg.com/736x/85/24/f2/8524f26e3073e7b465b94f27ef4fe2fb.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute top-[12%] right-[2%] w-64 xl:w-80 h-40 xl:h-48 border border-grit-900/20 bg-grit-200/10 shadow-2xl"
        >
          <img src="https://i.pinimg.com/1200x/98/79/ae/9879aeda3f03cfbbdcb9640593042388.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-[8%] left-[2%] w-52 xl:w-64 h-52 xl:h-64 border border-grit-900/20 bg-grit-200/10 shadow-2xl"
        >
          <img src="https://i.pinimg.com/736x/e5/bf/1a/e5bf1a1320e99a31ac349ba282e49c38.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute bottom-[5%] right-[8%] w-36 xl:w-44 h-52 xl:h-60 border border-grit-900/20 bg-grit-200/10 shadow-2xl"
        >
          <img src="https://i.pinimg.com/736x/2d/18/97/2d1897a23de74966649f5f3201ae70fd.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
      </div>

      {/* Mobile decorative images — small, subtle, non-intrusive */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 lg:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-[6%] left-[4%] w-16 h-20 sm:w-20 sm:h-24 border border-grit-900/10 shadow-lg"
        >
          <img src="https://i.pinimg.com/736x/85/24/f2/8524f26e3073e7b465b94f27ef4fe2fb.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute top-[5%] right-[4%] w-20 h-14 sm:w-24 sm:h-16 border border-grit-900/10 shadow-lg"
        >
          <img src="https://i.pinimg.com/1200x/98/79/ae/9879aeda3f03cfbbdcb9640593042388.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-[14%] left-[3%] w-14 h-14 sm:w-18 sm:h-18 border border-grit-900/10 shadow-lg"
        >
          <img src="https://i.pinimg.com/736x/e5/bf/1a/e5bf1a1320e99a31ac349ba282e49c38.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute bottom-[16%] right-[4%] w-14 h-18 sm:w-16 sm:h-20 border border-grit-900/10 shadow-lg"
        >
          <img src="https://i.pinimg.com/736x/2d/18/97/2d1897a23de74966649f5f3201ae70fd.jpg" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center py-20 sm:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="h-px w-2 md:w-4 bg-grit-900" />
            <p 
              className="font-header text-[0.45rem] sm:text-[0.5rem] md:text-[0.6rem] font-bold tracking-[0.25em] sm:tracking-[0.4em] uppercase text-grit-900"
              style={{ textShadow: '0 0 8px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.6)' }}
            >
              ANDREW DOMINIC M — Product-Focused Developer
            </p>
            <div className="h-px w-2 md:w-4 bg-grit-900" />
          </div>

          <h1 className="relative z-10 text-[2.2rem] sm:text-5xl md:text-7xl lg:text-[6.5rem] font-poster font-bold leading-[0.88] tracking-[-0.04em] text-grit-900 mb-2 md:mb-3 max-w-3xl mx-auto flex flex-col items-center uppercase">
            <span className="block whitespace-nowrap">Building systems</span>
            <span className="block whitespace-nowrap">
              that actually{" "}
              <span className="relative inline-block whitespace-nowrap pb-1 md:pb-2">
                work.
                <svg 
                  className="absolute -inset-x-2 -inset-y-0.5 w-[calc(100%+16px)] h-[calc(100%+12px)] pointer-events-none" 
                  viewBox="0 0 120 45" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M110 8.5C95 5.5 45 4.5 15 12.5C-5 18.5 2 34.5 25 39.5C55 44.5 105 40.5 115 28.5C122 18.5 95 10.5 75 9.5"
                    stroke="#da2727"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M105 12.5C90 9.5 50 8.5 20 16.5C0 22.5 7 38.5 30 43.5C60 48.5 110 44.5 120 32.5C127 22.5 100 14.5 80 13.5"
                    stroke="#da2727"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }}
                  />
                </svg>
              </span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mb-3 sm:mb-4 md:mb-8 relative z-0 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto overflow-hidden h-10 sm:h-14 md:h-24 flex items-center justify-center"
          >
            <img 
              src="https://i.postimg.cc/K3z3fpGk/image-removebg-preview.png" 
              alt="Systems Concept" 
              className="w-full max-w-md h-auto scale-[1.2] mix-blend-multiply opacity-70"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="max-w-2xl mx-auto mt-2 sm:mt-4 md:mt-8">
            <p 
              className="text-[0.7rem] sm:text-xs md:text-base text-grit-900 leading-relaxed font-body font-medium mb-4 md:mb-6 max-w-xl mx-auto px-2 sm:px-4"
              style={{ textShadow: '0 0 8px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.6)' }}
            >
              Full-stack developer combining Computer Science and Business to build high-performance digital products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-grit-900 text-white font-body font-black tracking-widest text-[0.6rem] sm:text-xs uppercase flex items-center justify-center gap-3 transition-colors hover:bg-black"
              >
                View Case Studies <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-5 right-5 sm:left-6 sm:right-6 md:left-12 md:right-12 flex justify-between items-center text-[0.5rem] sm:text-[0.55rem] font-header font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-grit-200"
      >
        <div className="hidden sm:flex items-center gap-3">
          <span>001 / START</span>
          <div className="w-6 h-px bg-grit-200" />
        </div>
        <p className="text-center w-full sm:w-auto">SCROLL TO ENGINE_CORE</p>
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-6 h-px bg-grit-200" />
          <span>PHASE_01</span>
        </div>
      </motion.div>
    </section>
  );
}
