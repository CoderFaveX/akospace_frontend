import { useState, useEffect, useRef, type RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarChart,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faHandFist,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

import scrollImage1 from "../assets/avatars/discussion.png";
import scrollImage2 from "../assets/avatars/eats.png";
import scrollImage3 from "../assets/avatars/laptop.png";
import scrollImage4 from "../assets/avatars/younglad.png";
import scrollImage5 from "../assets/avatars/collaboration.png";

interface PulseSectionProps {
  pulseContainerRef: RefObject<HTMLElement | null>;
  pulseHeadingRef: RefObject<HTMLDivElement | null>;
}

const PulseSection = ({
  pulseContainerRef,
  pulseHeadingRef,
}: PulseSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canNavigate, setCanNavigate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const pulseItems = [
    {
      img: scrollImage1,
      handle: "@funmi",
      gradient: "from-teal-400 to-cyan-600",
    },
    {
      img: scrollImage2,
      handle: "@squad_goals",
      gradient: "from-purple-400 to-pink-600",
    },
    {
      img: scrollImage3,
      handle: "@biz_hub",
      gradient: "from-amber-400 to-orange-600",
    },
    {
      img: scrollImage4,
      handle: "@tech_bro",
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      img: scrollImage5,
      handle: "@lagos_eats",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      img: scrollImage1,
      handle: "@younglad",
      gradient: "from-rose-400 to-red-600",
    },
    {
      img: scrollImage2,
      handle: "@collab",
      gradient: "from-violet-400 to-purple-600",
    },
    {
      img: scrollImage3,
      handle: "@scholar",
      gradient: "from-cyan-400 to-teal-600",
    },
    {
      img: scrollImage4,
      handle: "@campus_life",
      gradient: "from-green-400 to-teal-600",
    },
    {
      img: scrollImage5,
      handle: "@study_squad",
      gradient: "from-orange-400 to-red-600",
    },
  ];

  /* -------------------- 3D Logic (from Code 1) -------------------- */
  const getRelativePosition = (index: number) => {
    const diff = index - currentIndex;
    const len = pulseItems.length;
    if (diff > len / 2) return diff - len;
    if (diff < -len / 2) return diff + len;
    return diff;
  };

  const get3DState = (rel: number) => {
    const spacing = isMobile ? 160 : 240;
    return {
      x: rel * spacing,
      z: rel === 0 ? 0 : Math.abs(rel) === 1 ? -180 : -350,
      rotateY: rel === 0 ? 0 : rel > 0 ? -30 : 30,
      opacity: Math.abs(rel) > 1 ? 0 : rel === 0 ? 1 : 0.6,
      zIndex: 100 - Math.abs(rel) * 10,
      display: Math.abs(rel) > 2 ? "none" : "block",
      scale: rel === 0 ? 1.15 : 0.85,
    };
  };

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!pulseHeadingRef.current || isVisible) return;
      const rect = pulseHeadingRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pulseHeadingRef, isVisible]);

  /* -------------------- Navigation (Merged) -------------------- */
  const animateToIndex = (nextIndex: number) => {
    if (!canNavigate) return;
    setCanNavigate(false);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setCanNavigate(true);
      },
    });

    pulseItems.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      const rel = getRelativePosition(i);
      const from = get3DState(rel);
      const to = get3DState(rel + (nextIndex > currentIndex ? -1 : 1));

      tl.fromTo(
        card,
        {
          x: from.x,
          z: from.z,
          rotateY: from.rotateY,
          opacity: from.opacity,
          scale: from.scale,
        },
        {
          x: to.x,
          z: to.z,
          rotateY: to.rotateY,
          opacity: to.opacity,
          scale: to.scale,
          duration: 0.7,
          ease: "power3.out",
        },
        0,
      );
    });
  };

  const next = () => animateToIndex((currentIndex + 1) % pulseItems.length);
  const prev = () =>
    animateToIndex((currentIndex - 1 + pulseItems.length) % pulseItems.length);

  /* -------------------- Handlers -------------------- */
  const start = (x: number) => {
    touchStartX.current = x;
    isDragging.current = true;
  };
  const move = (x: number) => {
    if (isDragging.current) touchEndX.current = x;
  };
  const end = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  };

  return (
    <>
      <div className="glass-line w-full mx-auto h-1 rounded-full bg-white/5" />
      <section
        ref={pulseContainerRef as any}
        className="relative w-full py-16 md:py-20 xl:py-24 bg-[#0a1515] overflow-hidden z-50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header & Button from Code 2 */}
          <div
            ref={pulseHeadingRef as any}
            className={`flex flex-col items-center text-center mb-8 md:mb-12 space-y-4 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white flex items-center gap-3">
              <FontAwesomeIcon icon={faBarChart} className="text-teal-400" />
              The Pulse
            </h2>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl">
              See what's trending on campus right now
            </p>
            <button
              className="mt-4 px-6 py-3 rounded-full text-white font-semibold text-sm bg-white/10 backdrop-blur-md border border-white/20 hover:bg-teal-400/20 hover:border-teal-400/40 hover:scale-105 shadow-lg transition-all flex items-center gap-2 cursor-pointer opacity-100!"
              style={{ opacity: isVisible ? 1 : 0, transitionDelay: "300ms" }}
            >
              View All <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          {/* 3D Carousel Stage */}
          <div
            ref={carouselRef}
            className="relative h-80 md:h-128 flex items-center justify-center select-none"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            onMouseDown={(e) => start(e.clientX)}
            onMouseMove={(e) => move(e.clientX)}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={(e) => start(e.touches[0].clientX)}
            onTouchMove={(e) => move(e.touches[0].clientX)}
            onTouchEnd={end}
          >
            {pulseItems.map((item, i) => {
              const rel = getRelativePosition(i);
              const s = get3DState(rel);

              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) cardRefs.current[i] = el;
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    transform: `translateX(${s.x}px) translateZ(${s.z}px) rotateY(${s.rotateY}deg) scale(${s.scale})`,
                    opacity: s.opacity,
                    zIndex: s.zIndex,
                    display: s.display,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="w-48 h-72 md:w-64 md:h-96 xl:w-72 xl:h-112 rounded-lg overflow-hidden pointer-events-auto cursor-pointer relative group"
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Main Glass Card */}
                    <div className="absolute inset-0 rounded-lg bg-linear-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 overflow-hidden">
                      {/* Background Image with Overlay */}
                      <div className="absolute inset-0">
                        <img
                          src={item.img}
                          alt={item.handle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          draggable={false}
                        />
                        {/* Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-black/40" />
                        {/* Gradient Color Tint */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${item.gradient} mix-blend-overlay opacity-40`}
                        />
                      </div>

                      {/* Content Layer */}
                      <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-6 z-10">
                        {/* Top: User Handle */}
                        <div className="flex items-center gap-2 md:gap-3">
                          <div
                            className={`w-7 h-7 md:w-10 md:h-10 rounded-full bg-linear-to-br ${item.gradient} flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/30`}
                          >
                            <span className="text-[10px] md:text-sm font-bold text-white font-google-sans-flex">
                              {item.handle.charAt(1).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-white/90 font-semibold text-xs md:text-base font-google-sans-flex drop-shadow-lg">
                            {item.handle}
                          </span>
                        </div>

                        {/* Bottom: Main Content */}
                        <div className="space-y-1 md:space-y-2">
                          <h3 className="text-white text-base md:text-xl xl:text-2xl font-bold font-google-sans-flex leading-tight">
                            Connect
                          </h3>
                          <p className="text-white/80 text-[10px] md:text-xs xl:text-sm font-inter leading-relaxed">
                            See what's happening on campus
                          </p>
                        </div>
                      </div>

                      {/* Glass Reflection/Shine Effect */}
                      <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent opacity-30 pointer-events-none" />

                      {/* Subtle Inner Shadow for Depth */}
                      <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_2px_20px_rgba(0,0,0,0.3)] pointer-events-none" />
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl ring-5 ring-teal-400/0 group-hover:ring-teal-400/10 transition-all duration-500 pointer-events-none" />
                  </div>
                </div>
              );
            })}

            {/* Nav Arrows */}
            {/* Nav Arrows - Hidden on Mobile */}
            <button
              onClick={prev}
              className="hidden md:flex absolute left-2 md:left-8 z-50 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 hover:bg-teal-500/40 transition-all cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={next}
              className="hidden md:flex absolute right-2 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 hover:bg-teal-500/40 transition-all cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {pulseItems.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  canNavigate && index !== currentIndex && animateToIndex(index)
                }
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-teal-400" : "w-2 bg-gray-600"}`}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <div className="md:hidden flex justify-center mt-6">
            <span className="px-4 py-2 border border-teal-500/30 rounded-full text-teal-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              Swipe to explore <FontAwesomeIcon icon={faHandFist} />
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default PulseSection;
