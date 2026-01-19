import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Users, Briefcase, ShoppingCart } from "lucide-react";

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("students");
  const [displayedTab, setDisplayedTab] = useState("students");
  const [isAnimating, setIsAnimating] = useState(false);

  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const underlineRef = useRef<HTMLDivElement>(null);

  const features = {
    students: [
      {
        icon: Users,
        title: "Connect & Vibe",
        description:
          "Find your tribe based on interests, department, or hostel. Share moments and stay in the loop.",
      },
      {
        icon: Briefcase,
        title: "Monetize Skills",
        description:
          "Good at design? Writing? Coding? List your services as a student consultant and get paid.",
      },
      {
        icon: ShoppingCart,
        title: "Marketplace Access",
        description:
          "Discover campus businesses, order food, or find services—all rated by your peers.",
      },
    ],
    consultants: [
      {
        icon: Briefcase,
        title: "Build Your Brand",
        description:
          "Establish your professional presence and grow your consulting business on campus.",
      },
      {
        icon: Users,
        title: "Connect with Clients",
        description:
          "Network with students and businesses looking for your expertise and services.",
      },
      {
        icon: ShoppingCart,
        title: "Grow Your Network",
        description:
          "Expand your reach and build lasting relationships with potential clients.",
      },
    ],
    businesses: [
      {
        icon: ShoppingCart,
        title: "Reach Campus Market",
        description:
          "Connect directly with students and access a dedicated campus customer base.",
      },
      {
        icon: Users,
        title: "Build Community",
        description:
          "Engage with your audience and create loyalty through community-driven experiences.",
      },
      {
        icon: Briefcase,
        title: "Scale Operations",
        description:
          "Use our platform to grow your business and reach new markets on campus.",
      },
    ],
  };

  /* --------------------------------------------
   Underline animation
  --------------------------------------------- */
  useLayoutEffect(() => {
    const activeEl = tabsRef.current[activeTab];
    const underlineEl = underlineRef.current;

    if (!activeEl || !underlineEl) return;

    underlineEl.style.transform = `translateX(${activeEl.offsetLeft}px)`;
    underlineEl.style.width = `${activeEl.offsetWidth}px`;
  }, [activeTab]);

  /* --------------------------------------------
   Fade + slide transition between tabs
  --------------------------------------------- */
  useEffect(() => {
    if (activeTab === displayedTab) return;

    setIsAnimating(true);

    const timeout = setTimeout(() => {
      setDisplayedTab(activeTab);
      setIsAnimating(false);
    }, 250);

    return () => clearTimeout(timeout);
  }, [activeTab, displayedTab]);

  const currentFeatures = features[displayedTab as keyof typeof features];

  return (
    <section
      className="relative w-screen left-1/2 -translate-x-1/2 py-12 md:py-16 z-30 font-google-sans-flex"
      style={{ backgroundColor: "#102222" }}
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            One Platform. Multiple Possibilities.
          </h2>
          <p className="text-teal-400/70 text-base md:text-lg max-w-2xl mx-auto">
            Whether you're looking to make friends, sell a service, or grow a
            brand. Akospace adapts to you.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16 md:mb-24">
          <div className="relative inline-flex gap-8 md:gap-12">
            {[
              { id: "students", label: "For Students" },
              { id: "consultants", label: "For Consultants" },
              { id: "businesses", label: "For Businesses" },
            ].map((tab) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabsRef.current[tab.id] = el;
                }}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 font-medium text-sm md:text-base transition-colors cursor-pointer duration-300 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-teal-400/50 hover:text-teal-400/70"
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div
              ref={underlineRef}
              className="absolute bottom-0 h-0.5 bg-teal-500 transition-all duration-300 ease-out"
              style={{ width: 0 }}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8
          transition-all duration-300 ease-out
          ${isAnimating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
        >
          {currentFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 md:p-6 lg:p-8 rounded-lg border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300"
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-teal-500" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-teal-400/60 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
