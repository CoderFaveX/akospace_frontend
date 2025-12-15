import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import LandingPage from "./LandingPage";

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
