import type { RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import heroImg from "../assets/avatars/discussion2.png";
import FeaturesSection from "./FeaturesSection";

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
  return (
    <section
      className="absolute inset-0 w-full h-screen flex flex-col items-center justify-center z-30"
      style={{
        pointerEvents: "none",
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20">
        <div
          className="grid lg:grid-cols-2 gap-12 items-center"
          style={{ pointerEvents: "auto" }}
        >
          {/* Left Content */}
          <div ref={leftContentRef} className="space-y-6">
            {/* Badge */}
            <div ref={badgeRef} className="inline-block">
              <span className="px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 w-fit">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                Live at Unilag
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-3xl md:text-5xl font-google-sans-flex lg:text-5xl font-bold leading-tight overflow-hidden bg-linear-to-b from-[#ffffff] to-[#3987f6] bg-clip-text text-transparent"
            >
              The Heartbeat of Campus: Connect, Create, & Scale.
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-base md:text-lg font-google-sans-flex text-gray-400 leading-relaxed max-w-xl overflow-hidden"
            >
              A fullstack platform for students, consultants, and businesses.
              Join the vibrant Nigerian community today to network, share your
              vibes, and pitch your hustle.
            </p>

            {/* Buttons */}
            <div ref={buttonsContainerRef} className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-teal-400 text-black font-semibold rounded-lg transition-all duration-300 hover:bg-transparent hover:border-gray-700 hover:border cursor-pointer hover:text-teal-400 hover:scale-105 hover:shadow-lg">
                Get Started
              </button>

              <button className="px-8 py-3 border-2 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-teal-400 hover:text-black cursor-pointer hover:border-teal-400 group">
                <div className="w-8 h-8 rounded-full border-2 border-white group-hover:border-black flex items-center justify-center transition-all">
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="text-xs ml-0.5 group-hover:text-black transition-colors"
                  />
                </div>
                Learn More
              </button>
            </div>

            {/* Avatars */}
            <div ref={avatarsRef} className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="avatar-circle w-10 h-10 rounded-full bg-linear-to-br from-teal-400 to-cyan-600 border-2 border-[#0a1515]"></div>
                <div className="avatar-circle w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-600 border-2 border-[#0a1515]"></div>
                <div className="avatar-circle w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-red-600 border-2 border-[#0a1515]"></div>
                <div className="avatar-circle w-10 h-10 rounded-full bg-gray-800 border-2 border-[#0a1515] text-white flex items-center justify-center text-xs font-semi-bold">
                  +2k
                </div>
              </div>
              <span className="join-text text-gray-500 text-sm font-semibold font-inter">
                Join 2,000+ students today
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div ref={rightContentRef} className="relative">
            <div
              ref={imageWrapperRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={heroImg}
                alt="Students collaborating"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Floating Pitch Card */}
            <div
              ref={cardRef}
              className="absolute -bottom-6 left-6 right-6 bg-[#1a1a1a]/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      className="text-teal-400 text-xl"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-teal-400 font-semibold uppercase tracking-wide">
                      New Pitch
                    </p>
                    <p className="text-white font-medium">
                      Chinedu's Graphic Design Hub
                    </p>
                  </div>
                </div>
                <button className="px-5 py-2 bg-white text-black font-inter cursor-pointer font-bold rounded-lg hover:bg-teal-400 transition-all text-sm">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroContent;
