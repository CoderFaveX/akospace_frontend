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
  const [isMobile, setIsMobile] = useState(false);

  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  // Touch/swipe state
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

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const swipeThreshold = 50; // Minimum distance for swipe
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swiped left - go to next
        navigate("next");
      } else {
        // Swiped right - go to previous
        navigate("prev");
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Mouse event handlers for desktop drag (optional)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    touchStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || isMobile) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current || isMobile) return;
    isDragging.current = false;

    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        navigate("next");
      } else {
        navigate("prev");
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      touchStartX.current = 0;
      touchEndX.current = 0;
    }
  };

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
        const currentX = relPos * (isMobile ? 150 : 200);
        const currentScale = relPos === 0 ? 1.2 : 0.8;
        const currentOpacity =
          relPos === 0 ? 1 : relPos === -1 || relPos === 1 ? 0.5 : 0;

        const newRelPos = relPos - 1;
        const newX = newRelPos * (isMobile ? 150 : 200);
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
        const currentX = relPos * (isMobile ? 150 : 200);
        const currentScale = relPos === 0 ? 1.2 : 0.8;
        const currentOpacity =
          relPos === 0 ? 1 : relPos === -1 || relPos === 1 ? 0.5 : 0;

        const newRelPos = relPos + 1;
        const newX = newRelPos * (isMobile ? 150 : 200);
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

    const x = relPos * (isMobile ? 150 : 200);
    const scale = relPos === 0 ? 1.2 : 0.8;
    const opacity = relPos === 0 ? 1 : relPos === -1 || relPos === 1 ? 0.5 : 0;
    const zIndex = relPos === 0 ? 10 : 5;
    const display = Math.abs(relPos) > 1 ? "none" : "block";

    return { x, scale, opacity, zIndex, display };
  };

  return (
    <section
      ref={pulseContainerRef}
      className="relative w-full py-10 xl:py-12 2xl:py-16 z-30"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12 2xl:px-20">
        {/* Header - More compact on laptop */}
        <div
          ref={pulseHeadingRef}
          className="flex flex-col pt-10 items-center text-center mb-5 xl:mb-10 2xl:mb-12 space-y-2 xl:space-y-3 2xl:space-y-4 relative"
        >
          <h2 className="text-3xl sm:text-4xl md:text-3xl xl:text-5xl 2xl:text-6xl font-bold text-white font-google-sans-flex flex items-center gap-2 xl:gap-3">
            <FontAwesomeIcon
              icon={faBarChart}
              className="text-teal-400 text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl"
            />
            The Pulse
          </h2>

          <p className="text-gray-400 font-inter text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl max-w-2xl">
            See what's trending on campus right now
          </p>

          <button
            className="
  mt-1 xl:mt-2
  px-5 md:px-6 xl:px-8
  py-2.5 md:py-3
  rounded-4xl
  text-white font-semibold text-xs md:text-sm xl:text-base
  bg-white/10 backdrop-blur-md
  border border-white/20
  transition-all duration-300
  hover:bg-teal-400/20
  hover:border-teal-400/40
  hover:scale-105
  shadow-lg opacity-100! cursor-pointer
  flex items-center gap-2
"
          >
            View All
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {/* Carousel Container - Reduced height for laptop */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={carouselRef}
            className="relative h-96 md:h-104 xl:h-120 2xl:h-144 flex items-center justify-center select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Cards - Render ALL cards, animate them in place */}
            <div className="relative w-full h-full flex items-center justify-center z-30 mt-5">
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
                    {/* Card Container - Smaller on laptop */}
                    <div className="relative w-44 h-72 sm:w-52 sm:h-80 md:w-60 md:h-96 xl:w-64 xl:h-104 2xl:w-72 2xl:h-112 rounded-xl xl:rounded-2xl overflow-hidden border-2 xl:border-4 border-teal-500/40 hover:border-teal-300 shadow-2xl hover:shadow-2xl transition-all duration-300 pointer-events-auto">
                      {/* Image */}
                      <img
                        src={item.img}
                        alt={item.handle}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        draggable={false}
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-linear-to-t ${item.gradient} opacity-20 hover:opacity-30 transition-opacity duration-300`}
                      ></div>

                      {/* Top Handle Bar */}
                      <div className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/80 via-black/50 to-transparent p-2 md:p-3 xl:p-4 z-20">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 md:w-8 md:h-8 xl:w-10 xl:h-10 rounded-full bg-linear-to-br from-teal-400 to-cyan-600 flex items-center justify-center shrink-0">
                            <span className="text-xs md:text-xs xl:text-sm font-bold text-white">
                              {item.handle.charAt(1).toUpperCase()}
                            </span>
                          </div>
                          <p className="text-white font-semibold text-xs md:text-sm xl:text-base font-google-sans-flex truncate">
                            {item.handle}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Gradient Fade */}
                      <div className="absolute bottom-0 left-0 right-0 h-20 xl:h-24 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
            <>
              {/* Left Button */}
              <button
                onClick={() => navigate("prev")}
                disabled={!canNavigate}
                className="absolute left-2 md:left-4 xl:left-8 2xl:left-12 top-1/2 -translate-y-1/2 z-40 w-9 h-9 md:w-10 md:h-10 xl:w-12 xl:h-12 hidden md:flex items-center justify-center rounded-full bg-teal-500/30 hover:bg-teal-500/50 text-teal-400 hover:text-teal-300 transition-all duration-300 disabled:opacity-30 shadow-lg backdrop-blur-sm cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-sm md:text-base xl:text-lg"
                />
              </button>

              {/* Right Button */}
              <button
                onClick={() => navigate("next")}
                disabled={!canNavigate}
                className="absolute right-2 md:right-4 xl:right-8 2xl:right-12 top-1/2 -translate-y-1/2 z-40 w-9 h-9 md:w-10 md:h-10 xl:w-12 xl:h-12 hidden md:flex items-center justify-center rounded-full bg-teal-500/30 hover:bg-teal-500/50 text-teal-400 hover:text-teal-300 transition-all duration-300 disabled:opacity-30 shadow-lg backdrop-blur-sm cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-sm md:text-base xl:text-lg"
                />
              </button>
            </>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6 xl:mt-8">
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
                    ? "bg-teal-400 w-6 xl:w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile swipe hint - only shown on mobile */}
        <button
              className="mx-auto my-5 hidden max-[400]:block px-3 xl:px-4 py-1.5 xl:py-2 bg-[#0a1515]/10 cursor-pointer font-inter hover:bg-[#0a151515/20 border border-teal-500/50 rounded-full text-teal-400 text-xs xl:text-sm font-semibold transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
            >
              <span className="sm:inline">Swipe To Navigate</span>
              <FontAwesomeIcon icon={faHandFist} className="text-xs xl:text-sm" />
            </button>
      </div>
    </section>
  );
};

export default PulseSection;
