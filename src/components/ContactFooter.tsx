import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactAbstract1 from "../assets/contact_abstract_1.png";
import contactAbstract2 from "../assets/contact_abstract_2.png";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const whiteBgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent horizontal scrollbar when text slides in
    document.body.style.overflowX = 'hidden';
    
    const scrollTrack = scrollTrackRef.current;
    const whiteBg = whiteBgRef.current;
    const text = textRef.current;
    const leftCol = leftColRef.current;

    if (!scrollTrack || !whiteBg || !text || !leftCol) return;

    let mm = gsap.matchMedia();

    mm.add("all", () => {
      const vh = window.innerHeight;
      gsap.set(whiteBg, { clipPath: `circle(0px at 50% ${vh}px)` });
      gsap.set(text, { x: "100vw" });

      // 1. Intro Animation (Scrubbed over exactly the first 100vh of the scroll track)
      gsap.to(whiteBg, {
        clipPath: `circle(4000px at 50% ${vh}px)`,
        scrollTrigger: {
          trigger: scrollTrack,
          start: "top top",
          end: `+=${vh}`, // finishes when user has scrolled 1 viewport height
          scrub: 1,
        }
      });

      gsap.to(text, {
        x: "0vw",
        scrollTrigger: {
          trigger: scrollTrack,
          start: "top top",
          end: `+=${vh}`,
          scrub: 1,
        }
      });

      // 2. Lock the Backdrop
      // Pinned for the absolute maximum scroll duration so it never vanishes
      ScrollTrigger.create({
        trigger: scrollTrack,
        start: "top top",
        end: "max",
        pin: whiteBg,
        pinSpacing: false,
      });

      // 3. Lock the Links Column natively via GSAP
      // CSS Sticky breaks inside smooth scroll wrappers (Lenis). GSAP pinning is bulletproof.
      ScrollTrigger.create({
        trigger: leftCol,
        start: "top 55%", // Locks exactly below the "CONTACT" text
        end: "max", // Remains locked until the very end of the page
        pin: true,
        pinSpacing: false,
      });
    });

    return () => {
      document.body.style.overflowX = '';
      mm.revert();
    };
  }, []);

  return (
    <footer id="contact" ref={sectionRef} className="relative bg-grit-900 w-full z-10">
      
      {/* ── THE SCROLL TRACK ── */}
      <div ref={scrollTrackRef} className="relative w-full z-10">
        
        {/* ── LOCKED BACKDROP (White Section & Text) ── */}
        <div 
          ref={whiteBgRef}
          className="relative h-screen w-full bg-[#f4f4f4] z-10 overflow-hidden"
        >
          {/* Text is naturally part of the locked backdrop, staying 100% frozen */}
          <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-start pt-[10vh] md:pt-[15vh] z-0 pointer-events-none">
            <h2 
              ref={textRef}
              className="px-6 md:px-16 text-[22vw] md:text-[14vw] font-poster font-bold tracking-[-0.04em] text-grit-900 leading-[0.8] uppercase whitespace-nowrap pointer-events-auto"
            >
              Contact
            </h2>
          </div>
        </div>

        {/* ── SCROLLING CONTENT GRID ── */}
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 pt-[80vh] md:pt-[100vh] pb-[6vh] md:pb-[10vh] z-20 pointer-events-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pointer-events-auto">
            
            {/* LEFT COLUMN: Links and email (Locked via GSAP) */}
            <div ref={leftColRef} className="md:col-span-5 flex flex-col mt-[10vh] md:mt-[30vh] self-start z-30">
               <div className="flex flex-col gap-1 mb-12 md:mb-24">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-4xl md:text-5xl font-poster font-bold tracking-tight text-grit-900 leading-tight hover:text-accent transition-colors">GitHub</a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-4xl md:text-5xl font-poster font-bold tracking-tight text-grit-900 leading-tight hover:text-accent transition-colors">LinkedIn</a>
                  <a href="#" className="text-4xl md:text-5xl font-poster font-bold tracking-tight text-grit-900 leading-tight hover:text-accent transition-colors">Behance</a>
               </div>
               <a href="mailto:m.andrewdominic9@gmail.com" className="text-sm md:text-base font-body text-grit-900 hover:underline">
                  m.andrewdominic9@gmail.com
               </a>
            </div>

            {/* RIGHT COLUMN: Staggered content */}
            <div className="md:col-span-7 flex flex-col gap-24 lg:gap-32">
               {/* First block */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                  <p className="text-lg md:text-xl font-body text-grit-900 leading-snug">
                     Looking for meaningful work.<br/><br/>
                     <span className="italic font-serif">Eager to join</span> an innovative team<br/> and contribute to ambitious<br/> projects.
                  </p>
                  <div className="w-full aspect-[4/5] relative overflow-hidden bg-grit-200">
                     <img src={contactAbstract1} alt="Abstract 3D Art" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out grayscale-[15%] contrast-110" />
                     <div className="absolute top-4 left-4 text-white/50 text-xs font-light">+</div>
                     <div className="absolute top-4 right-4 text-white/50 text-xs font-light">+</div>
                  </div>
               </div>

               {/* Second block */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                  <div className="w-full aspect-square relative overflow-hidden bg-grit-200 order-2 sm:order-1">
                     <img src={contactAbstract2} alt="Abstract 3D Art" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out grayscale-[15%] contrast-110" />
                     <div className="absolute top-4 left-4 text-white/50 text-xs font-light">+</div>
                     <div className="absolute top-4 right-4 text-white/50 text-xs font-light">+</div>
                  </div>
                  <p className="text-lg md:text-xl font-body text-grit-900 leading-snug sm:text-center order-1 sm:order-2 px-4">
                     I'm available for<br/> <span className="italic font-serif">freelance missions worldwide</span>,<br/> on your ambitious projects and<br/> international collaborations.
                  </p>
               </div>
            </div>
            
          </div>

          {/* ── EMBEDDED FOOTER ── */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-32 md:mt-48 pt-8 border-t border-grit-900/10 pointer-events-auto">
            <span className="text-[0.55rem] font-header font-bold tracking-[0.3em] uppercase text-grit-900/40">
              © {currentYear} ANDREW DOMINIC M
            </span>
            <span className="text-[0.55rem] font-header font-bold tracking-[0.3em] uppercase text-grit-900/40">
              BUILD_REF // V4.3
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-grit-900/40 rounded-full animate-pulse" />
              <span className="text-[0.55rem] font-header font-bold tracking-[0.4em] uppercase text-grit-900/40">
                STATUS: ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
