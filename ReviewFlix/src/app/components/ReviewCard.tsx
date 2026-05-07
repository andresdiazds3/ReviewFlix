import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, ThumbsUp, MessageCircle, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Review, users, currentUser } from "../data/mockData";

export interface Reply {
  id: string;
  userId: string;
  content: string;
  date: string;
  likes: number;
  liked?: boolean;
}

export interface ReviewWithReplies extends Review {
  replies?: Reply[];
}

// Seed replies for demo
const SEED_REPLIES: Record<string, Reply[]> = {
  r1: [
    {
      id: "rep1-1",
      userId: "u2",
      content: "Totalmente de acuerdo, Damien Cross lleva la película a otro nivel con esa actuación.",
      date: "2024-12-15",
      likes: 18,
      liked: false,
    },
    {
      id: "rep1-2",
      userId: "u3",
      content: "Los últimos 30 minutos son de otro planeta. No podía ni parpadear.",
      date: "2024-12-16",
      likes: 9,
      liked: false,
    },
  ],
  r3: [
    {
      id: "rep3-1",
      userId: "u1",
      content: "Eso del diseño de sonido es REAL. Lo vi con auriculares como dijiste y no dormí bien esa noche 😅",
      date: "2024-11-29",
      likes: 41,
      liked: true,
    },
  ],
  r6: [
    {
      id: "rep6-1",
      userId: "u0",
      content: "Completamente de acuerdo, Moreno es un genio. El monólogo final es de las mejores escenas del año.",
      date: "2024-12-06",
      likes: 27,
      liked: false,
    },
  ],
};

interface ReviewCardProps {
  review: ReviewWithReplies;
  compact?: boolean;
}

export function ReviewCard({ review, compact = false }: ReviewCardProps) {
  const navigate = useNavigate();
  const reviewer = users.find(u => u.id === review.userId) || (review.userId === "u0" ? currentUser : users[0]);

  const [liked, setLiked] = useState(review.liked ?? false);
  const [likeCount, setLikeCount] = useState(review.likes);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<Reply[]>(
    review.replies ?? SEED_REPLIES[review.id] ?? []
  );
  const [showReplies, setShowReplies] = useState(false);
  const [replyLikes, setReplyLikes] = useState<Record<string, { liked: boolean; count: number }>>(
    Object.fromEntries(replies.map(r => [r.id, { liked: r.liked ?? false, count: r.likes }]))
  );

  const toggleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const toggleReplyLike = (replyId: string) => {
    setReplyLikes(prev => {
      const cur = prev[replyId] ?? { liked: false, count: 0 };
      return { ...prev, [replyId]: { liked: !cur.liked, count: cur.liked ? cur.count - 1 : cur.count + 1 } };
    });
  };

  const submitReply = () => {
    if (!replyText.trim()) return;
    const newReply: Reply = {
      id: `rep-${Date.now()}`,
      userId: "u0",
      content: replyText.trim(),
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      liked: false,
    };
    setReplies(prev => [...prev, newReply]);
    setReplyLikes(prev => ({ ...prev, [newReply.id]: { liked: false, count: 0 } }));
    setReplyText("");
    setShowReplyInput(false);
    setShowReplies(true);
  };

  return (
    <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={reviewer.avatar}
          alt={reviewer.name}
          className="w-9 h-9 rounded-full object-cover cursor-pointer flex-shrink-0"
          onClick={() => navigate(`/profile/${reviewer.id}`)}
        />
        <div className="flex-1">
          <p
            className="text-white text-sm cursor-pointer hover:text-[#e50914] transition-colors"
            style={{ fontWeight: 600 }}
            onClick={() => navigate(`/profile/${reviewer.id}`)}
          >
            {reviewer.name}
          </p>
          <div className="flex items-center gap-1">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < review.rating ? "#e50914" : "transparent"}
                className={i < review.rating ? "text-[#e50914]" : "text-[#333]"}
              />
            ))}
          </div>
        </div>
        <span className="text-gray-600 text-xs flex-shrink-0">{review.date}</span>
      </div>

      {/* Content */}
      <p className={`text-gray-400 text-sm leading-relaxed ${compact ? "line-clamp-3" : ""}`}>
        {review.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? "text-[#e50914]" : "text-gray-600 hover:text-[#e50914]"}`}
        >
          <ThumbsUp size={12} fill={liked ? "#e50914" : "transparent"} />
          <span>{likeCount} útil</span>
        </button>
        <button
          onClick={() => setShowReplyInput(prev => !prev)}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-white transition-colors"
        >
          <MessageCircle size={12} />
          Responder
        </button>
        {replies.length > 0 && (
          <button
            onClick={() => setShowReplies(prev => !prev)}
            className="flex items-center gap-1.5 text-xs text-[#e50914]/80 hover:text-[#e50914] transition-colors ml-auto"
          >
            {showReplies ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {showReplies ? "Ocultar" : `${replies.length} respuesta${replies.length > 1 ? "s" : ""}`}
          </button>
        )}
      </div>

      {/* Reply input */}
      {showReplyInput && (
        <div className="mt-4 flex items-start gap-3">
          <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-1" />
          <div className="flex-1 flex items-center gap-2 bg-[#0a0a0a] border border-white/[0.08] rounded-xl px-3 focus-within:border-[#e50914]/30 transition-colors">
            <input
              autoFocus
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submitReply()}
              placeholder={`Responder a ${reviewer.name}...`}
              className="flex-1 bg-transparent text-white text-sm py-2.5 placeholder-gray-600 outline-none"
            />
            <button
              onClick={submitReply}
              disabled={!replyText.trim()}
              className="text-[#e50914] disabled:text-gray-700 transition-colors flex-shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Replies thread */}
      {showReplies && replies.length > 0 && (
        <div className="mt-4 space-y-3 pl-4 border-l-2 border-white/[0.06]">
          {replies.map(reply => {
            const replyUser = users.find(u => u.id === reply.userId) || (reply.userId === "u0" ? currentUser : users[0]);
            const replyState = replyLikes[reply.id] ?? { liked: false, count: reply.likes };
            return (
              <div key={reply.id} className="flex items-start gap-2.5">
                <img
                  src={replyUser.avatar}
                  alt={replyUser.name}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5 cursor-pointer"
                  onClick={() => navigate(`/profile/${replyUser.id}`)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-white text-xs cursor-pointer hover:text-[#e50914] transition-colors"
                      style={{ fontWeight: 600 }}
                      onClick={() => navigate(`/profile/${replyUser.id}`)}
                    >
                      {replyUser.name}
                    </span>
                    <span className="text-gray-700 text-xs">{reply.date}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{reply.content}</p>
                  <button
                    onClick={() => toggleReplyLike(reply.id)}
                    className={`flex items-center gap-1 mt-1.5 text-xs transition-colors ${replyState.liked ? "text-[#e50914]" : "text-gray-700 hover:text-[#e50914]"}`}
                  >
                    <ThumbsUp size={10} fill={replyState.liked ? "#e50914" : "transparent"} />
                    {replyState.count > 0 && <span>{replyState.count}</span>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
