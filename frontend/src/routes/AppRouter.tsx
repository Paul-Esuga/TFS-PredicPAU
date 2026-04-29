import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignupPage from "../pages/Signup";
import DashboardPage from "../pages/Dashboard";
import MarketsPage from "../pages/Markets";
import PortfolioPage from "../pages/Portfolio";
import CommunityPage from "../pages/Community";
import AchievementsPage from "../pages/Achievements";
import AdminPage from "../pages/Admin";
import NotFoundPage from "../pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
