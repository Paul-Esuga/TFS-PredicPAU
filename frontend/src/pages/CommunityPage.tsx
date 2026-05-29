import { useEffect, useState } from "react";
import { ThumbsUp, MessageCircle, TrendingUp, BarChart2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import { communityService } from "../features/community/services/communityService";
import type {
  CommunityPost,
  FeedFilter,
  TrendingThesis,
  TopContributor,
} from "../features/community/types/community";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const avatarColors: Record<string, string> = {
  ST: "bg-rose-400",
  MC: "bg-blue-400",
  KF: "bg-emerald-400",
  default: "bg-indigo-400",
};

const getAvatarColor = (initials: string) =>
  avatarColors[initials] ?? avatarColors.default;

// ─── Sub-components ───────────────────────────────────────────────────────────

const Avatar = ({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md";
}) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${
      size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm"
    } ${getAvatarColor(initials)}`}
  >
    {initials}
  </div>
);

const PredictionPill = ({
  prediction,
  side,
}: {
  prediction: string;
  side: "yes" | "no";
}) => (
  <span
    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
      side === "yes"
        ? "bg-blue-100 text-blue-600"
        : "bg-purple-100 text-purple-600"
    }`}
  >
    PREDICTION: {prediction}
  </span>
);

const MarketTag = ({
  title,
  category,
}: {
  title: string;
  category: string;
}) => (
  <div className="flex items-center gap-1.5">
    <BarChart2 size={13} className="text-blue-500" />
    <span className="text-xs font-semibold text-blue-500">
      {category}: {title}
    </span>
  </div>
);

