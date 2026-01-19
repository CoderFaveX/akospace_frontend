import React, { useEffect, useRef, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBackground from "./HeroBackground";
import HeroText from "./HeroText";
import HeroTagline from "./HeroTagline";
import ScrollIndicator from "./ScrollIndicator";
import HeroContent from "./HeroContent";
import PulseSection from "./PulseSection";
import { useHeroAnimations } from "./useHeroAnimations";
import FeaturesSection from "./FeaturesSection";

const Hero = () => {
  // Hero refs
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);

  // Content refs
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  // Pulse refs
  const pulseContainerRef = useRef<HTMLElement>(null);
  const pulseScrollRef = useRef<HTMLDivElement>(null);
  const pulseHeadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  // Initialize all animations

  useHeroAnimations({
    containerRef,
    imageRef,
    overlayRef,
    textRef,
    taglineRef,
    scrollIndicatorRef,
    leftContentRef,
    rightContentRef,
    badgeRef,
    headingRef,
    descriptionRef,
    avatarsRef,
    imageWrapperRef,
    cardRef,
    pulseContainerRef,
    pulseScrollRef,
    pulseHeadingRef,
  });

  const handleScrollDown = () => {
    const targetPosition = window.innerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start: number | null = null;

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0a1515] overflow-hidden min-h-screen"
    >
      <HeroBackground
        imageRef={imageRef as RefObject<HTMLDivElement>}
        overlayRef={overlayRef as RefObject<HTMLDivElement>}
      />

      <HeroText textRef={textRef as RefObject<HTMLHeadingElement>} />

      <HeroTagline taglineRef={taglineRef as RefObject<HTMLHeadingElement>} />

      <ScrollIndicator
        scrollIndicatorRef={scrollIndicatorRef as RefObject<HTMLButtonElement>}
        handleScrollDown={handleScrollDown}
      />

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
      <PulseSection
        pulseContainerRef={pulseContainerRef as RefObject<HTMLElement>}
        pulseScrollRef={pulseScrollRef as RefObject<HTMLDivElement>}
        pulseHeadingRef={pulseHeadingRef as RefObject<HTMLDivElement>}
      />

    </section>
  );
};

export default Hero;
