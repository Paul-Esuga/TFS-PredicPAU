import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import MarketsPage from "../pages/MarketsPage";
import PortfolioPage from "../pages/PortfolioPage";
import CommunityPage from "../pages/CommunityPage";
import AchievementsPage from "../pages/AchievementsPage";
import AdminPage from "../pages/AdminPage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminModerationPage from "../pages/AdminModerationPage";
import AdminResolutionPage from "../pages/AdminResolutionPage";

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
        <Route path="/admin/resolution" element={<AdminResolutionPage />} />
        <Route path="/admin/moderation" element={<AdminModerationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
