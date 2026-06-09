import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log("Navigating to http://localhost:3000...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait for React to mount and GSAP to initialize
  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
  await delay(3000);
  
  console.log("Scrolling to trigger any lazy effects...");
  // Scroll down a bit to ensure triggers are updated
  await page.evaluate(async () => {
    window.scrollBy(0, window.innerHeight * 2);
    await new Promise(r => setTimeout(r, 500));
    window.scrollBy(0, window.innerHeight * 2);
    await new Promise(r => setTimeout(r, 500));
    window.scrollTo(0, 0);
  });

  await delay(1000);

  console.log("Extracting GSAP ScrollTrigger data...");
  const gsData = await page.evaluate(() => {
    if (!(window as any).ScrollTrigger) {
      return { error: "ScrollTrigger not found on window. Ensure it is exposed in main.tsx." };
    }
    
    const triggers = (window as any).ScrollTrigger.getAll();
    const stData = triggers.map((st: any, i: number) => {
      let componentName = "Unknown";
      if (st.trigger) {
        componentName = st.trigger.className || st.trigger.id || st.trigger.tagName;
      }
      
      let pinTarget = null;
      if (st.pin) {
        pinTarget = st.pin.className || st.pin.id || st.pin.tagName;
      }

      const spacer = st.pin?.parentElement;
      const spacerHeight = spacer && spacer.classList.contains('pin-spacer') ? spacer.offsetHeight : null;

      return {
        id: st.id || `Trigger_${i}`,
        componentName,
        triggerElement: componentName,
        pinTarget,
        start: st.start,
        end: st.end,
        scrub: st.scrub,
        pinSpacing: st.vars.pinSpacing,
        spacerHeight,
        progress: st.progress
      };
    });

    const spacers = Array.from(document.querySelectorAll('.pin-spacer')).map(el => {
      const rect = el.getBoundingClientRect();
      const st = el.querySelector('section, div');
      const innerClass = st ? st.className : 'unknown';
      return {
        className: el.className,
        innerElement: innerClass,
        top: rect.top + window.scrollY,
        height: (el as HTMLElement).offsetHeight,
        paddingBottom: (el as HTMLElement).style.paddingBottom
      };
    });

    // Case Studies specific measurements
    const track = document.querySelector('.lg\\:flex-1 .flex-col.lg\\:flex-row') as HTMLElement;
    const contentWrapper = document.querySelector('#work .will-change-transform') as HTMLElement;
    let trackWidth = 0;
    let trackClient = 0;
    let contentWrapperWidth = 0;
    if (track) {
      trackWidth = track.scrollWidth;
      trackClient = track.clientWidth;
    }
    if (contentWrapper) {
      contentWrapperWidth = contentWrapper.clientWidth;
    }

    return {
      triggers: stData,
      spacers,
      measurements: {
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight,
        trackScrollWidth: trackWidth,
        trackClientWidth: trackClient,
        contentWrapperWidth: contentWrapperWidth
      }
    };
  });

  console.log(JSON.stringify(gsData, null, 2));

  await browser.close();
})();
