import type { RefObject } from "react";

interface HeroTaglineProps {
  taglineRef: RefObject<HTMLHeadingElement>;
}

const HeroTagline = ({ taglineRef }: HeroTaglineProps) => {
  return (
    <div
      className="absolute z-50 w-full h-screen flex items-center justify-center"
      style={{
        pointerEvents: "none",
      }}
    >
      <h2
        ref={taglineRef}
        className="text-5xl md:text-4xl xl:text-5xl 2xl:text-6xl font-inter font-bold text-center uppercase tracking-tight leading-tight px-4 xl:px-6"
        style={{
          backgroundImage: "linear-gradient(135deg, #e04e5e 0%, #e9ab74 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          maxWidth: "1000px",
        }}
      >
        Where Ideas Meet Opportunity
      </h2>
    </div>
  );
};

export default HeroTagline;
