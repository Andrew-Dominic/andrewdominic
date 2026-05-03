import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  "3+ PROJECTS SHIPPED •",
  "HACKATHON WINNER •",
  "100K+ REACH •",
  "INTERNATIONAL CLIENTS •",
];

const manifestoLine = "BUILDING REAL SYSTEMS • LEARNING BY SHIPPING • REAL WORK ONLY • ";

export default function AuthorityLayer() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) trigger.kill();
      });
    };
  }, []);

  // Build repeated content for seamless loop
  const statsContent = [...stats, ...stats, ...stats, ...stats];
  const manifestoContent = [manifestoLine, manifestoLine, manifestoLine, manifestoLine];

  return (
    <section ref={sectionRef} className="bg-grit-900 overflow-hidden relative border-y border-white/5 select-none md:mt-0">
      <div className="absolute inset-0 grit-texture pointer-events-none opacity-30" />
      
      {/* Row 1 — Stats marquee (left) */}
      <div className="relative overflow-hidden py-4 md:py-5 border-b border-white/5">
        <div className="marquee-track">
          {statsContent.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-8 px-4 md:px-8 flex-shrink-0">
              <span className="text-xl md:text-4xl font-poster font-bold text-white tracking-[0.05em] md:tracking-wider whitespace-nowrap uppercase">
                {stat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Manifesto marquee (right, slower) */}
      <div className="relative overflow-hidden py-3 md:py-3">
        <div className="marquee-track-reverse">
          {manifestoContent.map((line, i) => (
            <span key={i} className="text-[0.55rem] md:text-xs font-header font-bold tracking-[0.25em] md:tracking-[0.4em] text-white/20 whitespace-nowrap px-4 md:px-8 flex-shrink-0 uppercase">
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
