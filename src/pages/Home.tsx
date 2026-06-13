import CapsulePortal from "../components/CapsulePortal";
import CaseStudies from "../components/CaseStudies";
import FounderNarrative from "../components/FounderNarrative";
import ContactFooter from "../components/ContactFooter";
import SmoothScroll from "../components/SmoothScroll";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <CapsulePortal />
      <CaseStudies />
      <FounderNarrative />
      <ContactFooter />
    </SmoothScroll>
  );
}
