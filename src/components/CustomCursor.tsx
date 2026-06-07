import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Smooth lerp loop at 60fps — fast factor (0.3) for buttery motion without visible lag
    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.65;
      pos.y += (mouse.y - pos.y) * 0.65;
      const tx = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      dot.style.transform = tx;
      label.style.transform = tx;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

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

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full hidden md:block"
        style={{
          width: isHoveringImage ? "80px" : "14px",
          height: isHoveringImage ? "80px" : "14px",
          backgroundColor: "white",
          mixBlendMode: "difference",
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      {/* "View Project" label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          width: "80px",
          height: "80px",
          opacity: isHoveringImage ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="text-[0.45rem] font-header font-bold tracking-[0.15em] uppercase text-grit-900 text-center leading-tight">
          VIEW<br />PROJECT
        </span>
      </div>
    </>
  );
}

