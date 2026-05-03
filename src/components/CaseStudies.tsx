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
    tags: ["E-COMMERCE", "NEXT.JS", "MONGODB", "REDIS"],
    description: "A production e-commerce platform for a 100K-audience fashion brand with order tracking, invoice generation, email automation, and real payment flows.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&h=1000&fit=crop&q=80",
  },
  {
    id: "yatra",
    num: "02",
    title: "Yatra\n2026",
    tags: ["EVENT SYSTEMS", "SUPABASE", "REACT NATIVE", "QR SCANNER"],
    description: "Fully replaced manual ticketing for a 3,000+ attendee college fest. Zero duplicate entries on event day with real-time QR verification.",
    image: new URL("../assets/yatra_tn.png", import.meta.url).href,
  },
  {
    id: "isro",
    num: "03",
    title: "ISRO\nDrone",
    tags: ["AUTONOMOUS", "PYTHON", "FLASK", "JETSON NANO"],
    description: "Autonomous drone control without GPS — navigation intelligence bridging low-level computing with real-time dashboard controllers.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&h=1000&fit=crop&q=80",
  },
  {
    id: "sinclo",
    num: "04",
    title: "Synflow\nStudio",
    tags: ["AGENCY", "FULL-STACK", "AI AUTOMATION", "CRM"],
    description: "Co-founded a web and AI automation agency scaling digital operations for SMBs in India and Australia. Real business value for international clients.",
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

    const totalScrollWidth = track.scrollWidth - window.innerWidth;

    // Cache DOM queries — avoid querySelectorAll on every frame
    const cards = track.querySelectorAll<HTMLElement>(".case-card");
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

        // Move the track — single gsap.set call
        gsap.set(track, { x: -totalScrollWidth * progress });

        // Progress bar — direct transform for GPU acceleration
        if (progressBar) {
          progressBar.style.transform = `scaleX(${progress})`;
        }

        // Counter update — direct DOM mutation, no React state
        const newIndex = Math.min(
          Math.floor(progress * projects.length),
          projects.length - 1
        );
        const safeIndex = Math.max(0, newIndex);
        if (safeIndex !== lastIndex && counterEl) {
          lastIndex = safeIndex;
          counterEl.textContent = `[ ${String(safeIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`;
        }

        // ── Differential parallax physics ──
        // Uses cached DOM refs — zero querySelectorAll per frame
        for (let i = 0; i < cardData.length; i++) {
          const { title, photo, meta } = cardData[i];

          const cardCenter = projects.length > 1
            ? i / (projects.length - 1)
            : 0;
          const delta = progress - cardCenter;

          // Title: SLOWER — lags behind scroll direction
          if (title) {
            title.style.transform = `translateY(-45%) translate3d(${delta * -80}px, 0, 0)`;
          }

          // Photo: FASTER — pushes ahead in scroll direction
          if (photo) {
            const s = 1 - Math.abs(delta) * 0.015;
            photo.style.transform = `translateY(-50%) translate3d(${delta * 160}px, 0, 0) scale(${s})`;
          }

          // Meta: follows photo with slight trail
          if (meta) {
            const opacity = Math.max(0.15, 1 - Math.abs(delta) * 1.2);
            meta.style.transform = `translateY(-50%) translate3d(${delta * 120}px, 0, 0)`;
            meta.style.opacity = String(opacity);
          }
        }
      },
    });

    // Recalculate on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      st.kill();
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-white overflow-hidden">
      <div className="h-screen flex flex-col">
        {/* Scrolling content */}
        <div className="flex-1 overflow-hidden relative">
          <div ref={trackRef} className="flex h-full" style={{ willChange: 'transform' }}>

            {/* ── Project Cards ── */}
            {projects.map((project) => (
              <div
                key={project.id}
                className="case-card w-[100vw] h-full flex-shrink-0 relative overflow-hidden"
              >
                {/* PROJECT label — above the title */}
                <div
                  className="absolute z-20"
                  style={{ left: '14%', top: '18%' }}
                >
                  <span className="text-[0.55rem] font-header font-bold tracking-[0.4em] uppercase text-grit-400">
                    PROJECT {project.num}
                  </span>
                </div>

                {/*
                  ── Title — BLACK text, positioned left, overlapping into the image ──
                  Uses mix-blend-difference so the text inverts to white
                  where it overlaps the dark photograph.
                */}
                <div
                  className="card-title absolute z-20 pointer-events-none"
                  style={{
                    left: '14%',
                    top: '50%',
                    transform: 'translateY(-45%)',
                    willChange: 'transform',
                  }}
                >
                  <h3
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-poster font-bold tracking-[-0.03em] leading-[0.88] text-grit-900 whitespace-pre-line"
                    style={{ mixBlendMode: 'difference' }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/*
                  ── Photo — positioned center-right so title overlaps its left edge ──
                */}
                <div
                  className="card-photo absolute z-10"
                  style={{
                    left: '32%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '36vw',
                    maxWidth: '480px',
                    willChange: 'transform',
                  }}
                >
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.id}
                      className="w-full h-full object-cover grayscale contrast-[1.2] brightness-90"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* ── Tags + Description — immediately right of the photo ── */}
                <div
                  className="card-meta absolute z-20"
                  style={{
                    left: 'calc(32% + 36vw + 28px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    maxWidth: '220px',
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Small dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-grit-900/30 mb-5 hidden md:block" />

                  {/* Tags */}
                  <div className="flex flex-col gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <p
                        key={tag}
                        className="text-[0.65rem] md:text-xs font-header font-bold text-grit-900 uppercase tracking-wide border-b border-grit-900 w-fit pb-0.5 cursor-default hover:text-grit-500 hover:border-grit-500 transition-colors"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[0.6rem] md:text-xs font-body text-grit-900/55 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* CTA */}
                  <a href="#" className="inline-flex items-center gap-1.5 text-[0.55rem] font-header font-bold tracking-[0.25em] uppercase text-grit-900 border border-grit-900 px-4 py-2 hover:bg-grit-900 hover:text-white transition-all duration-300 group/btn">
                    MORE INFO
                    <ArrowUpRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ── Fixed Bottom Bar with Progress ── */}
        <div className="relative bg-white z-10 flex-shrink-0">
          {/* Progress bar track + fill */}
          <div className="relative h-px w-full bg-grit-200">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full bg-grit-900 origin-left"
              style={{ transform: 'scaleX(0)', willChange: 'transform' }}
            />
          </div>

          <div className="px-8 md:px-16 py-4 md:py-5 flex justify-between items-center">
            <span ref={counterRef} className="text-sm md:text-base font-poster font-bold text-grit-900/80 tracking-wide">
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
