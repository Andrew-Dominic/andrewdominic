import { motion } from "motion/react";
import Dither from "./ui/Dither";
import "./Hero.css";
import tenorGif from "../assets/tenor.gif";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background Dither — atmospheric only, heavily muted */}
      <div className="hero-dither">
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

      {/* Subtle grain overlay for editorial texture */}
      <div className="hero-grain" />

      {/* Editorial grid lines — vertical rules */}
      <div className="hero-grid-lines">
        <div className="hero-grid-line hero-grid-line--left" />
        <div className="hero-grid-line hero-grid-line--right" />
      </div>

      {/* Main Content — centered, typography-driven */}
      <div className="hero-content">

        {/* Role Tag — refined, editorial */}
        <motion.div
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

        {/* Headline — the undeniable focal point */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-headline-wrapper"
        >
          {/* Mobile headline */}
          <h1 className="hero-headline hero-headline--mobile">
            <span className="hero-headline-line">Building</span>
            <span className="hero-headline-line">Systems</span>
            <span className="hero-headline-line hero-headline-line--split">
              <span>That</span>
              <motion.span 
                className="hero-capsule"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={tenorGif} className="w-full h-full object-cover rounded-[inherit]" alt="editorial element" />
              </motion.span>
              <span className="hero-headline-accent">Work
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

          {/* Desktop headline */}
          <h1 className="hero-headline hero-headline--desktop">
            <span className="hero-headline-line">Building Systems</span>
            <span className="hero-headline-line hero-headline-line--split">
              <span>That</span>
              <motion.span 
                className="hero-capsule"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={tenorGif} className="w-full h-full object-cover rounded-[inherit]" alt="editorial element" />
              </motion.span>
              <span className="hero-headline-accent">Work
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

        {/* Thin horizontal rule — editorial divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-divider"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-subtext"
        >
          Full-stack developer combining Computer Science and Business to build high-performance digital products.
        </motion.p>
      </div>

      {/* Side label — vertical text, editorial detail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hero-side-label hero-side-label--left"
      >
        <span>Digital Product Architect</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hero-side-label hero-side-label--right"
      >
        <span>Est. 2023</span>
      </motion.div>

      {/* Bottom Nav — full width editorial style */}
      <motion.div
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
    </section>
  );
}
