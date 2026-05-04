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

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
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
    });

    return () => mm.revert();
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

    let mm = gsap.matchMedia();

    // MOBILE ANIMATIONS (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      // Cinematic Sticky Narrative Timeline
      const pinWrapper = container.querySelector('.narrative-pin');
      const steps = gsap.utils.toArray('.narrative-step') as HTMLElement[];

      if (pinWrapper && steps.length > 0) {
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
            end: `+=${steps.length * 120}%`, 
            pin: true,
            scrub: 1,
          }
        });

        steps.forEach((step, i) => {
          tl.to(step, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out"
          });

          tl.to({}, { duration: 2.0 });

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
    });

    // DESKTOP ANIMATIONS (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
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
    });

    // ALL SIZES (Skills section)
    mm.add("all", () => {
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
    <section id="about" ref={containerRef} className="bg-grit-900 text-white relative overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 grit-texture opacity-40 pointer-events-none" />

      <div className="relative z-10">

        {/* ── MOBILE: STICKY NARRATIVE PRESENTATION ── */}
        <div className="md:hidden narrative-pin h-[100svh] w-full relative overflow-hidden flex items-center justify-center">
          
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

        {/* ── DESKTOP: OLD NARRATIVE SECTION ── */}
        <div className="hidden md:block">
          {/* Block 1: Headline */}
          <div className="min-h-screen flex items-center px-8 md:px-16">
            <div className="narrative-headline">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/25">003 // NARRATIVE</span>
                <div className="h-px w-16 bg-white/15" />
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-poster font-bold tracking-[-0.04em] leading-[0.85] uppercase text-white drop-shadow-2xl">
                REAL<br />CONTEXT.
              </h2>
            </div>
          </div>

          {/* Block 2: Who I am */}
          <div className="min-h-[70vh] flex items-center px-8 md:px-16 py-24">
            <div className="max-w-3xl">
              <RevealText className="text-xl md:text-2xl lg:text-3xl font-body font-light text-white leading-[1.6] tracking-tight">
                I'm Andrew Dominic M — a 19-year-old CS and Business Systems student at RIT Chennai, and co-founder of Synflow Studio, a web and AI automation agency based in Chennai.
              </RevealText>
            </div>
          </div>

          {/* Block 3: What I build */}
          <div className="min-h-[70vh] flex items-center px-8 md:px-16 py-24">
            <div className="max-w-3xl">
              <RevealText className="text-xl md:text-2xl lg:text-3xl font-body font-light text-white leading-[1.6] tracking-tight">
                I build systems for real businesses — not demo apps, not clones. I’ve shipped a production e-commerce platform for a 100K audience brand, a live ticketing system for a 3,000+ attendee college fest, and an autonomous drone dashboard for the ISRO challenge.
              </RevealText>
            </div>
          </div>

          {/* Block 4: Pull Quote */}
          <div className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24">
            <div className="max-w-4xl text-center">
              <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/20 block mb-10">ORIGIN_STORY</span>
              <RevealText className="text-2xl md:text-4xl lg:text-5xl font-poster font-bold leading-[1.1] tracking-tight uppercase text-white">
                "MY PARENTS RUN A SMALL PROVISION STORE. I SAW FIRSTHAND HOW MUCH BETTER BUSINESSES COULD OPERATE WITH THE RIGHT DIGITAL SYSTEMS."
              </RevealText>
              <div className="mt-12 flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-white/15" />
                <span className="text-[0.5rem] font-header font-bold tracking-[0.3em] text-white/15 uppercase">THAT’S STILL WHAT DRIVES ME</span>
                <div className="h-px w-10 bg-white/15" />
              </div>
            </div>
          </div>

          {/* Block 5: Closing statement */}
          <div className="min-h-[60vh] flex items-center px-8 md:px-16 py-24">
            <div className="max-w-3xl">
              <RevealText className="text-xl md:text-2xl lg:text-3xl font-body font-semibold text-white leading-[1.6] tracking-tight">
                When I'm not building, I'm documenting the journey on Instagram and LinkedIn — because I think more students should see what's actually possible when you just start building.
              </RevealText>
            </div>
          </div>
        </div>

        {/* ── SKILLS SECTION (Normal Scroll, Both Devices) ── */}
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
        
      </div>
    </section>
  );
}
