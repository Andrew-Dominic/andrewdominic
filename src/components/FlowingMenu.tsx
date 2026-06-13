import { useRef } from 'react';
import { gsap } from 'gsap';
import LogoLoop, { LogoItem } from './LogoLoop';
import './FlowingMenu.css';

export interface MenuItemProps {
  link: string;
  text: string;
  logos?: LogoItem[];
  speed?: number;
  textColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

export default function FlowingMenu({
  items = [],
  speed = 100,
  textColor = '#fff',
  bgColor = 'transparent',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = 'rgba(255,255,255,0.1)'
}: {
  items: MenuItemProps[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, logos = [], speed = 100, textColor, marqueeBgColor, marqueeTextColor, borderColor }: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <div
        className="menu__item-link font-helvetica tracking-[-0.02em] md:text-[5vh] text-[4vh] cursor-default"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </div>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap flex items-center h-full">
          <div className="marquee__inner w-full flex items-center h-full" ref={marqueeInnerRef}>
            {logos.length > 0 && (
              <LogoLoop
                logos={logos}
                speed={speed}
                direction="left"
                logoHeight={40}
                gap={60}
                hoverSpeed={30}
                scaleOnHover={true}
                fadeOut={false}
                renderItem={(item, key) => (
                  <div key={key} className="flex items-center gap-3 font-helvetica tracking-[0.05em] py-2" style={{ color: marqueeTextColor }}>
                    <span className="text-3xl md:text-5xl flex items-center justify-center">{item.node}</span>
                    <span className="font-bold text-xl md:text-3xl uppercase whitespace-nowrap">{item.title}</span>
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
