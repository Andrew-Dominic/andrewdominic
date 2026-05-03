import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const steps = [
  {
    text: "PLAN",
    image: "https://i.pinimg.com/736x/5f/5a/29/5f5a29fc5937d1b355326d45eaaf05db.jpg",
  },
  {
    text: "BUILD",
    image: "https://i.pinimg.com/736x/8f/5f/a3/8f5fa3d6fac6bc67808e3b1894ad037a.jpg",
  },
  {
    text: "SHIP",
    image: "https://i.pinimg.com/736x/c3/34/63/c33463654cf0f506b76062f9c00a8870.jpg",
  },
  {
    text: "SCALE",
    image: "https://i.pinimg.com/736x/d4/97/06/d49706a3a68294424130d30bb2f85cb0.jpg",
  },
  {
    text: "REPEAT",
    image: "https://i.pinimg.com/736x/2e/48/c0/2e48c07635e421a3f3c966402be027b1.jpg",
  },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === steps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 400); // Sharp, aggressive cut speed

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden p-0 m-0">
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] aspect-square overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={currentStep === steps.length - 1 
              ? { opacity: 0, scale: 2, filter: "brightness(2)" } 
              : { opacity: 0 }
            }
            transition={currentStep === steps.length - 1 
              ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
              : { duration: 0.1 }
            }
            className="absolute inset-0"
          >
            <motion.img
              src={steps[currentStep].image}
              alt={steps[currentStep].text}
              className="w-full h-full object-cover grayscale contrast-[1.4] brightness-105"
            />
            <div className="absolute inset-0 flex items-center justify-center mix-blend-difference pointer-events-none">
              <h1 className="text-white text-7xl md:text-[8rem] font-old-poster font-black tracking-[0.02em] leading-none select-none text-center">
                {steps[currentStep].text}
              </h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none overflow-hidden select-none opacity-[0.03]">
        <h2 className="text-[12vw] font-old-poster font-black leading-none whitespace-nowrap tracking-[0.05em]">ANDREW DOMINIC M</h2>
      </div>

      <div className="absolute bottom-10 left-10 flex flex-col gap-1">
        <p className="font-header text-[0.6rem] font-bold tracking-[0.3em] uppercase text-grit-900/40">INITIALIZING_CORE_SYSTEM</p>
        <p className="font-header text-[0.6rem] font-bold tracking-[0.3em] uppercase text-grit-900/60">"BUILDING SYSTEMS THAT ACTUALLY WORK."</p>
        <p className="font-header text-[0.6rem] font-bold tracking-[0.3em] uppercase text-grit-900/40">ROLE: DIGITAL PRODUCT ARCHITECT</p>
      </div>
      
      <div className="absolute top-10 right-10">
        <p className="font-mono text-[0.6rem] text-grit-900/40">ADM_CORE_V4.0</p>
      </div>
    </div>
  );
}
