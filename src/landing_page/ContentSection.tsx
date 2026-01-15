import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import heroImg from "../assets/avatars/discussion2.png";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ContentSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (descriptionRef.current && avatarsRef.current && cardRef.current) {
        const descWords = descriptionRef.current.querySelectorAll(".word");

        const boldSplit = new SplitText(".heading", { type: "chars, words" });

        boldSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        });

        // Description words bouncy entrance
        tl.from(descWords, {
          delay: "1.0",
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(1.5)",
        });

        tl.from(boldSplit.chars, {
          yPercent: 100,
          duration: 0.2,
          ease: "power2.out",
          stagger: 0.06
        })

        // Floating card animates in with bounce
        tl.from(cardRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "back.out(1.7)",
        });

        // Avatars pop-in with stagger and rotation
        tl.from(avatarsRef.current.children, {
          opacity: 0,
          scale: 0,
          rotation: -15,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(2)",
        });

        // Continuous subtle bounce for floating card
        gsap.to(cardRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text into words
  const splitIntoWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[0.25em]">
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#0a1515] text-white py-20 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Badge */}
          <div ref={badgeRef} className="inline-block">
            <span className="px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 w-fit">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
              Live at Unilag
            </span>
          </div>

          {/* Heading with linear gradient - Reduced size */}
          <h1
            ref={headingRef}
            className="heading text-3xl md:text-5xl font-google-sans-flex lg:text-5xl font-bold leading-tight overflow-hidden"
          >
            The Heartbeat of Campus: Connect, Create, & Scale.
          </h1>

          {/* Description - Reduced size */}
          <p
            ref={descriptionRef}
            className="text-base md:text-lg font-google-sans-flex text-gray-400 leading-relaxed max-w-xl overflow-hidden"
          >
            {splitIntoWords(
              "A fullstack platform for students, consultants, and businesses. Join the vibrant Nigerian community today to network, share your vibes, and pitch your hustle."
            )}
          </p>

          {/* Buttons - Updated styles to match reference */}
          <div className="flex flex-wrap gap-4 font-google-sans-flex!">
            <button className="px-8 py-3 cursor-pointer bg-teal-400 text-black font-semibold rounded-lg transition-all duration-300 hover:bg-transparent hover:text-teal-400 hover:border-2 hover:border-teal-400 hover:scale-105 hover:shadow-lg">
              Get Started
            </button>

            <button className="px-8 py-3 cursor-pointer border-2 border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-teal-400 hover:text-black hover:border-teal-400 group">
              <div className="w-8 h-8 rounded-full border-2 border-white group-hover:border-black flex items-center justify-center transition-all">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-xs ml-0.5 group-hover:text-black transition-colors"
                />
              </div>
              Learn More
            </button>
          </div>

          {/* Avatars + Counter */}
          <div ref={avatarsRef} className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-teal-400 to-cyan-600 border-2 border-[#0a1515]"></div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-600 border-2 border-[#0a1515]"></div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-red-600 border-2 border-[#0a1515]"></div>
              <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-[#0a1515] flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
            <span className="text-gray-500 text-sm">
              Join 2,000+ students today
            </span>
          </div>
        </div>

        {/* Right Image + Floating Card */}
        <div className="relative">
          <div
            ref={imageRef}
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
              <button className="px-5 py-2 bg-white text-black font-bold rounded-lg hover:bg-teal-400 transition-all text-sm">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
