import ContentSection from "./ContentSection";
import Hero from "./Hero";
import NavBar from "./NavBar";

const LandingPage = () => {
  return (
    <main className="bg-[#102222] h-100%">
      <NavBar />
      <Hero />
      <ContentSection />
    </main>
  );
};

export default LandingPage;
