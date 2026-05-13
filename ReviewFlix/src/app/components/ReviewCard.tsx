import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, MessageCircle, Send, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { users, currentUser } from "../data/mockData";
import type { Review } from "../../types/Review";
import { useAuthContext } from "../../context/AuthorizationContext";

export interface ReviewWithReplies extends Review {
  replies?: ReviewWithReplies[];
}

interface ReviewCardProps {
  review: ReviewWithReplies;
  compact?: boolean;
  depth?: number;
  onReply?: (parentId: string, content: string) => Promise<void> | void;
  onDelete?: (reviewId: string) => Promise<void> | void;
}

export function ReviewCard({ review, compact = false, depth = 0, onReply, onDelete }: ReviewCardProps) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const reviewer = users.find(u => u.id === review.userId) || (review.userId === "u0" ? currentUser : users[0]);
  const reviewerName = review.authorName || reviewer.name;
  const reviewerAvatar = review.authorAvatar || reviewer.avatar;
  const canDelete = Boolean(onDelete) && review.userId === user?.uid;

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    const confirmed = window.confirm("¿Eliminar esta reseña y todas sus respuestas?");
    if (!confirmed) {
      return;
    }

    await onDelete(review.id);
  };

  const submitReply = async () => {
    if (!replyText.trim()) return;
    if (onReply) {
      await onReply(review.id, replyText.trim());
    }
    setReplyText("");
    setShowReplyInput(false);
    setShowReplies(true);
  };

  return (
    <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all" style={{ marginLeft: depth > 0 ? `${depth * 16}px` : 0 }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={reviewerAvatar}
          alt={reviewerName}
          className="w-9 h-9 rounded-full object-cover cursor-pointer flex-shrink-0"
          onClick={() => navigate(`/profile/${reviewer.id}`)}
        />
        <div className="flex-1">
          <p
            className="text-white text-sm cursor-pointer hover:text-[#e50914] transition-colors"
            style={{ fontWeight: 600 }}
            onClick={() => navigate(`/profile/${reviewer.id}`)}
          >
            {reviewerName}
          </p>
          {review.rating > 0 && (
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
          )}
        </div>
        <span className="text-gray-600 text-xs flex-shrink-0">{review.createdAt ? review.createdAt.split("T")[0] : ""}</span>
      </div>

      {/* Content */}
      <p className={`text-gray-400 text-sm leading-relaxed ${compact ? "line-clamp-3" : ""}`}>
        {review.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={() => setShowReplyInput(prev => !prev)}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-white transition-colors"
        >
          <MessageCircle size={12} />
          Responder
        </button>
        {canDelete && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#e50914] transition-colors"
          >
            <Trash2 size={12} />
            Eliminar
          </button>
        )}
        {(review.replies?.length ?? 0) > 0 && (
          <button
            onClick={() => setShowReplies(prev => !prev)}
            className="flex items-center gap-1.5 text-xs text-[#e50914]/80 hover:text-[#e50914] transition-colors ml-auto"
          >
            {showReplies ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {showReplies ? "Ocultar" : `${review.replies?.length ?? 0} respuesta${(review.replies?.length ?? 0) > 1 ? "s" : ""}`}
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
              placeholder={`Responder a ${reviewerName}...`}
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
      {showReplies && (review.replies?.length ?? 0) > 0 && (
        <div className="mt-4 space-y-3 pl-4 border-l-2 border-white/[0.06]">
          {review.replies?.map(reply => (
            <ReviewCard key={reply.id} review={reply} compact depth={depth + 1} onReply={onReply} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
