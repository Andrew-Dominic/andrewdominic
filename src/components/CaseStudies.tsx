import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "shitha",
    num: "01",
    title: "Shitha\nClothing",
    tags: ["E-COMMERCE", "SYSTEM SCALE", "PAYMENT FLOWS"],
    description: "Built and deployed a production e-commerce system for a 100K audience brand — managing payments, performance, and server infrastructure on a dedicated VPS to ensure reliability under real traffic.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&h=1000&fit=crop&q=80",
  },
  {
    id: "yatra",
    num: "02",
    title: "Yatra\n2026",
    tags: ["EVENT SYSTEMS", "REAL-TIME VERIFICATION", "SCALABLE TICKETING"],
    description: "Designed a real-time ticketing system with QR verification — eliminating duplicate entries for 3,000+ attendees.",
    image: new URL("../assets/yatra_tn.png", import.meta.url).href,
  },
  {
    id: "isro",
    num: "03",
    title: "ISRO\nDrone",
    tags: ["AUTONOMOUS", "ONBOARD INTELLIGENCE", "REAL-TIME CONTROL"],
    description: "Built a GPS-independent drone system — solving real-time navigation using onboard intelligence and live control dashboards.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&h=1000&fit=crop&q=80",
  },
  {
    id: "sinclo",
    num: "04",
    title: "Synflow\nStudio",
    tags: ["DIGITAL SYSTEMS", "FULL-STACK", "AUTOMATION", "CLIENT WORK"],
    description: "Co-founded a digital studio focused on building websites and automation systems for small businesses — helping streamline operations, manage leads, and improve client workflows.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=1000&fit=crop&q=80",
  }
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;
    const counterEl = counterRef.current;

    if (!section || !track) return;

    let mm = gsap.matchMedia();

    // Only apply horizontal scroll + parallax on desktop (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      // Cache DOM queries for desktop cards
      const cards = track.querySelectorAll<HTMLElement>(".desktop-card");
      const cardData = Array.from(cards).map((card) => ({
        el: card,
        title: card.querySelector<HTMLElement>(".card-title"),
        photo: card.querySelector<HTMLElement>(".card-photo"),
        meta: card.querySelector<HTMLElement>(".card-meta"),
      }));

      let lastIndex = -1;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Horizontal scroll the track
          gsap.set(track, { x: -totalScrollWidth * progress });

          // Progress bar
          if (progressBar) {
            progressBar.style.transform = `scaleX(${progress})`;
          }

          // Counter
          const newIndex = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );
          const safeIndex = Math.max(0, newIndex);
          if (safeIndex !== lastIndex && counterEl) {
            lastIndex = safeIndex;
            counterEl.textContent = `[ ${String(safeIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`;
          }

          // Desktop Parallax Physics
          for (let i = 0; i < cardData.length; i++) {
            const { title, photo, meta } = cardData[i];

            const cardCenter = projects.length > 1 ? i / (projects.length - 1) : 0;
            const delta = progress - cardCenter;

            // Title lags
            if (title) {
              title.style.transform = `translateY(-45%) translate3d(${delta * -80}px, 0, 0)`;
            }

            // Photo pushes ahead
            if (photo) {
              const s = 1 - Math.abs(delta) * 0.015;
              photo.style.transform = `translateY(-50%) translate3d(${delta * 160}px, 0, 0) scale(${s})`;
            }

            // Meta follows photo
            if (meta) {
              const opacity = Math.max(0.15, 1 - Math.abs(delta) * 1.2);
              meta.style.transform = `translateY(-50%) translate3d(${delta * 120}px, 0, 0)`;
              meta.style.opacity = String(opacity);
            }
          }
        },
      });

      return () => {
        st.kill();
        // Use transform,opacity instead of 'all' so we don't wipe React inline styles entirely if we use them,
        // though Tailwind is safer. We will use Tailwind for base layout.
        gsap.set([track, progressBar, ...cardData.map(c => [c.title, c.photo, c.meta]).flat()], { clearProps: "transform,opacity" });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-white lg:overflow-hidden">
      <div className="flex flex-col lg:h-screen">

        {/* Scrolling content - Fixed height collapse by adding flex flex-col */}
        <div className="w-full relative lg:flex-1 lg:overflow-hidden flex flex-col">
          {/* trackRef takes flex-1 to fill the height securely */}
          <div ref={trackRef} className="flex flex-col lg:flex-row h-auto lg:flex-1 w-full">

            {/* ── Project Cards ── */}
            {projects.map((project) => (
              <div
                key={project.id}
                className="case-card w-full lg:w-[100vw] h-auto lg:h-full lg:flex-shrink-0 relative lg:overflow-hidden flex flex-col lg:block pt-24 pb-20 lg:py-0 px-6 sm:px-12 lg:px-0 border-b border-grit-200 lg:border-none"
              >

                {/* ── MOBILE & TABLET LAYOUT (< lg) ── */}
                <div className="lg:hidden flex flex-col md:flex-row md:items-start gap-8 md:gap-16 w-full max-w-4xl mx-auto">

                  {/* LEFT SIDE (Tablet) / TOP (Mobile) */}
                  <div className="flex-1 flex flex-col w-full">
                    {/* Label */}
                    <span className="text-[0.6rem] font-header font-bold tracking-[0.4em] uppercase text-grit-400 mb-6 block">
                      PROJECT {project.num}
                    </span>

                    {/* Title */}
                    <h3 className="text-[3.5rem] sm:text-7xl font-poster font-bold tracking-[-0.03em] leading-[0.85] text-grit-900 whitespace-pre-line mb-8 uppercase">
                      {project.title}
                    </h3>

                    {/* Image */}
                    <div className="w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden mb-6 md:mb-0">
                      <img
                        src={project.image}
                        alt={project.title.replace('\n', ' ')}
                        className="w-full h-full object-cover grayscale contrast-[1.2] brightness-90"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* RIGHT SIDE (Tablet) / BOTTOM (Mobile) */}
                  <div className="flex-1 flex flex-col justify-center w-full md:pt-32">
                    {/* Tags (Inline Stack) */}
                    <div className="flex flex-wrap items-center gap-y-2 mb-6">
                      {project.tags.map((tag, index) => (
                        <span key={tag} className="flex items-center text-[0.65rem] sm:text-xs font-header font-bold text-grit-900 uppercase tracking-[0.15em]">
                          {tag}
                          {index < project.tags.length - 1 && <span className="mx-2 text-grit-400">•</span>}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base font-body text-grit-900/80 leading-[1.7] mb-8 max-w-sm">
                      {project.description}
                    </p>

                    {/* CTA */}
                    <a href="#" className="inline-flex justify-center items-center gap-2 text-[0.6rem] sm:text-xs font-header font-bold tracking-[0.25em] uppercase bg-grit-900 text-white w-full sm:w-auto px-8 py-4 sm:py-5 hover:bg-black transition-colors group/btn">
                      VIEW CASE STUDY
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                </div>

                {/* ── DESKTOP LAYOUT (>= lg) ── */}
                <div className="desktop-card hidden lg:block w-full h-full relative">
                  {/* PROJECT label */}
                  <div className="absolute z-20" style={{ left: '14%', top: '18%' }}>
                    <span className="text-[0.55rem] font-header font-bold tracking-[0.4em] uppercase text-grit-400">
                      PROJECT {project.num}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="card-title absolute z-20 pointer-events-none" style={{ left: '14%', top: '50%', transform: 'translateY(-45%)' }}>
                    <h3 className="text-8xl xl:text-[6.5rem] font-poster font-bold tracking-[-0.03em] leading-[0.88] text-grit-900 whitespace-pre-line uppercase" style={{ mixBlendMode: 'difference' }}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Photo */}
                  <div className="card-photo absolute z-10" style={{ left: '32%', top: '50%', transform: 'translateY(-50%)', width: '36vw', maxWidth: '480px' }}>
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title.replace('\n', ' ')}
                        className="w-full h-full object-cover grayscale contrast-[1.2] brightness-90"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Tags + Description */}
                  <div className="card-meta absolute z-20" style={{ left: 'calc(32% + 36vw + 28px)', top: '50%', transform: 'translateY(-50%)', maxWidth: '220px' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-grit-900/30 mb-5" />
                    <div className="flex flex-col gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <p key={tag} className="text-xs font-header font-bold text-grit-900 uppercase tracking-wide border-b border-grit-900 w-fit pb-0.5 cursor-default hover:text-grit-500 hover:border-grit-500 transition-colors">
                          {tag}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs font-body text-grit-900/55 leading-relaxed mb-5">
                      {project.description}
                    </p>
                    <a href="#" className="inline-flex items-center gap-1.5 text-[0.55rem] font-header font-bold tracking-[0.25em] uppercase text-grit-900 border border-grit-900 px-4 py-2 hover:bg-grit-900 hover:text-white transition-all duration-300 group/btn">
                      VIEW CASE STUDY
                      <ArrowUpRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* ── Fixed Bottom Bar with Progress (Desktop only) ── */}
        <div className="hidden lg:flex relative bg-white z-10 flex-shrink-0 flex-col">
          <div className="relative h-px w-full bg-grit-200">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full bg-grit-900 origin-left scale-x-0 will-change-transform"
            />
          </div>

          <div className="px-16 py-5 flex justify-between items-center w-full">
            <span ref={counterRef} className="text-base font-poster font-bold text-grit-900/80 tracking-wide">
              [ 01 / {String(projects.length).padStart(2, "0")} ]
            </span>

            <a href="#" className="flex items-center gap-2 text-[0.6rem] font-header font-bold tracking-[0.3em] uppercase text-grit-900/60 hover:text-grit-900 transition-colors group/all">
              VIEW ALL PROJECTS
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
