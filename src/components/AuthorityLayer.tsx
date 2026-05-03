import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  "3+ CLIENT PROJECTS SHIPPED",
  "HACKATHON WINNER",
  "100K+ CONTENT REACH",
  "WORKED WITH INTERNATIONAL CLIENTS",
];

const manifestoLine = "BUILDING REAL SYSTEMS — NOT JUST PROJECTS — LEARNING BY SHIPPING — IMPROVING EVERY ITERATION — ";

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
    <section ref={sectionRef} className="bg-grit-900 overflow-hidden relative border-y border-white/5 select-none">
      <div className="absolute inset-0 grit-texture pointer-events-none opacity-30" />
      
      {/* Row 1 — Stats marquee (left) */}
      <div className="relative overflow-hidden py-5 border-b border-white/5">
        <div className="marquee-track">
          {statsContent.map((stat, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-10 px-6 md:px-10 flex-shrink-0">
              <span className="text-2xl md:text-4xl font-poster font-bold text-white tracking-wider whitespace-nowrap uppercase">
                {stat}
              </span>

            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Manifesto marquee (right, slower) */}
      <div className="relative overflow-hidden py-3 opacity-40">
        <div className="marquee-track-reverse">
          {manifestoContent.map((line, i) => (
            <span key={i} className="text-[0.6rem] md:text-xs font-header font-bold tracking-[0.4em] text-white/60 whitespace-nowrap px-8 flex-shrink-0 uppercase">
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
