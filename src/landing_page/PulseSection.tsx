import { useState, useEffect, useRef, type RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarChart,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import scrollImage1 from "../assets/avatars/discussion.png";
import scrollImage2 from "../assets/avatars/eats.png";
import scrollImage3 from "../assets/avatars/laptop.png";
import scrollImage4 from "../assets/avatars/younglad.png";
import scrollImage5 from "../assets/avatars/collaboration.png";

interface PulseSectionProps {
  pulseContainerRef: RefObject<HTMLElement>;
  pulseScrollRef: RefObject<HTMLDivElement>;
  pulseHeadingRef: RefObject<HTMLDivElement>;
}

const PulseSection = ({
  pulseContainerRef,
  pulseHeadingRef,
}: PulseSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canNavigate, setCanNavigate] = useState(true);
  const [, setIsMobile] = useState(false);

  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Heading fade-in on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!pulseHeadingRef.current) return;

      const rect = pulseHeadingRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.95;

      if (isVisible) {
        pulseHeadingRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pulseHeadingRef]);

  // Get position of a card relative to current index
  const getRelativePosition = (itemIndex: number) => {
    const diff = itemIndex - currentIndex;
    const length = pulseItems.length;

    // Normalize to -length/2 to +length/2
    if (diff > length / 2) return diff - length;
    if (diff < -length / 2) return diff + length;
    return diff;
  };

  // Navigate carousel with GSAP animations
  const navigate = (direction: "next" | "prev") => {
    if (!canNavigate) return;

    setCanNavigate(false);

    const timeline = gsap.timeline({
      onComplete: () => {
        // Update index AFTER animation completes
        if (direction === "next") {
          setCurrentIndex((currentIndex + 1) % pulseItems.length);
        } else {
          setCurrentIndex(
            (currentIndex - 1 + pulseItems.length) % pulseItems.length,
          );
        }
        setCanNavigate(true);
      },
    });

    const naturalEase = "power1.inOut";
    const animationDuration = 0.7;

    // Animate ALL cards
    pulseItems.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (!card) return;

      const relPos = getRelativePosition(index);

      if (direction === "next") {
        // Moving forward: everything shifts left
        const currentX = relPos * 240;
        const currentScale = relPos === 0 ? 1.2 : 0.8;
        const currentOpacity =
          relPos === 0 ? 1 : relPos === -1 || relPos === 1 ? 0.5 : 0;

        const newRelPos = relPos - 1;
        const newX = newRelPos * 240;
        const newScale = newRelPos === 0 ? 1.2 : 0.8;
        const newOpacity =
          newRelPos === 0 ? 1 : newRelPos === -1 || newRelPos === 1 ? 0.5 : 0;

        timeline.fromTo(
          card,
          {
            x: currentX,
            scale: currentScale,
            opacity: currentOpacity,
          },
          {
            x: newX,
            scale: newScale,
            opacity: newOpacity,
            duration: animationDuration,
            ease: naturalEase,
          },
          0,
        );
      } else {
        // Moving backward: everything shifts right
        const currentX = relPos * 240;
        const currentScale = relPos === 0 ? 1.2 : 0.8;
        const currentOpacity =
          relPos === 0 ? 1 : relPos === -1 || relPos === 1 ? 0.5 : 0;

        const newRelPos = relPos + 1;
        const newX = newRelPos * 240;
        const newScale = newRelPos === 0 ? 1.2 : 0.8;
        const newOpacity =
          newRelPos === 0 ? 1 : newRelPos === -1 || newRelPos === 1 ? 0.5 : 0;

        timeline.fromTo(
          card,
          {
            x: currentX,
            scale: currentScale,
            opacity: currentOpacity,
          },
          {
            x: newX,
            scale: newScale,
            opacity: newOpacity,
            duration: animationDuration,
            ease: naturalEase,
          },
          0,
        );
      }
    });
  };

  // Get initial card style based on position
  const getCardStyle = (itemIndex: number) => {
    const relPos = getRelativePosition(itemIndex);

    const x = relPos * 240;
    const scale = relPos === 0 ? 1.2 : 0.8;
    const opacity = relPos === 0 ? 1 : relPos === -1 || relPos === 1 ? 0.5 : 0;
    const zIndex = relPos === 0 ? 10 : 5;
    const display = Math.abs(relPos) > 1 ? "none" : "block";

    return { x, scale, opacity, zIndex, display };
  };

  return (
    <section
      ref={pulseContainerRef}
      className="relative w-full py-12 md:py-16 z-30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div
          ref={pulseHeadingRef}
          className="flex flex-col items-center text-center mb-12 md:mb-20 space-y-3 md:space-y-4 relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-google-sans-flex flex items-center gap-3">
            <FontAwesomeIcon
              icon={faBarChart}
              className="text-teal-400 text-3xl md:text-5xl"
            />
            The Pulse
          </h2>

          <p className="text-gray-400 font-inter text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
            See what's trending on campus right now
          </p>

          <button className="mt-2 px-5 md:px-7 py-2.5 md:py-3 bg-teal-400 hover:bg-teal-500 text-black font-bold rounded-lg transition-all duration-300 flex items-center gap-2 text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105">
            View All
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden">
          <div className="relative h-112.5 md:h-130 lg:h-145 flex items-center justify-center">
            {/* Cards - Render ALL cards, animate them in place */}
            <div className="relative w-full h-full flex items-center justify-center">
              {pulseItems.map((item, index) => {
                const style = getCardStyle(index);

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="absolute cursor-pointer pointer-events-none"
                    style={{
                      transform: `translateX(${style.x}px) scale(${style.scale})`,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                      display: style.display,
                    }}
                  >
                    {/* Card Container - Base size is same for all */}
                    <div className="relative w-64 h-96 md:w-72 md:h-112.5 rounded-2xl overflow-hidden border-4 border-teal-500/40 hover:border-teal-300 shadow-2xl hover:shadow-2xl transition-all duration-300 pointer-events-auto">
                      {/* Image */}
                      <img
                        src={item.img}
                        alt={item.handle}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-linear-to-t ${item.gradient} opacity-20 hover:opacity-30 transition-opacity duration-300`}
                      ></div>

                      {/* Top Handle Bar */}
                      <div className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/80 via-black/50 to-transparent p-3 md:p-4 z-20">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-linear-to-br from-teal-400 to-cyan-600 flex items-center justify-center shrink-0">
                            <span className="text-xs md:text-sm font-bold text-white">
                              {item.handle.charAt(1).toUpperCase()}
                            </span>
                          </div>
                          <p className="text-white font-semibold text-sm md:text-base font-google-sans-flex truncate">
                            {item.handle}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Gradient Fade */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <>
              {/* Left Button */}
              <button
                onClick={() => navigate("prev")}
                disabled={!canNavigate}
                className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-teal-500/30 hover:bg-teal-500/50 text-teal-400 hover:text-teal-300 transition-all duration-300 disabled:opacity-30 shadow-lg backdrop-blur-sm cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-base md:text-lg"
                />
              </button>

              {/* Right Button */}
              <button
                onClick={() => navigate("next")}
                disabled={!canNavigate}
                className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-teal-500/30 hover:bg-teal-500/50 text-teal-400 hover:text-teal-300 transition-all duration-300 disabled:opacity-30 shadow-lg backdrop-blur-sm cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-base md:text-lg"
                />
              </button>
            </>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {pulseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (canNavigate && index !== currentIndex) {
                    setCanNavigate(false);
                    setCurrentIndex(index);
                    setTimeout(() => setCanNavigate(true), 700);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "bg-teal-400 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PulseSection;
