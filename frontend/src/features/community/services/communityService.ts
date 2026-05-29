import {
  mockPosts,
  mockTrendingTheses,
  mockTopContributors,
} from "../mocks/communityMocks";
import type {
  CommunityPost,
  FeedFilter,
  TrendingThesis,
  TopContributor,
} from "../types/community";

// ─── Session Store ────────────────────────────────────────────────────────────
// Same pattern as tradeStore — module-level array that persists for the session.
// Swap these read/writes for fetch() calls when the backend is ready.

const sessionPosts: CommunityPost[] = [];

export const communityService = {
  getPosts: (filter: FeedFilter = "trending"): Promise<CommunityPost[]> => {
    const allPosts = [...sessionPosts, ...mockPosts];

    const sorted =
      filter === "trending"
        ? [...allPosts].sort((a, b) => b.likes - a.likes)
        : [...allPosts].sort((a, b) => {
            // Session posts are always newest so they naturally float to top
            const aIsSession = sessionPosts.find((p) => p.id === a.id);
            const bIsSession = sessionPosts.find((p) => p.id === b.id);
            if (aIsSession && !bIsSession) return -1;
            if (!aIsSession && bIsSession) return 1;
            return 0;
          });

    return Promise.resolve(sorted);
  },

  addPost: (post: CommunityPost): Promise<CommunityPost> => {
    sessionPosts.unshift(post);
    return Promise.resolve(post);
  },

  toggleLike: (postId: string): Promise<CommunityPost[]> => {
    // Check session posts first, then mock posts
    const allPosts = [...sessionPosts, ...mockPosts];
    const post = allPosts.find((p) => p.id === postId);

    if (!post) {
      return Promise.reject(new Error(`Post ${postId} not found`));
    }

    if (post.likedByUser) {
      post.likes -= 1;
      post.likedByUser = false;
    } else {
      post.likes += 1;
      post.likedByUser = true;
    }

    return Promise.resolve([...sessionPosts, ...mockPosts]);
  },

  getTrendingTheses: (): Promise<TrendingThesis[]> => {
    return Promise.resolve(mockTrendingTheses);
  },

  getTopContributors: (): Promise<TopContributor[]> => {
    return Promise.resolve(mockTopContributors);
  },
};
