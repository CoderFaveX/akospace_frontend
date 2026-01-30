import { useState, type RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import heroImg from "../assets/avatars/discussion2.png";

interface HeroContentProps {
  badgeRef: RefObject<HTMLDivElement>;
  headingRef: RefObject<HTMLHeadingElement>;
  descriptionRef: RefObject<HTMLParagraphElement>;
  buttonsContainerRef: RefObject<HTMLDivElement>;
  avatarsRef: RefObject<HTMLDivElement>;
  leftContentRef: RefObject<HTMLDivElement>;
  imageWrapperRef: RefObject<HTMLDivElement>;
  cardRef: RefObject<HTMLDivElement>;
  rightContentRef: RefObject<HTMLDivElement>;
}

const HeroContent = ({
  badgeRef,
  headingRef,
  descriptionRef,
  buttonsContainerRef,
  avatarsRef,
  leftContentRef,
  imageWrapperRef,
  cardRef,
  rightContentRef,
}: HeroContentProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 xl:gap-12 lg:items-center">
      {/* Mobile: Image First, Desktop: Image on Right */}
      <div
        ref={rightContentRef}
        className="relative order-1 lg:order-2 mb-8 lg:mb-0 lg:mt-0 md:max-w-sm lg:max-w-none md:mx-auto lg:mx-0"
      >
        <div
          ref={imageWrapperRef}
          className="relative rounded-xl xl:rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Skeleton Loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer bg-[length:200%_100%] z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
          )}

          {/* Hero Image */}
          <img
            src={heroImg}
            alt="Students collaborating"
            className={`w-full h-auto transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          <div
            className={`absolute inset-0 bg-linear-to-t from-black/60 to-transparent transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        {/* Floating Pitch Card - More compact on laptop */}
        <div
          ref={cardRef}
          className={`absolute -bottom-4 xl:-bottom-6 left-4 xl:left-6 right-4 xl:right-6 bg-[#1a1a1a]/95 backdrop-blur-xl border border-gray-700/50 rounded-lg xl:rounded-xl p-3 xl:p-4 shadow-2xl transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 xl:gap-3">
              <div className="w-10 xl:w-12 h-10 xl:h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faMicrophone}
                  className="text-teal-400 text-lg xl:text-xl"
                />
              </div>
              <div>
                <p className="text-[10px] xl:text-xs text-teal-400 font-semibold uppercase tracking-wide">
                  New Pitch
                </p>
                <p className="text-white font-medium text-xs xl:text-sm">
                  Chinedu's Graphic Design Hub
                </p>
              </div>
            </div>
            <button className="px-3 xl:px-5 py-1.5 xl:py-2 bg-white text-black font-inter cursor-pointer font-bold rounded-lg hover:bg-teal-400 transition-all text-xs xl:text-sm">
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Content Below Image, Desktop: Content on Left */}
      <div
        ref={leftContentRef}
        className="space-y-4 md:space-y-3 xl:space-y-6 order-2 lg:order-1"
      >
        {/* Badge - Smaller on laptop screens */}
        <div ref={badgeRef} className="flex justify-center lg:justify-start">
          <span className="px-3 xl:px-4 py-1.5 xl:py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-[10px] xl:text-xs font-semibold uppercase tracking-wider flex items-center gap-2 w-fit">
            <span className="w-1.5 xl:w-2 h-1.5 xl:h-2 bg-teal-400 rounded-full animate-pulse"></span>
            Live at Unilag
          </span>
        </div>

        {/* Heading - Responsive sizing, centered on mobile */}
        <h1
          ref={headingRef}
          className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-google-sans-flex font-bold leading-tight overflow-hidden text-center lg:text-left"
        >
          <span className="bg-linear-to-b from-[#ffffff] to-[#3987f6] bg-clip-text text-transparent">
            The Heartbeat of Campus:
          </span>
          <br />
          <span className="text-teal-400">Connect, Create, & Scale.</span>
        </h1>

        {/* Description - Centered on mobile */}
        <p
          ref={descriptionRef}
          className="text-sm md:text-base xl:text-lg font-google-sans-flex text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 overflow-hidden text-center lg:text-left"
        >
          A fullstack platform for students, consultants, and businesses. Join
          the vibrant Nigerian community today to network, share your vibes, and
          pitch your hustle.
        </p>

        {/* Buttons - Centered on mobile */}
        <div
          ref={buttonsContainerRef}
          className="flex flex-wrap gap-3 xl:gap-4 pt-2 justify-center lg:justify-start"
        >
          <button className="px-5 xl:px-8 py-2 xl:py-3 text-sm xl:text-base bg-teal-400 text-black font-semibold rounded-lg transition-all duration-300 hover:bg-transparent hover:border-gray-700 hover:border cursor-pointer hover:text-teal-400 hover:scale-105 hover:shadow-lg">
            Get Started
          </button>

          <button className="px-5 xl:px-8 py-2 xl:py-3 text-sm xl:text-base border-2 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 xl:gap-3 hover:bg-teal-400 hover:text-black cursor-pointer hover:border-teal-400 group">
            <div className="w-6 xl:w-8 h-6 xl:h-8 rounded-full border-2 border-white group-hover:border-black flex items-center justify-center transition-all">
              <FontAwesomeIcon
                icon={faPlay}
                className="text-[10px] xl:text-xs ml-0.5 group-hover:text-black transition-colors"
              />
            </div>
            Learn More
          </button>
        </div>

        {/* Avatars - Centered on mobile */}
        <div
          ref={avatarsRef}
          className="flex items-center gap-3 xl:gap-4 pt-2 xl:pt-4 justify-center lg:justify-start"
        >
          <div className="flex -space-x-2 xl:-space-x-3">
            <div className="avatar-circle w-8 xl:w-10 h-8 xl:h-10 rounded-full bg-linear-to-br from-teal-400 to-cyan-600 border-2 border-[#0a1515]"></div>
            <div className="avatar-circle w-8 xl:w-10 h-8 xl:h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-600 border-2 border-[#0a1515]"></div>
            <div className="avatar-circle w-8 xl:w-10 h-8 xl:h-10 rounded-full bg-linear-to-br from-orange-400 to-red-600 border-2 border-[#0a1515]"></div>
            <div className="avatar-circle w-8 xl:w-10 h-8 xl:h-10 rounded-full bg-gray-800 border-2 border-[#0a1515] text-white flex items-center justify-center text-[10px] xl:text-xs font-semi-bold">
              +2k
            </div>
          </div>
          <span className="join-text text-gray-500 text-xs xl:text-sm font-semibold font-inter">
            Join 2,000+ students today
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
