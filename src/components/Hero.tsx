import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Dither from "./ui/Dither";

export default function Hero() {
  return (
    <section className="relative h-[100svh] flex flex-col justify-center items-center px-5 sm:px-8 md:px-12 overflow-hidden bg-white text-center">
      {/* Background Dither Effect — reduced opacity on mobile for readability */}
      <div className="absolute inset-0 z-0 opacity-25 sm:opacity-35 lg:opacity-50">
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

      {/* Decorative Images — Desktop only (lg+) */}
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">

        {/* 1. Role Tag — appears first */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-6 sm:mb-5 md:mb-6"
        >
          <div className="h-px w-3 md:w-4 bg-grit-900" />
          <p
            className="font-header text-[0.5rem] md:text-[0.6rem] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-grit-900"
            style={{ textShadow: '0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.7)' }}
          >
            Product-Focused Developer
          </p>
          <div className="h-px w-3 md:w-4 bg-grit-900" />
        </motion.div>

        {/* 2. Headline — stacked on mobile, inline on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile headline — stacked words for maximum impact */}
          <h1 className="block md:hidden relative z-10 text-[15vw] font-poster font-bold leading-[0.9] tracking-[-0.04em] text-grit-900 uppercase mb-8"
            style={{ textShadow: '0 0 12px rgba(255,255,255,1), 0 0 24px rgba(255,255,255,0.8)' }}
          >
            <span className="block">Building</span>
            <span className="block">Systems</span>
            <span className="block whitespace-nowrap">
              That{" "}
              <span className="relative inline-block pb-1">
                Work.
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

          {/* Desktop headline — original two-line layout */}
          <h1 className="hidden md:flex relative z-10 md:text-7xl lg:text-[6.5rem] font-poster font-bold leading-[0.88] tracking-[-0.04em] text-grit-900 mb-4 max-w-3xl mx-auto flex-col items-center uppercase">
            <span className="block whitespace-nowrap">Building systems</span>
            <span className="block whitespace-nowrap">
              that{" "}
              <span className="relative inline-block whitespace-nowrap pb-2">
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
        </motion.div>

        {/* Stars decoration — hidden on mobile, visible on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hidden md:flex mb-8 relative z-0 w-full max-w-xl mx-auto overflow-hidden h-24 items-center justify-center"
        >
          <img
            src="https://i.postimg.cc/K3z3fpGk/image-removebg-preview.png"
            alt="Systems Concept"
            className="w-full max-w-md h-auto scale-[1.2] mix-blend-multiply opacity-70"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* 3. Subtext — appears after headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto mt-0 md:mt-6 mb-8 md:mb-8"
        >
          <p
            className="text-sm sm:text-base md:text-base text-grit-900 leading-[1.7] sm:leading-relaxed font-body font-medium px-2 sm:px-4"
            style={{ textShadow: '0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.7)' }}
          >
            Full-stack developer combining Computer Science and Business to build high-performance digital products.
          </p>
        </motion.div>

        {/* 4. CTA — appears last */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-none sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-4 bg-grit-900 text-white font-body font-black tracking-widest text-xs sm:text-xs uppercase flex items-center justify-center gap-3 transition-colors hover:bg-black"
          >
            View Case Studies <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom bar indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-5 right-5 sm:left-6 sm:right-6 md:left-12 md:right-12 flex justify-center sm:justify-between items-center text-[0.5rem] sm:text-[0.55rem] font-header font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-grit-200"
      >
        <div className="hidden sm:flex items-center gap-3">
          <span>001 / START</span>
          <div className="w-6 h-px bg-grit-200" />
        </div>
        <p>SCROLL TO ENGINE_CORE</p>
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-6 h-px bg-grit-200" />
          <span>PHASE_01</span>
        </div>
      </motion.div>
    </section>
  );
}
