import ContentSection from "./ContentSection";
import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import NavBar from "./NavBar";

const LandingPage = () => {
  return (
    <main className="bg-[#102222] h-100% overflow-x-hidden">
      <NavBar />
      <Hero />
      <FeaturesSection />
      {/* <ContentSection /> */}
    </main>
  );
};

export default LandingPage;
