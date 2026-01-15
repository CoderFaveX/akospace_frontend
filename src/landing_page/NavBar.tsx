import logo from "../assets/logo-icon.png";
import { Link, useNavigate } from "react-router-dom";
import Scroll from "../util_components/Scroll";
import { useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef } from "react";

const NavBar = () => {
  const navigate = useNavigate();

  // Mobile menu state controller
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen && menuRef.current) {
      // Select all letters (spans) inside the menu
      const letters = menuRef.current.querySelectorAll(".letter");
      const menu = menuRef.current;
      const index = menuRef.current.querySelectorAll(".index");
      const buttons = menuRef.current.querySelectorAll(".menu-button");

      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: 100,
          rotationY: 85,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          delay: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: {
            amount: 1.2,
            from: "start",
          },
        }
      );

      const leftButtton = buttons[0];
      const rightButton = buttons[1];

      const tl = gsap.timeline({ delay: 1.6, stagger: 0.2 });
      tl.fromTo(
        leftButtton,
        { opacity: 0, x: "-100%" },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      ).fromTo(
        rightButton,
        { opacity: 0, x: "100%" },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      gsap.fromTo(
        index,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 2,
          ease: "power3.out",
          stagger: {
            amount: 0.4,
            from: "random",
          },
        }
      );

      gsap.fromTo(
        menu,
        { left: "-100%" },
        {
          duration: 0.5,
          left: "0%",
          ease: "circ",
        }
      );
    } else if (menuRef.current) {
      const letters = menuRef.current.querySelectorAll(".letter");
      gsap.to(letters, {
        opacity: 0,
        y: -20,
        duration: 0.2,
      });
      gsap.to(menuRef.current, {
        duration: 0.5,
        left: "-100%",
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  // Helper function to split text into letters
  const splitTextIntoLetters = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="letter inline-block"
        style={{ display: "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const nav = document.querySelector("nav");
      const mobileMenu = document.querySelector("#mobile-menu");

      if (
        isOpen &&
        nav &&
        !nav.contains(event.target as Node) &&
        mobileMenu &&
        !mobileMenu.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    alert("Clicked");
    setIsOpen(false);
  }, []);

  // NavTween
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // Trigger based on page scroll, not nav itself
        start: "top top+=80", // When you've scrolled 80px (adjust to your nav height)
        toggleActions: "play none none reverse", // Reverse on scroll back up
      },
    });

    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(20px)", // Fixed typo: backdropFilter not backgroundFilter
        duration: 1,
        ease: "power1.out",
      }
    );
  });

  return (
    <section className="font-google-sans-flex!">
      <nav
        className={`flex fixed top-0 left-0 w-full font-google-sans-flex items-center justify-between px-6 py-3 bg-[#0a0a0a] border-b border-gray-800 z-50`}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Akospace logo" className="h-7 w-7" />
          <span className="text-lg font-medium text-white">Akospace</span>
        </div>

        {/* Desktop Links (hidden at md and below) */}
        <ul className="hidden lg:flex space-x-8 text-gray-300 text-md font-medium">
          <li>
            <Link
              to="/feed"
              className="relative cursor-pointer hover:text-white transition-colors
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300
                 hover:after:w-full"
            >
              Feed
            </Link>
          </li>
          <li>
            <Scroll
              to="features"
              smooth={true}
              duration={500}
              content={"Features"}
              className="relative cursor-pointer hover:text-white transition-colors
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300
                 hover:after:w-full"
            />
          </li>
          <li>
            <Scroll
              to="for-students"
              smooth={true}
              duration={500}
              content={"For Students"}
              className="relative cursor-pointer hover:text-white transition-colors
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300
                 hover:after:w-full"
            />
          </li>
          <li>
            <Scroll
              to="for-businesses"
              smooth={true}
              duration={500}
              content={"For Businesses"}
              className="relative cursor-pointer hover:text-white transition-colors
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all after:duration-300
                 hover:after:w-full"
            />
          </li>
        </ul>

        {/* Auth Buttons (hidden at sm and below) */}
        <div className="hidden md:flex space-x-3">
          <button className="px-4 py-1.5 cursor-pointer border border-gray-700 text-sm font-medium rounded-md text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all">
            Login
          </button>
          <button className="px-4 py-1.5 cursor-pointer hover:bg-white text-sm text-black rounded-md bg-(--stale-button) border border-transparent font-medium transition-all">
            Join Now
          </button>
        </div>

        <button
          className={`lg:hidden ${
            !isOpen ? "flex" : "hidden"
          } items-center justify-center cursor-pointer relative z-80 w-8 h-8`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span
            className={`absolute w-7 h-0.5 transition-all bg-white duration-300
              ${isOpen ? "rotate-45 hidden top-3.5" : "top-2 "}`}
          />
          <span
            className={`absolute w-7 h-0.5 transition-all bg-white duration-300
              ${isOpen ? "-rotate-45 hidden top-3.5 z-60" : "top-3.5"}`}
          />
          <span
            className={`absolute w-7 h-0.5 bg-white transition-all duration-300 
              ${isOpen ? "opacity-0" : "top-5"}`}
          />
        </button>
      </nav>

      {/* Mobile Menu - Light Theme */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white transition-all duration-500 ease-in-out z-60 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ left: "-100%" }}
      >
        <div
          className="flex items-center font-google-sans-flex absolute top-5 left-8 justify-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Akospace logo" className="h-7 w-7" />
          <span className="text-lg font-small text-gray-700">Akospace</span>
        </div>

        <button
          className={`lg:hidden flex absolute top-5 right-7 items-center justify-center cursor-pointer z-80 w-8 h-8`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span
            className={`absolute w-7 h-0.5 transition-all duration-300
              ${isOpen ? "rotate-45 top-3.5 bg-gray-700" : "top-2 bg-white"}`}
          />
          <span
            className={`absolute w-7 h-0.5 transition-all duration-300
              ${
                isOpen
                  ? "-rotate-45 top-3.5 bg-gray-700 z-60"
                  : "top-3.5 bg-white"
              }`}
          />
          <span
            className={`absolute w-7 h-0.5 bg-white transition-all duration-300 
              ${isOpen ? "opacity-0" : "top-5"}`}
          />
        </button>

        <div className="flex flex-col justify-center items-start h-full px-8 md:px-16">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-6">
            {[
              { to: "/", label: "HOME", number: "01" },
              { to: "features", label: "FEATURES", number: "02", scroll: true },
              {
                to: "for-students",
                label: "FOR STUDENTS",
                number: "03",
                scroll: true,
              },
              {
                to: "for-businesses",
                label: "FOR BUSINESSES",
                number: "04",
                scroll: true,
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-baseline gap-4 cursor-pointer group">
                  {item.scroll ? (
                    <div className="text-3xl md:text-5xl font-medium overflow-hidden! text-gray-900 group-hover:text-gray-600 transition-colors duration-300 cursor-pointer">
                      <Scroll
                        to={item.to}
                        smooth={true}
                        duration={500}
                        content={splitTextIntoLetters(item.label)}
                        className={"font-google-sans-flex"}
                        onClick={handleNavClick}
                      />
                    </div>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={handleNavClick}
                      className="text-3xl md:text-5xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors duration-300"
                    >
                      {splitTextIntoLetters(item.label)}
                    </Link>
                  )}
                  <span className="index font-google-sans-flex text-base text-gray-500 self-start">
                    {item.number}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8 flex md:hidden flex-col space-y-3 align-center">
          <button className="menu-button align-center w-full px-4 py-2 cursor-pointer border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all">
            Login
          </button>
          <button className="menu-button align-center w-full px-4 py-2 cursor-pointer bg-gray-900 text-sm text-white rounded-md hover:bg-(--stale-button) hover:text-black border border-transparent font-medium transition-all">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
