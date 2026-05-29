export type FeedFilter = "trending" | "latest";

export interface CommunityPost {
  id: string;
  author: string;
  authorLevel: string; // e.g "Level 4 Predictor"
  authorAvatar: string; // initials fallback e.g "ST"
  timeAgo: string;
  marketTitle: string;
  marketCategory: string;
  prediction: string; // e.g "TEAM ALPHA (YES)"
  predictionSide: "yes" | "no";
  content: string;
  likes: number;
  comments: number;
  likedByUser: boolean;
}

export interface TrendingThesis {
  id: string;
  hashtag: string;
  title: string;
  activeDiscussions: number;
}

export interface TopContributor {
  id: string;
  username: string;
  avatarInitials: string;
  accuracyPercent: number;
}
