import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import LandingPage from "./landing_page/LandingPage";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Routes>
        {/* Public routes */}
        <Route path="/" index element={<LandingPage />} />
        <Route path="auth/*" element={<AuthLayout />}></Route>

        {/* Private routes - coming soon */}
      </Routes>
    </main>
  );
};

export default App;
