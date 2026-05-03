# Andrew Dominic M — Digital Product Architect

A high-performance portfolio built with a Swiss-Brutalist aesthetic, focusing on extreme performance, architectural clarity, and premium interactions.

## ⚡ Performance & Optimization
Optimized to 1% standards for the smoothest user experience:
- **Lenis Smooth Scroll**: Integrated with GSAP ScrollTrigger for buttery smooth motion.
- **DOM Persistence**: Scroll counters and progress bars use direct DOM manipulation to bypass React's render cycle during high-frequency scroll events.
- **GPU Acceleration**: Heavy parallax layers promoted to individual GPU compositing layers via `translate3d` and `will-change`.
- **Advanced Chunking**: Vite build configuration split into logical vendor chunks (React, GSAP, Three.js, Motion) for superior caching and parallel loading.
- **Zero CLS**: Strict layout discipline to prevent Content Layout Shift.

## 🛠 Tech Stack
- **Core**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 (Swiss-Brutalist Design System)
- **Animation**: GSAP (GreenSock) + Motion (formerly Framer Motion)
- **Smooth Scroll**: Lenis
- **3D/Shaders**: Three.js + R3F (Custom Dither Shader)
- **Build**: Vite 6 (Optimized ESBuild Minification)

## 🏗 Key Sections
- **Hero**: Dynamic Dither shader with mouse interaction.
- **Work**: Horizontal parallax engine with differential physics.
- **About**: Scroll-reveal narrative text with high-contrast typography.
- **Contact**: Terminal-style transmission center.

## 🚀 Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---
*Built by Andrew Dominic M — 2026*
