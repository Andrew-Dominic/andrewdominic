import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiNextdotjs, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiRedis, SiSupabase, SiPython, SiFlask, SiDocker, SiGithubactions, SiVercel, SiFigma, SiLinux, SiGit, SiCloudflare } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import andrewImg from "../assets/andrew.jfif";
import pcImg from "../assets/pc.jfif";
import contentImg1 from "../assets/conntent.jfif";
import contentImg2 from "../assets/content 2.jpeg";
import networkingImg from "../assets/networking.jpeg";
import ritcontentImg from "../assets/ritcontent.jpeg";
import FlowingMenu from "./FlowingMenu";
import CountUp from "./CountUp";

gsap.registerPlugin(ScrollTrigger);

/* ── Cinematic Scroll-reveal text: top 1% Framer style blur reveal ── */
function RevealText({ children, className = "", highlightWords = [] }: { children: string; className?: string; highlightWords?: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const words = el.querySelectorAll(".rw");
      
      // Top 1% Framer style: deep blur and low opacity initially
      gsap.set(words, { 
        opacity: 0.1,
        filter: "blur(12px)",
        willChange: "opacity, filter"
      });

      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.05,
        ease: "power2.out", // smooth easing for the scrub interpolation
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "center 45%",
          scrub: 1.5, // 1.5s lag for a buttery smooth cinematic feel
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children.split(" ").map((word, i) => {
        const isHighlighted = highlightWords.some(hw => word.includes(hw));
        return (
          <span 
            key={i} 
            className={`rw inline-block mr-[0.3em] ${isHighlighted ? "font-playfair italic font-normal tracking-normal text-white" : ""}`}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

export default function FounderNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const block4Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img2WrapperRef = useRef<HTMLDivElement>(null);

  const techItems = [
    { 
      link: '#', 
      text: 'SYSTEMS I WORK WITH', 
      logos: [
        { node: <SiNextdotjs />, title: "Next.js" },
        { node: <SiReact />, title: "React" },
        { node: <SiNodedotjs />, title: "Node.js" },
        { node: <SiExpress />, title: "Express" },
        { node: <SiMongodb />, title: "MongoDB" },
        { node: <SiRedis />, title: "Redis" },
        { node: <SiSupabase />, title: "Supabase" },
        { node: <SiPython />, title: "Python" },
        { node: <SiFlask />, title: "Flask" },
      ]
    },
    { 
      link: '#', 
      text: 'CURRENT FOCUS', 
      logos: [
        { node: <SiDocker />, title: "Docker" },
        { node: <SiGithubactions />, title: "GitHub Actions" },
        { node: <FaAws />, title: "AWS" },
      ]
    },
    { 
      link: '#', 
      text: 'TOOLS I USE DAILY', 
      logos: [
        { node: <SiVercel />, title: "Vercel" },
        { node: <SiFigma />, title: "Figma" },
        { node: <SiLinux />, title: "Linux" },
        { node: <SiGit />, title: "Git" },
        { node: <SiCloudflare />, title: "Cloudflare" },
      ]
    }
  ];

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

      // Images reveal synced with text blocks
      if (img1Ref.current) gsap.set(img1Ref.current, { opacity: 0, filter: "blur(12px)", scale: 0.95 });

      if (block2Ref.current && img1Ref.current) {
        gsap.to(img1Ref.current, {
          opacity: 1, filter: "blur(0px)", scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block2Ref.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          }
        });
      }

      if (block3Ref.current && img2WrapperRef.current && img2Ref.current) {
        gsap.set(img2WrapperRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(img2Ref.current, { scale: 1.15 });

        gsap.to(img2WrapperRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: block3Ref.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          }
        });

        gsap.to(img2Ref.current, {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block3Ref.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          }
        });
      }
    });

    // ALL SIZES (Skills section & Content Stack Reveal)
    mm.add("all", () => {
      const skillSection = container.querySelector('.skills-section');
      const skillItems = container.querySelectorAll(".menu__item");

      if (skillSection && skillItems.length) {
        gsap.fromTo(skillItems,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillSection,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Content Stack Image Reveal
      const stackContainer = container.querySelector('.content-stack-container');
      const stackImages = container.querySelectorAll('.content-stack-img');

      if (stackContainer && stackImages.length) {
        // Initial state: hidden via clip-path (bottom pushed up 100%), slightly down and scaled down
        gsap.set(stackImages, { 
          clipPath: "inset(0% 0% 100% 0%)",
          y: 40,
          scale: 0.95
        });

        gsap.to(stackImages, {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          scale: 1,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: stackContainer,
            start: "top 90%",
            end: "center 50%",
            scrub: 1.5,
          }
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="bg-grit-900 text-white relative overflow-clip">
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
              I build systems for real businesses — not demo apps, not clones. I’ve shipped a production e-commerce platform for a <strong className="font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">100K</strong> audience brand, a live ticketing system for a <strong className="font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">3,000+</strong> attendee college fest, and an autonomous drone dashboard for the ISRO challenge.
            </p>
          </div>

          {/* Step 4: Pull Quote */}
          <div className="narrative-step absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 max-w-5xl mx-auto text-center">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/20 block mb-6 sm:mb-8">
              ORIGIN_STORY
            </span>
            <p className="text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl font-helvetica font-bold leading-[1.2] tracking-tight uppercase text-white">
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
          <div className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 text-center relative z-10">
            <div className="narrative-headline flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-white/15" />
                <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/25">003 // NARRATIVE</span>
                <div className="h-px w-12 bg-white/15" />
              </div>
              <h2 className="flex flex-col items-center text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[-0.04em] leading-[0.85] text-white drop-shadow-2xl">
                <span className="relative z-10 font-playfair italic font-normal tracking-normal text-[0.85em] text-white/90 mb-[-0.15em] ml-[-10%]">Real</span>
                <span className="relative z-0 font-helvetica tracking-tighter">Context.</span>
              </h2>
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT FOR BLOCK 2 & 3 */}
          <div className="flex w-full relative z-10">
            
            {/* LEFT COLUMN: Text Blocks */}
            <div className="w-[55%] xl:w-[60%] flex flex-col shrink-0">
              {/* Block 2: Who I am */}
              <div ref={block2Ref} className="min-h-screen flex items-center px-8 md:px-16 py-24">
                <div className="max-w-2xl lg:max-w-3xl">
                  <RevealText 
                    className="text-xl md:text-2xl lg:text-3xl font-helvetica font-normal text-white leading-[1.6] tracking-tight"
                    highlightWords={["co-founder", "of", "Synflow", "Studio,"]}
                  >
                    I'm Andrew Dominic M — a 19-year-old CS and Business Systems student at RIT Chennai, and co-founder of Synflow Studio, a web and AI automation agency based in Chennai.
                  </RevealText>
                </div>
              </div>

              {/* Block 3: What I build */}
              <div ref={block3Ref} className="min-h-screen flex items-center px-8 md:px-16 py-24">
                <div className="max-w-2xl lg:max-w-3xl">
                  <RevealText 
                    className="text-xl md:text-2xl lg:text-3xl font-helvetica font-normal text-white leading-[1.6] tracking-tight"
                    highlightWords={["real", "businesses", "—", "not", "demo", "apps,", "not", "clones."]}
                  >
                    I build systems for real businesses — not demo apps, not clones. I’ve shipped a production e-commerce platform for a 100K audience brand, a live ticketing system for a 3,000+ attendee college fest, and an autonomous drone dashboard for the ISRO challenge.
                  </RevealText>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Image Container */}
            <div className="w-[45%] xl:w-[40%] relative shrink-0 pointer-events-none">
              <div className="sticky top-0 h-screen flex items-center justify-center pr-12 lg:pr-16 xl:pr-24">
                <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Base Image (Andrew) */}
                  <div className="absolute inset-0 w-full h-full">
                    <img ref={img1Ref} src={andrewImg} className="w-full h-full object-cover" alt="Andrew Dominic" />
                  </div>
                  {/* Reveal Image (PC Setup) */}
                  <div ref={img2WrapperRef} className="absolute inset-0 w-full h-full">
                    <img ref={img2Ref} src={pcImg} className="w-full h-full object-cover object-bottom" alt="Work Setup" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Block 4: Pull Quote */}
          <div ref={block4Ref} className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24 relative z-10">
              <div className="max-w-4xl text-center mx-auto">
                <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/20 block mb-10">ORIGIN_STORY</span>
                <RevealText className="text-2xl md:text-4xl lg:text-5xl font-helvetica font-bold leading-[1.2] tracking-tight uppercase text-white">
                  "MY PARENTS RUN A SMALL PROVISION STORE. I SAW FIRSTHAND HOW MUCH BETTER BUSINESSES COULD OPERATE WITH THE RIGHT DIGITAL SYSTEMS."
                </RevealText>
                <div className="mt-12 flex items-center justify-center gap-3">
                  <div className="h-px w-10 bg-white/15" />
                  <span className="text-[0.5rem] font-header font-bold tracking-[0.3em] text-white/15 uppercase">THAT’S STILL WHAT DRIVES ME</span>
                  <div className="h-px w-10 bg-white/15" />
                </div>
              </div>
            </div>

            {/* Block 5: Closing statement & Content Stack */}
            <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-24 gap-12 relative z-10">
              <div className="w-full lg:w-[45%] max-w-2xl shrink-0">
                <RevealText className="text-xl md:text-2xl lg:text-3xl font-body font-semibold text-white leading-[1.6] tracking-tight">
                  When I'm not building, I'm documenting the journey on Instagram and LinkedIn — because I think more students should see what's actually possible when you just start building.
                </RevealText>

                {/* Stats Container */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 mt-10 pt-8 border-t border-white/10">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-5xl md:text-6xl font-helvetica font-bold tracking-tighter text-white flex items-baseline">
                      <CountUp to={100} duration={2} />
                      <span className="text-3xl md:text-4xl ml-1 tracking-tight text-white/80">K+</span>
                    </h3>
                    <p className="text-xs md:text-sm font-header font-semibold tracking-[0.2em] uppercase text-white/50 mt-1">
                      Organic Views
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-5xl md:text-6xl font-helvetica font-bold tracking-tighter text-white flex items-baseline">
                      <CountUp to={100} duration={2} />
                      <span className="text-3xl md:text-4xl ml-1 tracking-tight text-white/80">K+</span>
                    </h3>
                    <p className="text-xs md:text-sm font-header font-semibold tracking-[0.2em] uppercase text-white/50 mt-1">
                      LinkedIn Impressions
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Image Stack */}
              <div className="w-full lg:w-[50%] relative h-[450px] sm:h-[550px] flex items-center justify-center mt-12 lg:mt-0">
                <div className="content-stack-container relative w-full max-w-lg h-full group">
                  <img 
                    src={contentImg1} 
                    className="content-stack-img absolute top-[5%] left-[5%] w-[45%] aspect-[3/4] object-cover border border-white/10 shadow-2xl z-[1] transition-all duration-500 hover:z-[50] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)]" 
                    alt="Content Creation 1" 
                  />
                  <img 
                    src={ritcontentImg} 
                    className="content-stack-img absolute top-0 right-[5%] w-[48%] aspect-[4/5] object-cover border border-white/10 shadow-2xl z-[2] transition-all duration-500 hover:z-[50] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)]" 
                    alt="RIT Content" 
                  />
                  <img 
                    src={contentImg2} 
                    className="content-stack-img absolute bottom-[10%] left-[10%] w-[50%] aspect-square object-cover border border-white/10 shadow-2xl z-[3] transition-all duration-500 hover:z-[50] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)]" 
                    alt="Content Creation 2" 
                  />
                  <img 
                    src={networkingImg} 
                    className="content-stack-img absolute bottom-[5%] right-0 w-[55%] aspect-[4/3] object-cover border border-white/10 shadow-2xl z-[4] transition-all duration-500 hover:z-[50] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)]" 
                    alt="Networking" 
                  />
                </div>
              </div>
            </div>
        </div>


        {/* ── SKILLS SECTION (Normal Scroll, Both Devices) ── */}
        <div className="skills-section relative z-10 bg-grit-900 border-t border-white/5 h-[60vh] md:h-[70vh] flex flex-col justify-between pt-10">
          <div className="w-full h-[40vh] md:h-[50vh] flex items-center justify-center mt-10">
            <FlowingMenu items={techItems} />
          </div>

          <div className="mt-auto pb-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full">
            <span className="text-[0.65rem] sm:text-xs md:text-sm font-header font-bold tracking-[0.35em] uppercase text-white/40">
              EDUCATION://
            </span>
            <span className="text-sm sm:text-base md:text-lg font-header font-bold text-white/60 tracking-tight text-center">
              B.Tech CS × Business Systems — RIT Chennai
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
