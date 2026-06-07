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
  const topMetaRef = useRef<HTMLDivElement>(null);
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

  // ── Cinematic refs ──
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const cinematicRef = useRef<HTMLDivElement>(null);
  const cinematicLine1Ref = useRef<HTMLParagraphElement>(null);
  const cinematicLine2Ref = useRef<HTMLParagraphElement>(null);
  const cinematicLine3Ref = useRef<HTMLParagraphElement>(null);
  const cinematicLine4Ref = useRef<HTMLParagraphElement>(null);

  // ── Measure capsule placeholder and return clip-path insets ──
  const measureCapsule = useCallback((isDesktop: boolean) => {
    const placeholder = isDesktop
      ? desktopPlaceholderRef.current
      : mobilePlaceholderRef.current;
    const viewport = viewportRef.current;
    if (!placeholder || !viewport) return null;

    const pRect = placeholder.getBoundingClientRect();
    const vRect = viewport.getBoundingClientRect();

    return {
      top: pRect.top - vRect.top,
      left: pRect.left - vRect.left,
      bottom: vRect.height - (pRect.top - vRect.top) - pRect.height,
      right: vRect.width - (pRect.left - vRect.left) - pRect.width,
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

        const initialClip = `inset(${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px round 9999px)`;

        // Set initial clip-path and reveal
        gsap.set(capsuleLayer, {
          clipPath: initialClip,
          visibility: "visible",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=350%",
            pin: viewport,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        // ── Phase 1 (0–1): Peripherals fade out, dither dies ──
        tl.to(
          [
            ditherRef.current,
            grainRef.current,
            topMetaRef.current,
            roleTagRef.current,
            dividerRef.current,
            subtextRef.current,
            sideLabelLeftRef.current,
            sideLabelRightRef.current,
            bottomNavRef.current,
          ].filter(Boolean),
          { opacity: 0, duration: 1.5, ease: "power2.in" },
          0
        );

        // ── Phase 2 (0.5–4.5): Capsule expands via native GSAP clipPath interpolation ──
        tl.fromTo(
          capsuleLayer,
          { clipPath: initialClip },
          {
            clipPath: "inset(0px 0px 0px 0px round 0px)",
            duration: 4,
            ease: "power3.inOut",
          },
          0.5
        );

        // ── Phase 2b (0.5–3): Typography separates and fades ──
        tl.to(
          desktopLine1Ref.current,
          { y: "-120%", opacity: 0, duration: 2.5, ease: "power3.inOut" },
          0.5
        );
        tl.to(
          desktopThatRef.current,
          { x: "-80vw", opacity: 0, duration: 2.5, ease: "power3.inOut" },
          0.7
        );
        tl.to(
          desktopWorkRef.current,
          { x: "80vw", opacity: 0, duration: 2.5, ease: "power3.inOut" },
          0.7
        );

        // ── Phase 3 (3–4.5): Background darkens ──
        tl.to(
          darkOverlayRef.current,
          { opacity: 0.5, duration: 2, ease: "power2.inOut" },
          3
        );

        // ── Phase 4 (4.5–7): Cinematic text reveals ──
        tl.fromTo(
          cinematicLine1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          4.5
        );
        tl.fromTo(
          cinematicLine2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          5.0
        );
        tl.fromTo(
          cinematicLine3Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          5.5
        );
        tl.fromTo(
          cinematicLine4Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          6.2
        );

        // ── Phase 5 (8–10): Cinematic fades, prep for CaseStudies ──
        tl.to(
          [
            cinematicLine1Ref.current,
            cinematicLine2Ref.current,
            cinematicLine3Ref.current,
            cinematicLine4Ref.current,
          ].filter(Boolean),
          { opacity: 0, y: -30, duration: 1.5, stagger: 0.1, ease: "power2.in" },
          8.5
        );

        // Darken fully to match CaseStudies bg
        tl.to(
          darkOverlayRef.current,
          { opacity: 0.85, duration: 1.5, ease: "power2.in" },
          9
        );

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

        const clip = { ...insets, radius: 9999 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%",
            pin: viewport,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: () => {
              const fresh = measureCapsule(false);
              if (fresh) {
                Object.assign(clip, fresh);
                clip.radius = 9999;
              }
            },
          },
        });

        // Peripherals fade
        tl.to(
          [
            ditherRef.current,
            grainRef.current,
            roleTagRef.current,
            dividerRef.current,
            subtextRef.current,
            bottomNavRef.current,
          ].filter(Boolean),
          { opacity: 0, duration: 1.2, ease: "power2.in" },
          0
        );

        // Capsule expands
        tl.to(
          clip,
          {
            top: 0, right: 0, bottom: 0, left: 0, radius: 0,
            duration: 3.5,
            ease: "power3.inOut",
            onUpdate: () => {
              capsuleLayer.style.clipPath = `inset(${clip.top}px ${clip.right}px ${clip.bottom}px ${clip.left}px round ${clip.radius}px)`;
            },
          },
          0.3
        );

        // Mobile headline lines separate
        tl.to(
          [mobileLine1Ref.current, mobileLine2Ref.current].filter(Boolean),
          { y: "-100%", opacity: 0, duration: 2, ease: "power3.inOut" },
          0.3
        );
        tl.to(mobileThatRef.current, { x: "-60vw", opacity: 0, duration: 2, ease: "power3.inOut" }, 0.5);
        tl.to(mobileWorkRef.current, { x: "60vw", opacity: 0, duration: 2, ease: "power3.inOut" }, 0.5);

        // Darken
        tl.to(darkOverlayRef.current, { opacity: 0.5, duration: 1.5 }, 2.5);

        // Cinematic text
        tl.fromTo(cinematicLine1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 3.5);
        tl.fromTo(cinematicLine2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 3.8);
        tl.fromTo(cinematicLine3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 4.1);
        tl.fromTo(cinematicLine4Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 4.6);

        // Fade out cinematic
        tl.to(
          [cinematicLine1Ref.current, cinematicLine2Ref.current, cinematicLine3Ref.current, cinematicLine4Ref.current].filter(Boolean),
          { opacity: 0, y: -20, duration: 1, stagger: 0.05, ease: "power2.in" },
          6.5
        );
        tl.to(darkOverlayRef.current, { opacity: 0.85, duration: 1 }, 7);

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

        {/* Top meta */}
        <motion.div
          ref={topMetaRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="hero-top-meta"
        >
          <span className="hero-meta-label">Portfolio — 2025</span>
          <span className="hero-meta-label">Andrew Dominic M.</span>
        </motion.div>

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
            <div className="hero-role-line" />
            <p className="hero-role-text">Product-Focused Developer</p>
            <div className="hero-role-line" />
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
        </div>

        {/* ── DARK OVERLAY ── */}
        <div ref={darkOverlayRef} className="capsule-portal__dark-overlay" />

        {/* ── CINEMATIC TEXT LAYER ── */}
        <div ref={cinematicRef} className="capsule-portal__cinematic">
          <p ref={cinematicLine1Ref} className="cinematic-line cinematic-line--large">
            I build products.
          </p>
          <p ref={cinematicLine2Ref} className="cinematic-line cinematic-line--large">
            I ship them.
          </p>
          <p ref={cinematicLine3Ref} className="cinematic-line cinematic-line--large">
            I market them.
          </p>
          <p ref={cinematicLine4Ref} className="cinematic-line cinematic-line--small">
            Computer Science × Business × Execution
          </p>
        </div>
      </div>
    </section>
  );
}
