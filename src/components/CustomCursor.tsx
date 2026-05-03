import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Smooth follow with GSAP ticker
    const update = () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      gsap.set(dot, { x: pos.x, y: pos.y });
      gsap.set(label, { x: pos.x, y: pos.y });
    };

    // Detect hover on project images
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".card-photo")) {
        setIsHoveringImage(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".card-photo")) {
        setIsHoveringImage(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    gsap.ticker.add(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: isHoveringImage ? "80px" : "14px",
          height: isHoveringImage ? "80px" : "14px",
          borderRadius: "50%",
          backgroundColor: isHoveringImage ? "white" : "white",
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* "View Project" label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          width: "80px",
          height: "80px",
          transform: "translate(-50%, -50%)",
          opacity: isHoveringImage ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span className="text-[0.45rem] font-header font-bold tracking-[0.15em] uppercase text-grit-900 text-center leading-tight">
          VIEW<br />PROJECT
        </span>
      </div>
    </>
  );
}
