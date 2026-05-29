import type {
  CommunityPost,
  TrendingThesis,
  TopContributor,
} from "../types/community";

export const mockPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "@sarah_trader",
    authorLevel: "Level 4 Predictor",
    authorAvatar: "ST",
    timeAgo: "2 hours ago",
    marketTitle: "PAU Football League: Team Alpha vs Omega",
    marketCategory: "Sports",
    prediction: "TEAM ALPHA (YES)",
    predictionSide: "yes",
    content:
      "Analyzing Team Alpha's defense, they've only conceded twice this season. With their star goalkeeper back from injury and Omega's recent struggles in away matches (0-3 last month), the 64% probability currently in the market is significantly undervalued. I expect a clean sheet.",
    likes: 142,
    comments: 28,
    likedByUser: false,
  },
  {
    id: "post-2",
    author: "@mchen_data",
    authorLevel: "Macro Specialist",
    authorAvatar: "MC",
    timeAgo: "5 hours ago",
    marketTitle: "Mid-Term Exam Average Score > 75%",
    marketCategory: "Academics",
    prediction: "UNDER 75% (NO)",
    predictionSide: "no",
    content:
      "Historically, the second-year macroeconomics midterm has a failing rate of 15%. Given the new curriculum's focus on quantitative modeling which wasn't fully covered in tutorials, I'm betting against the crowd here. The current 82% Yes consensus is fueled by optimism, not historical data trends.",
    likes: 87,
    comments: 14,
    likedByUser: false,
  },
  {
    id: "post-3",
    author: "@kunle_fx",
    authorLevel: "Level 2 Predictor",
    authorAvatar: "KF",
    timeAgo: "8 hours ago",
    marketTitle: "Will the Naira appreciate below ₦1,400/$ by Q3?",
    marketCategory: "Finance",
    prediction: "NAIRA APPRECIATION (YES)",
    predictionSide: "yes",
    content:
      "CBN's recent policy tightening and the uptick in diaspora remittances are creating conditions for short-term appreciation. The market is pricing this at 36% but I think the probability is closer to 55%. Positioning YES before the next MPC meeting.",
    likes: 63,
    comments: 9,
    likedByUser: false,
  },
];

export const mockTrendingTheses: TrendingThesis[] = [
  {
    id: "trend-1",
    hashtag: "#CampusSports2025",
    title: "Why Team Alpha's defense makes them heavy favorites",
    activeDiscussions: 42,
  },
  {
    id: "trend-2",
    hashtag: "#AcademicMarkets",
    title: "Midterm prediction markets are more accurate than polls",
    activeDiscussions: 18,
  },
  {
    id: "trend-3",
    hashtag: "#NairaWatch",
    title: "Global oil prices impact on campus transport prediction",
    activeDiscussions: 9,
  },
];

export const mockTopContributors: TopContributor[] = [
  {
    id: "contrib-1",
    username: "@sarah_trader",
    avatarInitials: "ST",
    accuracyPercent: 88,
  },
  {
    id: "contrib-2",
    username: "@mchen_data",
    avatarInitials: "MC",
    accuracyPercent: 82,
  },
  {
    id: "contrib-3",
    username: "@kunle_fx",
    avatarInitials: "KF",
    accuracyPercent: 76,
  },
];
