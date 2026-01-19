import { RefObject } from "react";

interface HeroTextProps {
  textRef: RefObject<HTMLHeadingElement>;
}

const HeroText = ({ textRef }: HeroTextProps) => {
  return (
    <div className="absolute top-[-20%] inset-0 flex items-center justify-center z-20 h-screen">
      <h1
        ref={textRef}
        className="font-bold leading-tight font-poppins"
        style={{
          fontSize: "300vw",
          color: "rgba(255, 255, 255, 0.1)",
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
          mixBlendMode: "screen",
        }}
      >
        <p>Ako</p>
        <p className="-my-[20%] mx-[10%]">space</p>
      </h1>
    </div>
  );
};

export default HeroText;
