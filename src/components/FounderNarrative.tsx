import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    let mm = gsap.matchMedia();

    mm.add("all", () => {
      // 1. Cinematic Sticky Narrative Timeline
      const pinWrapper = container.querySelector('.narrative-pin');
      const steps = gsap.utils.toArray('.narrative-step') as HTMLElement[];

      if (pinWrapper && steps.length > 0) {
        // Initial state for physics/blur reveal
        gsap.set(steps, { 
          opacity: 0, 
          y: 40, 
          scale: 0.95, 
          filter: "blur(10px)" 
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top top",
            // Scroll distance: 120vh per step gives plenty of smooth reading time
            end: `+=${steps.length * 120}%`, 
            pin: true,
            scrub: 1, // Smooth scrubbing
          }
        });

        steps.forEach((step, i) => {
          // Fade IN
          tl.to(step, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out"
          });

          // HOLD (reading time)
          tl.to({}, { duration: 2.0 });

          // Fade OUT (unless it's the final narrative step)
          if (i !== steps.length - 1) {
            tl.to(step, {
              opacity: 0,
              y: -40,
              scale: 1.05,
              filter: "blur(10px)",
              duration: 1.5,
              ease: "power2.in"
            });
          }
        });
      }

      // 2. Skills Reveal
      const skillSection = container.querySelector('.skills-section');
      const skillItems = container.querySelectorAll(".skill-item");
      
      if (skillSection && skillItems.length) {
        gsap.fromTo(skillItems,
          { opacity: 0, y: 15 },
          {
            opacity: 1, 
            y: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: skillSection,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="bg-grit-900 text-white relative">
      {/* Grain texture */}
      <div className="absolute inset-0 grit-texture opacity-40 pointer-events-none" />

      {/* ── STICKY NARRATIVE PRESENTATION ── */}
      <div className="narrative-pin h-[100svh] w-full relative overflow-hidden flex items-center justify-center z-10">
        
        {/* Step 1: Headline */}
        <div className="narrative-step absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/25 mb-6 sm:mb-8">
              003 // NARRATIVE
            </span>
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-poster font-bold tracking-[-0.04em] leading-[0.85] uppercase text-white drop-shadow-2xl">
              REAL<br />CONTEXT.
            </h2>
        </div>

        {/* Step 2: Who I am */}
        <div className="narrative-step absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto text-center md:text-left">
            <p className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-body font-light text-white leading-[1.6] sm:leading-[1.5] tracking-tight">
              I'm Andrew Dominic M — a 19-year-old CS and Business Systems student at RIT Chennai, and co-founder of Synflow Studio, a web and AI automation agency based in Chennai.
            </p>
        </div>

        {/* Step 3: What I build */}
        <div className="narrative-step absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto text-center md:text-left">
            <p className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-body font-light text-white leading-[1.6] sm:leading-[1.5] tracking-tight">
              I build systems for real businesses — not demo apps, not clones. I’ve shipped a production e-commerce platform for a 100K audience brand, a live ticketing system for a 3,000+ attendee college fest, and an autonomous drone dashboard for the ISRO challenge.
            </p>
        </div>

        {/* Step 4: Pull Quote */}
        <div className="narrative-step absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 max-w-5xl mx-auto text-center">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/20 block mb-6 sm:mb-8">
              ORIGIN_STORY
            </span>
            <p className="text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl font-poster font-bold leading-[1.1] sm:leading-[1.1] tracking-[-0.02em] uppercase text-white">
              "MY PARENTS RUN A SMALL PROVISION STORE. I SAW FIRSTHAND HOW MUCH BETTER BUSINESSES COULD OPERATE WITH THE RIGHT DIGITAL SYSTEMS."
            </p>
            <div className="mt-8 md:mt-12 flex items-center justify-center gap-3">
              <div className="h-px w-6 md:w-10 bg-white/15" />
              <span className="text-[0.45rem] md:text-[0.5rem] font-header font-bold tracking-[0.3em] text-white/15 uppercase">
                THAT’S STILL WHAT DRIVES ME
              </span>
              <div className="h-px w-6 md:w-10 bg-white/15" />
            </div>
        </div>

        {/* Step 5: Closing */}
        <div className="narrative-step absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto text-center md:text-left">
            <p className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-body font-semibold text-white leading-[1.6] sm:leading-[1.5] tracking-tight">
              When I'm not building, I'm documenting the journey on Instagram and LinkedIn — because I think more students should see what's actually possible when you just start building.
            </p>
        </div>

      </div>

      {/* ── SKILLS SECTION (Normal Scroll) ── */}
      <div className="skills-section px-6 md:px-16 py-20 md:py-32 relative z-10 bg-grit-900 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="mb-12 md:mb-16">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/50 block mb-6">
              SYSTEMS I WORK WITH
            </span>
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-3">
              {skills.building.map(skill => (
                <span key={skill} className="skill-item text-xs sm:text-sm md:text-base font-header font-bold tracking-tight text-white/90 hover:text-white transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-12 md:mb-16">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/50 block mb-6">
              CURRENT FOCUS
            </span>
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-3">
              {skills.learning.map(skill => (
                <span key={skill} className="skill-item text-xs sm:text-sm md:text-base font-header font-semibold tracking-tight text-white/60 hover:text-white transition-colors cursor-default italic">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-12 md:mb-16">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/50 block mb-6">
              TOOLS I USE DAILY
            </span>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {skills.tools.map(skill => (
                <span key={skill} className="skill-item text-[0.55rem] sm:text-[0.6rem] font-header font-bold tracking-[0.2em] uppercase text-white/50 border border-white/20 px-3 py-1.5 hover:border-white/60 hover:text-white transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-white/10 mt-8 md:mt-12" />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/30">
              EDUCATION://
            </span>
            <span className="text-[0.65rem] sm:text-xs font-header font-bold text-white/50 tracking-tight text-center">
              B.Tech CS × Business Systems — RIT Chennai
            </span>
          </div>

        </div>
      </div>
      
    </section>
  );
}
