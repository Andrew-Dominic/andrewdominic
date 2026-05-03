import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show if scrolling up and past hero (e.g., 200px)
    if (latest > lastY && latest > 200) {
      setHidden(true);
    } else if (latest < lastY && latest > 200) {
      setHidden(false);
    } else if (latest <= 200) {
      setHidden(true);
    }
    setLastY(latest);
  });

  const links = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  
  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: -120 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-8 flex justify-between items-center mix-blend-difference"
    >
      <div className="flex items-center gap-2">
        <div className="bg-white px-4 py-1">
          <span className="text-2xl font-poster font-bold tracking-tighter text-grit-900">AD.M</span>
        </div>
        <div className="hidden md:block h-px w-12 bg-white/30" />
      </div>
      
      <div className="flex gap-8">
        {links.map((link) => (
          <a 
            key={link.label} 
            href={link.href}
            className="text-xs font-header font-bold tracking-[0.2em] uppercase text-white hover:text-white/60 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