const PostCard = ({
  post,
  onLike,
}: {
  post: CommunityPost;
  onLike: (id: string) => void;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
    {/* Author row */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <Avatar initials={post.authorAvatar} />
        <div>
          <p className="text-sm font-semibold text-slate-800">{post.author}</p>
          <p className="text-xs text-slate-400">
            {post.timeAgo} • {post.authorLevel}
          </p>
        </div>
      </div>
    </div>

    {/* Market tag */}
    <MarketTag title={post.marketTitle} category={post.marketCategory} />

    {/* Prediction pill */}
    <PredictionPill prediction={post.prediction} side={post.predictionSide} />

    {/* Content */}
    <p className="text-sm leading-relaxed text-slate-600">{post.content}</p>

    {/* Actions */}
    <div className="flex items-center gap-5 border-t border-slate-100 pt-3">
      <button
        onClick={() => onLike(post.id)}
        className={`flex items-center gap-1.5 text-sm transition-colors ${
          post.likedByUser
            ? "text-blue-600"
            : "text-slate-400 hover:text-blue-500"
        }`}
      >
        <ThumbsUp size={15} />
        <span>{post.likes}</span>
      </button>

      <button className="flex items-center gap-1.5 text-sm text-slate-400">
        <MessageCircle size={15} />
        <span>{post.comments}</span>
      </button>
    </div>
  </div>
);

const PostComposer = ({
  onSubmit,
}: {
  onSubmit: (
    content: string,
    market: string,
    prediction: string,
    side: "yes" | "no",
  ) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [market, setMarket] = useState("");
  const [prediction, setPrediction] = useState("");
  const [side, setSide] = useState<"yes" | "no">("yes");

  const handleSubmit = () => {
    if (!content.trim() || !market.trim() || !prediction.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    onSubmit(content.trim(), market.trim(), prediction.trim(), side);
    setContent("");
    setMarket("");
    setPrediction("");
    setSide("yes");
    setOpen(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
      {/* Collapsed state */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full rounded-xl bg-slate-50 px-4 py-3 text-left text-sm text-slate-400 hover:bg-slate-100 transition-colors"
        >
          Share your market thesis...
        </button>
      ) : (
        <>
          {/* Market input */}
          <input
            type="text"
            placeholder="Market title (e.g. PAU Football League: Team Alpha vs Omega)"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400"
          />

          {/* Prediction input */}
          <input
            type="text"
            placeholder="Your prediction (e.g. TEAM ALPHA)"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400"
          />

          {/* Side toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setSide("yes")}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${
                side === "yes"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              YES
            </button>
            <button
              onClick={() => setSide("no")}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${
                side === "no"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              NO
            </button>
          </div>

          {/* Thesis textarea */}
          <textarea
            placeholder="Share your analysis..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 resize-none"
          />

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Post
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const TrendingThesesCard = ({ theses }: { theses: TrendingThesis[] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
    <div className="flex items-center gap-2">
      <TrendingUp size={15} className="text-blue-500" />
      <p className="text-sm font-semibold text-blue-500">Trending Theses</p>
    </div>

    <div className="space-y-4">
      {theses.map((thesis) => (
        <div key={thesis.id}>
          <p className="text-xs font-semibold text-blue-500">
            {thesis.hashtag}
          </p>
          <p className="mt-0.5 text-sm text-slate-700">{thesis.title}</p>
          <p className="mt-0.5 text-xs text-slate-400">
            {thesis.activeDiscussions} active discussions
          </p>
        </div>
      ))}
    </div>
  </div>
);

const TopContributorsCard = ({
  contributors,
}: {
  contributors: TopContributor[];
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
      Top Contributors
    </p>

    <div className="space-y-3">
      {contributors.map((c) => (
        <div key={c.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar initials={c.avatarInitials} size="sm" />
            <p className="text-sm text-slate-700">{c.username}</p>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
            {c.accuracyPercent}% ACC
          </span>
        </div>
      ))}
    </div>
  </div>
);

const FeedFilterTabs = ({
  active,
  onChange,
}: {
  active: FeedFilter;
  onChange: (f: FeedFilter) => void;
}) => (
  <div className="flex gap-2">
    {(["trending", "latest"] as FeedFilter[]).map((f) => (
      <button
        key={f}
        onClick={() => onChange(f)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
          active === f
            ? "bg-slate-800 text-white"
            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
        }`}
      >
        {f}
      </button>
    ))}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const CommunityPage = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [theses, setTheses] = useState<TrendingThesis[]>([]);
  const [contributors, setContributors] = useState<TopContributor[]>([]);
  const [filter, setFilter] = useState<FeedFilter>("trending");
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    Promise.all([
      communityService.getPosts("trending"),
      communityService.getTrendingTheses(),
      communityService.getTopContributors(),
    ]).then(([postData, thesisData, contributorData]) => {
      setPosts(postData);
      setTheses(thesisData);
      setContributors(contributorData);
      setLoading(false);
    });
  }, []);

  // Refetch posts when filter changes
  useEffect(() => {
    communityService.getPosts(filter).then(setPosts);
  }, [filter]);

  const handleLike = (postId: string) => {
    communityService.toggleLike(postId).then(setPosts);
  };

  const handleNewPost = (
    content: string,
    market: string,
    prediction: string,
    side: "yes" | "no",
  ) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: "@you",
      authorLevel: "Student Trader",
      authorAvatar: "ME",
      timeAgo: "Just now",
      marketTitle: market,
      marketCategory: "Campus",
      prediction,
      predictionSide: side,
      content,
      likes: 0,
      comments: 0,
      likedByUser: false,
    };

    communityService.addPost(newPost).then(() => {
      communityService.getPosts(filter).then(setPosts);
      toast.success("Your thesis has been posted.");
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading feed...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <DashboardLayout>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Left — Feed ── */}
          <div className="space-y-5 lg:col-span-2">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Community Feed
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Institutional insights and student predictions
                </p>
              </div>
              <FeedFilterTabs active={filter} onChange={setFilter} />
            </div>

            {/* Composer */}
            <PostComposer onSubmit={handleNewPost} />

            {/* Posts */}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))}
          </div>

          {/* ── Right — Sidebar ── */}
          <div className="space-y-4">
            <TrendingThesesCard theses={theses} />
            <TopContributorsCard contributors={contributors} />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CommunityPage;
