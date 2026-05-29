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
import MarketDetailsPage from "../pages/MarketDetailsPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import HelpPage from "../pages/HelpPage";
import ProfilePage from "../pages/ProfilePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/markets/:marketId" element={<MarketDetailsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/resolution" element={<AdminResolutionPage />} />
        <Route path="/admin/moderation" element={<AdminModerationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
