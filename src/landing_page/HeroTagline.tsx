import { RefObject } from "react";

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
        className="text-4xl md:text-6xl font-inter lg:text-8xl font-bold text-center uppercase tracking-tight leading-tight px-6"
        style={{
          backgroundImage: "linear-gradient(135deg, #e04e5e 0%, #e9ab74 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          maxWidth: "1200px",
        }}
      >
        Where Ideas Meet Opportunity
      </h2>
    </div>
  );
};

export default HeroTagline;
