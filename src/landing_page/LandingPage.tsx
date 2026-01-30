import { useState, useEffect, useRef, type RefObject } from "react";
import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import HeroContent from "./HeroContent";
import NavBar from "./NavBar";
import PulseSection from "./PulseSection";

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Refs for mobile HeroContent
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  // Refs for mobile PulseSection
  const pulseContainerRef = useRef<HTMLElement>(null);
  const pulseScrollRef = useRef<HTMLDivElement>(null);
  const pulseHeadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="bg-[#102222] min-h-screen overflow-x-hidden">
      <NavBar />

      {/* Desktop: Render Hero (which contains everything in pinned scroll) */}
      {!isMobile && <Hero />}

      {/* Mobile: Render HeroContent and PulseSection as normal sections */}
      {isMobile && (
        <>
          {/* Mobile HeroContent Section - Dark background, relative positioning */}
          <section className="relative w-full bg-[#0a1515] pt-20 pb-16 px-6 max-[400px]:px-3">
            <div className="max-w-7xl mx-auto">
              <HeroContent
                badgeRef={badgeRef as RefObject<HTMLDivElement>}
                headingRef={headingRef as RefObject<HTMLHeadingElement>}
                descriptionRef={descriptionRef as RefObject<HTMLParagraphElement>}
                buttonsContainerRef={buttonsContainerRef as RefObject<HTMLDivElement>}
                avatarsRef={avatarsRef as RefObject<HTMLDivElement>}
                leftContentRef={leftContentRef as RefObject<HTMLDivElement>}
                imageWrapperRef={imageWrapperRef as RefObject<HTMLDivElement>}
                cardRef={cardRef as RefObject<HTMLDivElement>}
                rightContentRef={rightContentRef as RefObject<HTMLDivElement>}
              />
            </div>
          </section>

          {/* Mobile PulseSection - Different background (#102222) */ }
          <section className="relative w-full bg-[#152323]">
            <PulseSection
              pulseContainerRef={pulseContainerRef as RefObject<HTMLElement>}
              pulseScrollRef={pulseScrollRef as RefObject<HTMLDivElement>}
              pulseHeadingRef={pulseHeadingRef as RefObject<HTMLDivElement>}
            />
          </section>
        </>
      )}

      <FeaturesSection />
    </main>
  );
};

export default LandingPage;
