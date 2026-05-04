import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // We only hide navbar if the menu is NOT open
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (menuOpen) return;

    if (latest > lastY && latest > 200) {
      setHidden(true);
    } else if (latest < lastY && latest > 200) {
      setHidden(false);
    } else if (latest <= 200) {
      setHidden(false);
    }
    setLastY(latest);
  });

  const links = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -120 },
        }}
        animate={hidden && !menuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:py-8 flex justify-between items-center mix-blend-difference"
      >
        <div className="flex items-center gap-2">
          <div className="bg-white px-3 md:px-4 py-1">
            <span className="text-xl md:text-2xl font-poster font-bold tracking-tighter text-grit-900">AD.M</span>
          </div>
          <div className="hidden md:block h-px w-12 bg-white/30" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-white/70 transition-colors"
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="w-8 h-8" strokeWidth={1.5} />
        </button>
      </motion.nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-grit-900 text-white flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 grit-texture opacity-30 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-10 h-10" strokeWidth={1} />
            </button>

            {/* Links */}
            <div className="flex flex-col items-center gap-12 relative z-10">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="text-5xl font-poster font-bold tracking-widest uppercase hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Bottom Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-10 flex flex-col items-center gap-2"
            >
              <span className="text-[0.6rem] font-header font-bold tracking-[0.3em] uppercase text-white/30">AD.M // SYSTEM CORE</span>
              <div className="h-px w-10 bg-white/20" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
