import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const useHeroAnimations = (props: {
  containerRef: any;
  imageRef: any;
  overlayRef: any;
  textRef: any;
  taglineRef: any;
  scrollIndicatorRef: any;
  leftContentRef: any;
  rightContentRef: any;
  badgeRef: any;
  headingRef: any;
  descriptionRef: any;
  avatarsRef: any;
  imageWrapperRef: any;
  cardRef: any;
  pulseContainerRef: any;
  pulseScrollRef?: RefObject<HTMLDivElement | null>;
  pulseHeadingRef: any;
}) => {
  const {
    containerRef,
    imageRef,
    overlayRef,
    textRef,
    taglineRef,
    scrollIndicatorRef,
    leftContentRef,
    rightContentRef,
    badgeRef,
    headingRef,
    descriptionRef,
    avatarsRef,
    imageWrapperRef,
    cardRef,
    pulseContainerRef,
    pulseHeadingRef,
  } = props;

  // Main timeline animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
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

    // Scroll indicator text changes
    tl.to(
      (scrollIndicatorRef.current as HTMLButtonElement).querySelector("span"),
      {
        text: "Keep Scrolling",
      },
      "<",
    );

    // Image fades out
    tl.to(
      imageRef.current,
      {
        opacity: 0,
        ease: "none",
      },
      0,
    );

    // Text scales down and fades in
    tl.fromTo(
      textRef.current,
      {
        fontSize: "300vw",
        opacity: 0,
        color: "rgba(255, 255, 255, 0.1)",
      },
      {
        fontSize: "5rem",
        opacity: 1,
        color: "rgba(255, 255, 255)",
        ease: "none",
      },
      0,
    );

    // Slide text up
    tl.to(textRef.current, {
      y: "-10vh",
      ease: "power2.out",
    });

    // Animate tagline
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.5,
          filter: "blur(0px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.5",
      );

      tl.to(
        taglineRef.current,
        {
          y: "-35vh",
          opacity: 0,
          ease: "power1.inOut",
        },
        "-=0.1",
      );

      tl.to(
        textRef.current,
        {
          y: "-70vh",
          opacity: 0,
          ease: "power2.inOut",
        },
        "<",
      );
    }

    // Fade out hero elements
    tl.to([imageRef.current, overlayRef.current, scrollIndicatorRef.current], {
      opacity: 0,
      pointerEvents: "none",
    });

    // Content section animations
    tl.from(
      leftContentRef.current,
      {
        x: -100,
        opacity: 0,
        ease: "power2.out",
      },
      "-=0.8",
    );

    tl.from(
      rightContentRef.current,
      {
        x: 100,
        opacity: 0,
        ease: "power2.out",
      },
      "<",
    );

    tl.from(badgeRef.current, { opacity: 0, ease: "power2.out" }, "<0.05");
    tl.from(headingRef.current, { opacity: 0, ease: "power2.out" }, "<0.1");
    tl.from(
      descriptionRef.current,
      { opacity: 0, ease: "power2.out" },
      "<0.15",
    );
    tl.from(avatarsRef.current, { opacity: 0, ease: "power2.out" }, "<0.08");
    tl.from(
      imageWrapperRef.current,
      { scale: 0.95, ease: "power2.out" },
      "<0.1",
    );
    tl.from(
      cardRef.current,
      { opacity: 0, scale: 0.95, ease: "power2.out" },
      "<0.15",
    );

    // Content fades out
    tl.to(
      [
        leftContentRef.current,
        rightContentRef.current,
        badgeRef.current,
        headingRef.current,
        descriptionRef.current,
        avatarsRef.current,
        imageWrapperRef.current,
        cardRef.current,
      ],
      {
        y: -60,
        opacity: 0,
        ease: "power2.inOut",
        stagger: 0.05,
      },
      "-=0.3",
    );

    // Pulse section animations
    if (pulseContainerRef.current) {
      tl.from(
        pulseContainerRef.current,
        {
          opacity: 0,
          y: 40,
          ease: "power3.out",
        },
        "-=0.2",
      );

      const pulseHeading = pulseHeadingRef.current?.querySelector("h2");
      const pulseParagraph = pulseHeadingRef.current?.querySelector("p");
      const pulseButton = pulseHeadingRef.current?.querySelector("button");

      if (pulseHeading) {
        tl.from(
          pulseHeading,
          {
            opacity: 0,
            y: 30,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }

      if (pulseParagraph) {
        tl.from(
          pulseParagraph,
          {
            opacity: 0,
            y: 20,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      if (pulseButton) {
        tl.from(
          pulseButton,
          {
            opacity: 0,
            scale: 0.9,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
      }
    }
  }, []);

  // Scroll indicator bounce animation
  useGSAP(() => {
    gsap.to(scrollIndicatorRef.current, {
      duration: 0.8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  // Card floating animation
  useGSAP(() => {
    gsap.to(cardRef.current, {
      y: -10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  // Description lines animation
  useGSAP(() => {
    if (descriptionRef.current) {
      const descSplit = new SplitText(descriptionRef.current, {
        type: "lines",
      });

      gsap.from(descSplit.lines, {
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    }
  }, []);

  // Avatar circles animation
  useGSAP(() => {
    const avatarCircles =
      avatarsRef.current?.querySelectorAll(".avatar-circle");
    if (avatarCircles && avatarCircles.length > 0) {
      gsap.from(avatarCircles, {
        scrollTrigger: {
          trigger: avatarsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scale: 0,
        rotation: -15,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
      });
    }

    const joinText = avatarsRef.current?.querySelector(".join-text");
    if (joinText) {
      gsap.from(joinText, {
        scrollTrigger: {
          trigger: avatarsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      gsap.to(joinText, {
        y: -3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);
};
