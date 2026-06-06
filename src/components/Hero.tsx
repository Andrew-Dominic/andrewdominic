import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Dither from "./ui/Dither";
import "./Hero.css";

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

      {/* Top meta — editorial issue/date style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="hero-top-meta"
      >
        <span className="hero-meta-label">Portfolio — 2025</span>
        <span className="hero-meta-label">Andrew Dominic M.</span>
      </motion.div>

      {/* Main Content — centered, typography-driven */}
      <div className="hero-content">

        {/* Role Tag — refined, editorial */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-role-tag"
        >
          <div className="hero-role-line" />
          <p className="hero-role-text">Product-Focused Developer</p>
          <div className="hero-role-line" />
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
            <span className="hero-headline-line">
              That{" "}
              <span className="hero-headline-accent">
                Work.
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
            <span className="hero-headline-line">
              That{" "}
              <span className="hero-headline-accent">
                Work.
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="hero-cta"
          >
            View Case Studies <ArrowRight className="hero-cta-icon" />
          </motion.button>
        </motion.div>
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

      {/* Bottom bar — refined editorial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="hero-bottom-bar"
      >
        <div className="hero-bottom-item hero-bottom-item--left">
          <span>001 / Start</span>
          <div className="hero-bottom-rule" />
        </div>
        <p className="hero-bottom-scroll">Scroll to explore</p>
        <div className="hero-bottom-item hero-bottom-item--right">
          <div className="hero-bottom-rule" />
          <span>Phase_01</span>
        </div>
      </motion.div>
    </section>
  );
}
