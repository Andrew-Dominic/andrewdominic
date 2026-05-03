import { useRef, useEffect } from "react";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Headline
    const headline = section.querySelector(".contact-headline");
    if (headline) {
      gsap.fromTo(headline,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headline,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Contact box
    const contactBox = section.querySelector(".contact-box");
    if (contactBox) {
      gsap.fromTo(contactBox,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactBox,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Footer
    const footerBar = section.querySelector(".footer-bar");
    if (footerBar) {
      gsap.fromTo(footerBar,
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerBar,
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.vars.trigger;
        if (triggerEl && section.contains(triggerEl as Element)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <footer id="contact" ref={sectionRef} className="bg-white px-6 md:px-16 pt-32 md:pt-48 pb-12 overflow-hidden relative">
      {/* Background watermark — meaningful, aligned with theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.018] select-none">
        <h2 className="text-[25vw] font-poster font-bold leading-none whitespace-nowrap tracking-[-0.05em] uppercase">BUILD</h2>
      </div>
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.012] select-none">
        <h2 className="text-[25vw] font-poster font-bold leading-none whitespace-nowrap tracking-[-0.05em] uppercase">BUILD</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top rule */}
        <div className="hard-rule mb-8" />

        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 md:gap-24 mb-32 md:mb-48">
          {/* LEFT — Statement */}
          <div className="contact-headline flex-1">
            <div className="flex items-center gap-4 mb-8">
              <span className="spec-label text-grit-400">004 // TERMINAL</span>
              <div className="h-px w-16 bg-accent" />
            </div>

            <h2 className="text-6xl md:text-9xl lg:text-[11rem] font-poster font-bold tracking-[-0.05em] leading-[0.82] uppercase mb-14 md:mb-18">
              LET'S<br /><span className="text-accent">BUILD</span><br />SOMETHING<br />REAL.
            </h2>

            <div className="max-w-md">
              <div className="hard-rule-light mb-6" />
              <p className="text-lg md:text-xl font-body text-grit-900 leading-snug tracking-tight mb-2">
                Built for real users.
              </p>
              <p className="text-base md:text-lg font-body text-grit-500 leading-relaxed tracking-tight">
                Open to meaningful work — products, systems, and ideas that actually matter.
              </p>
            </div>
          </div>

          {/* RIGHT — Contact Terminal (sticky) */}
          <div className="contact-box flex-1 w-full lg:max-w-md lg:sticky lg:top-24 self-start">
            <div className="border border-grit-900 bg-grit-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 grit-texture opacity-30 pointer-events-none" />

              {/* Terminal header */}
              <div className="relative z-10 px-6 md:px-8 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <span className="spec-label text-white/20">TRANSMISSION_TERMINAL</span>
                <Globe className="w-3.5 h-3.5 text-white/10" />
              </div>

              <div className="relative z-10 p-6 md:p-8 space-y-8">
                {/* Email — bigger + brighter */}
                <a href="mailto:m.andrewdominic9@gmail.com" className="block group/link py-4 border-b border-white/5">
                  <p className="spec-label text-white/20 mb-2">DIRECT_CHANNEL://</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg md:text-2xl font-poster font-bold tracking-normal text-white group-hover/link:text-accent transition-colors truncate">
                      m.andrewdominic9@gmail.com
                    </span>
                    <ArrowRight className="w-5 h-5 flex-shrink-0 opacity-0 -translate-x-3 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-500 text-accent" />
                  </div>
                </a>

                {/* Links Grid */}
                <div className="grid grid-cols-2 gap-0 border border-white/5">
                  <a href="https://linkedin.com" target="_blank" className="block group/link p-4 border-r border-white/5 hover:bg-white/[0.03] transition-colors">
                    <p className="spec-label text-white/15 mb-2">NET://</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-poster font-bold tracking-[0.15em] uppercase">LINKEDIN</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-all text-accent" />
                    </div>
                  </a>
                  <a href="https://github.com" target="_blank" className="block group/link p-4 hover:bg-white/[0.03] transition-colors">
                    <p className="spec-label text-white/15 mb-2">NET://</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-poster font-bold tracking-[0.15em] uppercase">GITHUB</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-all text-accent" />
                    </div>
                  </a>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-accent text-white font-poster font-bold tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-grit-900 transition-colors duration-300"
                >
                  START A CONVERSATION <ArrowRight className="w-4 h-4" />
                </motion.button>

                {/* Trust signals */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent animate-pulse" />
                    <span className="spec-label text-white/25">RESPONSE_TIME: &lt; 24H</span>
                  </div>
                  <span className="spec-label text-white/25">REAL_WORK_ONLY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="footer-bar">
          <div className="hard-rule mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left — Copyright */}
            <span className="text-[0.55rem] font-header font-bold tracking-[0.3em] uppercase text-grit-900">
              © {currentYear} ANDREW DOMINIC M
            </span>

            {/* Center — Build Ref */}
            <span className="text-[0.55rem] font-header font-bold tracking-[0.3em] uppercase text-grit-300">
              BUILD_REF // V4.3
            </span>

            {/* Right — Status */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-[0.55rem] font-header font-bold tracking-[0.4em] uppercase text-grit-400">
                STATUS: ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
