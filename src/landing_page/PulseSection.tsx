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
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
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

  /* -------------------- Image Loading Handler -------------------- */
  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  /* -------------------- 3D Logic -------------------- */
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

  /* -------------------- Navigation with Seamless Loop -------------------- */
  const animateToIndex = (direction: "next" | "prev") => {
    if (!canNavigate) return;
    setCanNavigate(false);

    const tl = gsap.timeline({
      onComplete: () => {
        if (direction === "next") {
          setCurrentIndex((prev) => (prev + 1) % pulseItems.length);
        } else {
          setCurrentIndex(
            (prev) => (prev - 1 + pulseItems.length) % pulseItems.length,
          );
        }
        setCanNavigate(true);
      },
    });

    pulseItems.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      const rel = getRelativePosition(i);
      const from = get3DState(rel);
      const newRel = direction === "next" ? rel - 1 : rel + 1;
      const to = get3DState(newRel);

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

  const next = () => animateToIndex("next");
  const prev = () => animateToIndex("prev");

  /* -------------------- Touch Handlers with iOS Safari Fix -------------------- */
  const start = (x: number, y: number) => {
    touchStartX.current = x;
    touchStartY.current = y;
    isDragging.current = true;
  };

  const move = (
    x: number,
    y: number,
    e: React.TouchEvent | React.MouseEvent,
  ) => {
    if (!isDragging.current) return;

    touchEndX.current = x;

    const deltaX = Math.abs(x - touchStartX.current);
    const deltaY = Math.abs(y - touchStartY.current);

    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
    }
  };

  const end = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = Math.abs(
      touchStartY.current - (touchEndX.current || touchStartX.current),
    );

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      deltaX > 0 ? next() : prev();
    }

    touchStartX.current = 0;
    touchStartY.current = 0;
    touchEndX.current = 0;
  };

  return (
    <>
      <div className="glass-line w-full mx-auto h-1 rounded-full bg-white/5" />
      <section
        ref={pulseContainerRef as any}
        className="relative w-full py-16 md:py-20 xl:py-24 bg-[#0a1515] overflow-hidden z-50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header & Button */}
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
            className="relative h-80 md:h-128 flex items-center justify-center select-none touch-pan-y"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
              touchAction: "pan-y",
            }}
            onMouseDown={(e) => start(e.clientX, e.clientY)}
            onMouseMove={(e) => {
              if (isDragging.current) {
                move(e.clientX, e.clientY, e);
              }
            }}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={(e) => {
              start(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              move(e.touches[0].clientX, e.touches[0].clientY, e);
            }}
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
                      {/* Background Image with Skeleton Loader */}
                      <div className="absolute inset-0">
                        {/* Enhanced Skeleton Loader */}
                        {!loadedImages[i] && (
                          <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm overflow-hidden">
                            {/* Animated shimmer wave */}
                            <div 
                              className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                              }}
                            />
                            
                            {/* Pulsing skeleton structure */}
                            <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-between animate-pulse">
                              {/* Top skeleton elements */}
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gray-700/50" />
                                <div className="h-3 md:h-4 w-20 md:w-24 bg-gray-700/50 rounded" />
                              </div>
                              
                              {/* Bottom skeleton elements */}
                              <div className="space-y-2">
                                <div className="h-4 md:h-6 w-24 md:w-32 bg-gray-700/50 rounded" />
                                <div className="h-2 md:h-3 w-32 md:w-40 bg-gray-700/50 rounded" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actual Image */}
                        <img
                          src={item.img}
                          alt={item.handle}
                          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
                            loadedImages[i] ? "opacity-100" : "opacity-0"
                          }`}
                          draggable={false}
                          onLoad={() => handleImageLoad(i)}
                        />

                        {/* Dark Overlay for Text Readability */}
                        <div
                          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
                            loadedImages[i] ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {/* Gradient Color Tint */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${item.gradient} mix-blend-overlay transition-opacity duration-500 ${
                            loadedImages[i] ? "opacity-40" : "opacity-0"
                          }`}
                        />
                      </div>

                      {/* Content Layer */}
                      <div className={`absolute inset-0 flex flex-col justify-between p-3 md:p-6 z-10 transition-opacity duration-500 ${
                        loadedImages[i] ? "opacity-100" : "opacity-0"
                      }`}>
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
                onClick={() => {
                  if (canNavigate && index !== currentIndex) {
                    const totalItems = pulseItems.length;
                    const forwardDistance =
                      (index - currentIndex + totalItems) % totalItems;
                    const backwardDistance =
                      (currentIndex - index + totalItems) % totalItems;

                    if (forwardDistance <= backwardDistance) {
                      for (let i = 0; i < forwardDistance; i++) {
                        setTimeout(() => next(), i * 100);
                      }
                    } else {
                      for (let i = 0; i < backwardDistance; i++) {
                        setTimeout(() => prev(), i * 100);
                      }
                    }
                  }
                }}
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
