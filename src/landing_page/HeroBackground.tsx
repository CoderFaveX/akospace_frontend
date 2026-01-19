import type { RefObject } from "react";
import heroImage from "../assets/hero-img.jpg";

interface HeroBackgroundProps {
  imageRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
}

const HeroBackground = ({ imageRef, overlayRef }: HeroBackgroundProps) => {
  return (
    <>
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0a1515] opacity-0 z-10"
      />
    </>
  );
};

export default HeroBackground;
