import type { RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse } from "@fortawesome/free-solid-svg-icons";

interface ScrollIndicatorProps {
  scrollIndicatorRef: RefObject<HTMLButtonElement>;
  handleScrollDown: () => void;
}

const ScrollIndicator = ({
  scrollIndicatorRef,
  handleScrollDown,
}: ScrollIndicatorProps) => {
  return (
    <button
      onClick={handleScrollDown}
      ref={scrollIndicatorRef}
      className="absolute bottom-30 left-1/2 -translate-x-1/2 z-50 group px-4 py-2 bg-[#0a1515]/10 cursor-pointer font-inter hover:bg-[#0a151515/20 border border-teal-500/50 rounded-full text-teal-400 text-sm font-semibold transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
    >
      <span className="hidden sm:inline">Scroll Down</span>
      <FontAwesomeIcon icon={faMouse} />
    </button>
  );
};

export default ScrollIndicator;
