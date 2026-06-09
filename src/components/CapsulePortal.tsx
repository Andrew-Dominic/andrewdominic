import { useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Dither from "./ui/Dither";
import tenorGif from "../assets/tenor.gif";
import "./Hero.css";
import "./CapsulePortal.css";

gsap.registerPlugin(ScrollTrigger);

export default function CapsulePortal() {
  // ── Section refs ──
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // ── Capsule refs ──
  const capsuleLayerRef = useRef<HTMLDivElement>(null);
  const desktopPlaceholderRef = useRef<HTMLSpanElement>(null);
  const mobilePlaceholderRef = useRef<HTMLSpanElement>(null);

  // ── Hero element refs (for fade/move) ──
  const ditherRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const roleTagRef = useRef<HTMLDivElement>(null);
  const headlineWrapperRef = useRef<HTMLDivElement>(null);
  const desktopLine1Ref = useRef<HTMLSpanElement>(null);
  const desktopThatRef = useRef<HTMLSpanElement>(null);
  const desktopWorkRef = useRef<HTMLSpanElement>(null);
  const mobileLine1Ref = useRef<HTMLSpanElement>(null);
  const mobileLine2Ref = useRef<HTMLSpanElement>(null);
  const mobileThatRef = useRef<HTMLSpanElement>(null);
  const mobileWorkRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const sideLabelLeftRef = useRef<HTMLDivElement>(null);
  const sideLabelRightRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);

  // ── Cinematic & Metrics refs ──
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const metricsWrapperRef = useRef<HTMLDivElement>(null);
  const metric1Ref = useRef<HTMLDivElement>(null);
  const metric2Ref = useRef<HTMLDivElement>(null);
  const metric3Ref = useRef<HTMLDivElement>(null);

  // ── Measure capsule placeholder and return clip-path insets ──
  const measureCapsule = useCallback((isDesktop: boolean) => {
    const placeholder = isDesktop
      ? desktopPlaceholderRef.current
      : mobilePlaceholderRef.current;
    const viewport = viewportRef.current;
    if (!placeholder || !viewport) return null;

    const pRect = placeholder.getBoundingClientRect();

    // The capsule layer is forced to 100vw/100vh and centered to the screen.
    // Therefore, its edges perfectly align with the browser window edges.
    // We compute insets directly from the window boundaries.
    return {
      top: pRect.top,
      left: pRect.left,
      bottom: window.innerHeight - pRect.bottom,
      right: window.innerWidth - pRect.right,
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const capsuleLayer = capsuleLayerRef.current;

    if (!section || !viewport || !capsuleLayer) return;

    // Hide capsule layer until we measure and position it correctly
    gsap.set(capsuleLayer, { visibility: "hidden" });

    let mm: gsap.MatchMedia;

    // Delay setup until Motion entry animations finish (longest is ~1.5s delay + 1.1s duration)
    // This ensures the capsule placeholder is at its final layout position when we measure
    const timer = setTimeout(() => {
      mm = gsap.matchMedia();

      // ════════════════════════════════════════════
      //  DESKTOP (≥ 768px)
      // ════════════════════════════════════════════
      mm.add("(min-width: 768px)", () => {
        const insets = measureCapsule(true);
        if (!insets) return;

        // Set initial clip-path and reveal
        gsap.set(capsuleLayer, {
          clipPath: `inset(${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px round 9999px)`,
          visibility: "visible",
        });

        // Proxy object for GSAP to tween clip-path values
        const clip = { ...insets, radius: window.innerHeight / 2 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 100,
            onRefresh: () => {
              const fresh = measureCapsule(true);
              if (fresh) {
                clip.top = fresh.top;
                clip.right = fresh.right;
                clip.bottom = fresh.bottom;
                clip.left = fresh.left;
                clip.radius = window.innerHeight / 2;
              }
            },
          },
        });

        // ── Phase 1: Peripherals fade out ──
        tl.to([ditherRef.current, grainRef.current].filter(Boolean), { opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
        tl.fromTo(
          [roleTagRef.current, dividerRef.current, subtextRef.current, sideLabelLeftRef.current, sideLabelRightRef.current, bottomNavRef.current].filter(Boolean),
          { opacity: 1 }, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0
        );

        // ── Phase 2: Capsule expands to fullscreen ──
        tl.to(
          clip,
          {
            top: 0, right: 0, bottom: 0, left: 0, radius: 0,
            duration: 0.7, ease: "power2.inOut",
            onUpdate: () => {
              capsuleLayer.style.clipPath = `inset(${clip.top}px ${clip.right}px ${clip.bottom}px ${clip.left}px round ${clip.radius}px)`;
            },
          },
          0.1
        );

        // ── Phase 2b: Typography departs ──
        tl.fromTo(desktopLine1Ref.current, { y: "0%", opacity: 1 }, { y: "-150%", opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.1);
        tl.fromTo(desktopThatRef.current, { x: "0vw", opacity: 1 }, { x: "-50vw", opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.1);
        tl.fromTo(desktopWorkRef.current, { x: "0vw", opacity: 1 }, { x: "50vw", opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.1);

        // ── Phase 3: Combined Cinematic Metrics ──
        const metricRefs = [metric1Ref, metric2Ref, metric3Ref];
        metricRefs.forEach((ref, i) => {
          const offset = 0.4 + (i * 0.05); 
          tl.fromTo(ref.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power3.out" }, offset);
          tl.to(ref.current, { opacity: 0, y: -30, scale: 1.02, duration: 0.2, ease: "power2.in" }, offset + 0.3);
        });

        // ── Phase 4: Darken to black ──
        tl.to(darkOverlayRef.current, { opacity: 1, duration: 0.2, ease: "power2.inOut" }, 0.8);

        return () => tl.kill();
      });

      // ════════════════════════════════════════════
      //  MOBILE (< 768px)
      // ════════════════════════════════════════════
      mm.add("(max-width: 767px)", () => {
        const insets = measureCapsule(false);
        if (!insets) return;

        gsap.set(capsuleLayer, {
          clipPath: `inset(${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px round 9999px)`,
          visibility: "visible",
        });

        const clip = { ...insets, radius: window.innerHeight / 2 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 100,
            onRefresh: () => {
              const fresh = measureCapsule(false);
              if (fresh) {
                Object.assign(clip, fresh);
                clip.radius = window.innerHeight / 2;
              }
            },
          },
        });

        // Peripherals fade
        tl.to([ditherRef.current, grainRef.current].filter(Boolean), { opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
        tl.fromTo(
          [roleTagRef.current, dividerRef.current, subtextRef.current, bottomNavRef.current].filter(Boolean),
          { opacity: 1 }, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0
        );

        // Capsule expands
        tl.to(
          clip,
          {
            top: 0, right: 0, bottom: 0, left: 0, radius: 0,
            duration: 0.7, ease: "power2.inOut",
            onUpdate: () => {
              capsuleLayer.style.clipPath = `inset(${clip.top}px ${clip.right}px ${clip.bottom}px ${clip.left}px round ${clip.radius}px)`;
            },
          },
          0.1
        );

        // Mobile headline lines separate
        tl.fromTo([mobileLine1Ref.current, mobileLine2Ref.current].filter(Boolean), { y: "0%", opacity: 1 }, { y: "-120%", opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.1);
        tl.fromTo(mobileThatRef.current, { x: "0vw", opacity: 1 }, { x: "-40vw", opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.1);
        tl.fromTo(mobileWorkRef.current, { x: "0vw", opacity: 1 }, { x: "40vw", opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.1);

        // Combined cinematic metrics
        const metricRefs = [metric1Ref, metric2Ref, metric3Ref];
        metricRefs.forEach((ref, i) => {
          const offset = 0.4 + (i * 0.05);
          tl.fromTo(ref.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power3.out" }, offset);
          tl.to(ref.current, { opacity: 0, y: -20, scale: 1.02, duration: 0.2, ease: "power2.in" }, offset + 0.3);
        });

        // Darken fully
        tl.to(darkOverlayRef.current, { opacity: 1, duration: 0.2, ease: "power2.inOut" }, 0.8);

        return () => tl.kill();
      });
    }, 1800);

    return () => {
      clearTimeout(timer);
      if (mm) mm.revert();
    };
  }, [measureCapsule]);

  // ════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════
  return (
    <section ref={sectionRef} className="capsule-portal">
      <div ref={viewportRef} className="capsule-portal__viewport">
        {/* ── HERO LAYER (z-index via Hero.css) ── */}

        {/* Background Dither */}
        <div ref={ditherRef} className="hero-dither">
          <Dither
            waveColor={[0.85, 0.85, 0.85]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={3}
            waveAmplitude={0.25}
            waveFrequency={2.5}
            waveSpeed={0.08}
          />
        </div>

        {/* Grain */}
        <div ref={grainRef} className="hero-grain" />

        {/* Editorial grid lines */}
        <div className="hero-grid-lines">
          <div className="hero-grid-line hero-grid-line--left" />
          <div className="hero-grid-line hero-grid-line--right" />
        </div>

        {/* Main Content */}
        <div className="hero-content" style={{ zIndex: 10 }}>
          {/* Role Tag */}
          <motion.div
            ref={roleTagRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-role-tag"
          >
            <span className="hero-meta-label hero-meta-label--left">Portfolio — 2026</span>
            <div className="hero-role-line" />
            <p className="hero-role-text">Product-Focused Developer</p>
            <div className="hero-role-line" />
            <span className="hero-meta-label hero-meta-label--right">Andrew Dominic M.</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            ref={headlineWrapperRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-headline-wrapper"
          >
            {/* ── Mobile headline ── */}
            <h1 className="hero-headline hero-headline--mobile">
              <span ref={mobileLine1Ref} className="hero-headline-line">
                Building
              </span>
              <span ref={mobileLine2Ref} className="hero-headline-line">
                Systems
              </span>
              <span className="hero-headline-line hero-headline-line--split">
                <span ref={mobileThatRef}>That</span>
                <span
                  ref={mobilePlaceholderRef}
                  className="hero-capsule-placeholder"
                />
                <span ref={mobileWorkRef} className="hero-headline-accent">
                  Work
                  <svg
                    className="hero-circle-svg"
                    viewBox="0 0 120 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M110 8.5C95 5.5 45 4.5 15 12.5C-5 18.5 2 34.5 25 39.5C55 44.5 105 40.5 115 28.5C122 18.5 95 10.5 75 9.5"
                      stroke="#da2727"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* ── Desktop headline ── */}
            <h1 className="hero-headline hero-headline--desktop">
              <span ref={desktopLine1Ref} className="hero-headline-line">
                Building Systems
              </span>
              <span className="hero-headline-line hero-headline-line--split">
                <span ref={desktopThatRef}>That</span>
                <span
                  ref={desktopPlaceholderRef}
                  className="hero-capsule-placeholder"
                />
                <span ref={desktopWorkRef} className="hero-headline-accent">
                  Work
                  <svg
                    className="hero-circle-svg"
                    viewBox="0 0 120 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M110 8.5C95 5.5 45 4.5 15 12.5C-5 18.5 2 34.5 25 39.5C55 44.5 105 40.5 115 28.5C122 18.5 95 10.5 75 9.5"
                      stroke="#da2727"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
                    />
                  </svg>
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.div
            ref={dividerRef}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-divider"
          />

          {/* Subtext */}
          <motion.p
            ref={subtextRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-subtext"
          >
            Full-stack developer combining Computer Science and Business to
            build high-performance digital products.
          </motion.p>
        </div>

        {/* Side labels */}
        <motion.div
          ref={sideLabelLeftRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hero-side-label hero-side-label--left"
        >
          <span>Digital Product Architect</span>
        </motion.div>
        <motion.div
          ref={sideLabelRightRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hero-side-label hero-side-label--right"
        >
          <span>Est. 2023</span>
        </motion.div>

        {/* Bottom Nav */}
        <motion.div
          ref={bottomNavRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="hero-bottom-nav"
        >
          <div className="hero-bottom-nav-line" />
          <div className="hero-bottom-nav-content">
            <div className="hero-bottom-nav-left">
              <span className="hero-bottom-nav-arrow">→</span>
              <span>V3.0</span>
            </div>
            <div className="hero-bottom-nav-center">
              <a href="#">BEHANCE</a>
              <span className="hero-bottom-nav-slash">/</span>
              <a href="#">LINKEDIN</a>
              <span className="hero-bottom-nav-slash">/</span>
              <a href="#">GITHUB</a>
            </div>
            <div className="hero-bottom-nav-right">
              <a href="#work">WORK</a>
              <a href="#about">INFO</a>
              <a href="#contact">CONTACT</a>
            </div>
          </div>
        </motion.div>

        {/* ── CAPSULE MEDIA LAYER ── */}
        <div ref={capsuleLayerRef} className="capsule-portal__capsule">
          <img
            src={tenorGif}
            className="capsule-portal__capsule-media"
            alt=""
            aria-hidden="true"
          />
          
          {/* ── DARK OVERLAY ── */}
          <div ref={darkOverlayRef} className="capsule-portal__dark-overlay" />
        </div>

        {/* ── CINEMATIC METRICS ── */}
        <div ref={metricsWrapperRef} className="capsule-portal__metrics">
          <div className="capsule-metric-wrapper">
            <div ref={metric1Ref} className="capsule-metric">
              <div className="capsule-metric__line" />
              <span className="capsule-metric__text">5+ PROJECTS SHIPPED</span>
              <span className="capsule-metric__sub">FULL-STACK SYSTEMS</span>
            </div>
            <div ref={metric2Ref} className="capsule-metric">
              <div className="capsule-metric__line" />
              <span className="capsule-metric__text">ACTIVE PRODUCTS</span>
              <span className="capsule-metric__sub">LIVE IN PRODUCTION</span>
            </div>
            <div ref={metric3Ref} className="capsule-metric">
              <div className="capsule-metric__line" />
              <span className="capsule-metric__text">INTERNATIONAL CLIENTS</span>
              <span className="capsule-metric__sub">GLOBAL REACH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
