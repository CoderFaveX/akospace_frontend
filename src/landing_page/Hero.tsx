import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../assets/hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Overlay fades in
    tl.to(overlayRef.current, {
      opacity: 1,
      ease: "none",
    });

    // Image fades out
    tl.to(
      imageRef.current,
      {
        opacity: 0,
        ease: "none",
      },
      0
    );

    // Text scales down and fades in
    tl.fromTo(
      textRef.current,
      {
        fontSize: "200vw",
        opacity: 0,
      },
      {
        fontSize: "5rem",
        opacity: 1,
        ease: "none",
      },
      0
    );

    // Slide text up to top
    tl.to(textRef.current, {
      y: "-35vh",
      ease: "power2.out",
    });

    // Fade out scroll indicator
    tl.to(
      scrollIndicatorRef.current,
      {
        opacity: 0,
        y: -20,
        ease: "power2.out",
      },
      "<"
    );

    // Animate tagline - bouncy entrance
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.5"
      );
    }

    // Fade out image and overlay completely
    tl.to([imageRef.current, overlayRef.current, scrollIndicatorRef.current], {
      opacity: 0,
      pointerEvents: "none",
    });
  }, []);

  // Bouncing animation for scroll indicator
  useGSAP(() => {
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 0.8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const handleScrollDown = () => {
    const targetPosition = window.innerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start: any = null;

    const easeInOutQuad = (t: any) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animation = (currentTime: any) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#102222] overflow-hidden h-screen"
    >
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
        className="absolute inset-0 bg-[#102222] opacity-0 z-10"
      />

      {/* Akospace Text */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1
          ref={textRef}
          className="font-bold leading-tight font-poppins"
          style={{
            fontSize: "50vw",
            color: "rgba(255, 255, 255, 0.1)",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
            mixBlendMode: "screen",
            backdropFilter: "blur(2px)",
          }}
        >
          <p>Ako</p>
          <p className="-my-[20%] mx-[10%]">space</p>
        </h1>
      </div>

      {/* Tagline - Fixed Gradient with Animation */}
      <div
        className="absolute z-50"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "1200px",
          pointerEvents: "none",
        }}
      >
        <h2
          ref={taglineRef}
          className="text-4xl md:text-6xl font-google-sans-flex lg:text-8xl font-bold text-center uppercase tracking-tight leading-tight"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #e04e5e 0%, #e9ab74 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            opacity: 0,
          }}
        >
          WHERE IDEAS MEET OPPORTUNITY
        </h2>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group z-30"
        onClick={handleScrollDown}
      >
        <span className="text-white text-sm font-inter tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity">
          Scroll Down
        </span>
        <svg
          className="w-6 h-6 text-white opacity-70 group-hover:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
