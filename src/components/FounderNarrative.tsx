import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Scroll-reveal text: words fade from dim → full as you scroll ── */
function RevealText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll(".rw");
    gsap.set(words, { opacity: 0.1 });

    gsap.to(words, {
      opacity: 1,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "bottom 45%",
        scrub: 1,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children.split(" ").map((word, i) => (
        <span key={i} className="rw inline-block mr-[0.3em]">{word}</span>
      ))}
    </div>
  );
}

export default function FounderNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = {
    building: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Redis", "Supabase", "Python", "Flask"],
    learning: ["Docker", "GitHub Actions", "AWS"],
    tools: ["Vercel", "Figma", "Linux", "Git", "Cloudflare"]
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Headline reveal
    const headline = container.querySelector(".narrative-headline");
    if (headline) {
      gsap.fromTo(headline,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headline,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Skill items stagger
    const skillItems = container.querySelectorAll(".skill-item");
    if (skillItems.length) {
      gsap.fromTo(skillItems,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillItems[0]?.parentElement?.parentElement,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }



    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.vars.trigger;
        if (triggerEl && container.contains(triggerEl as Element)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="about" ref={containerRef} className="bg-grit-900 text-white relative overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 grit-texture opacity-40 pointer-events-none" />

      <div className="relative z-10">

        {/* ── Block 1: Headline — Full viewport, single focus ── */}
        <div className="min-h-screen flex items-center px-8 md:px-16">
          <div className="narrative-headline">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/25">003 // NARRATIVE</span>
              <div className="h-px w-16 bg-white/15" />
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-poster font-bold tracking-[-0.04em] leading-[0.85] uppercase text-white">
              REAL<br />CONTEXT.
            </h2>
          </div>
        </div>

        {/* ── Block 2: Who I am — scroll-reveal ── */}
        <div className="min-h-[70vh] flex items-center px-8 md:px-16 py-24">
          <div className="max-w-3xl">
            <RevealText className="text-xl md:text-2xl lg:text-3xl font-body font-light text-white leading-[1.6] tracking-tight">
              I'm Andrew Dominic M — a 19-year-old CS and Business Systems student at RIT Chennai, and co-founder of Synflow Studio, a web and AI automation agency based in Chennai.
            </RevealText>
          </div>
        </div>

        {/* ── Block 3: What I build — scroll-reveal ── */}
        <div className="min-h-[70vh] flex items-center px-8 md:px-16 py-24">
          <div className="max-w-3xl">
            <RevealText className="text-xl md:text-2xl lg:text-3xl font-body font-light text-white leading-[1.6] tracking-tight">
              I build things for real businesses. Not demo apps, not clones. I've shipped a production e-commerce platform for a 100K-audience fashion brand, a live ticketing system for a 3,000+ attendee college fest, and an autonomous drone dashboard for the ISRO challenge.
            </RevealText>
          </div>
        </div>

        {/* ── Block 4: Pull Quote — Full screen, dramatic ── */}
        <div className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24">
          <div className="max-w-4xl text-center">
            <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/20 block mb-10">ORIGIN_STORY</span>
            <RevealText className="text-2xl md:text-4xl lg:text-5xl font-poster font-bold leading-[1.1] tracking-tight uppercase text-white">
              "MY PARENTS RUN A SMALL PROVISION STORE. I SAW FIRSTHAND HOW MUCH BETTER BUSINESSES COULD RUN WITH THE RIGHT DIGITAL TOOLS."
            </RevealText>
            <div className="mt-12 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-white/15" />
              <span className="text-[0.5rem] font-header font-bold tracking-[0.3em] text-white/15 uppercase">THAT'S STILL WHAT DRIVES ME</span>
              <div className="h-px w-10 bg-white/15" />
            </div>
          </div>
        </div>

        {/* ── Block 5: Closing statement — scroll-reveal ── */}
        <div className="min-h-[60vh] flex items-center px-8 md:px-16 py-24">
          <div className="max-w-3xl">
            <RevealText className="text-xl md:text-2xl lg:text-3xl font-body font-semibold text-white leading-[1.6] tracking-tight">
              When I'm not building, I'm documenting the journey on Instagram and LinkedIn — because I think more students should see what's actually possible when you just start building.
            </RevealText>
          </div>
        </div>

        {/* ── Block 6: Skills — Clean, minimal, centered ── */}
        <div className="px-8 md:px-16 py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="h-px w-full bg-white/10 mb-16" />

            <div className="mb-14">
              <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/50 block mb-6">BUILDING WITH</span>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {skills.building.map(skill => (
                  <span key={skill} className="skill-item text-sm md:text-base font-header font-bold tracking-tight text-white/90 hover:text-white transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>

            <div className="mb-14">
              <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/50 block mb-6">CURRENTLY LEARNING</span>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {skills.learning.map(skill => (
                  <span key={skill} className="skill-item text-sm md:text-base font-header font-semibold tracking-tight text-white/60 hover:text-white transition-colors cursor-default italic">{skill}</span>
                ))}
              </div>
            </div>

            <div className="mb-14">
              <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/50 block mb-6">DAILY TOOLS</span>
              <div className="flex flex-wrap justify-center gap-3">
                {skills.tools.map(skill => (
                  <span key={skill} className="skill-item text-[0.6rem] font-header font-bold tracking-[0.2em] uppercase text-white/50 border border-white/20 px-3 py-1.5 hover:border-white/60 hover:text-white transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-white/10 mt-4" />

            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/30">EDUCATION://</span>
              <span className="text-xs font-header font-bold text-white/50 tracking-tight">B.Tech CS × Business Systems — RIT Chennai</span>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
