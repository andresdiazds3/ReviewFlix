import { useNavigate } from "react-router";
import { Star, Plus, Heart } from "lucide-react";
import type { Movie } from "../../types/Movie";

interface MovieCardProps {
  movie: Movie;
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
}

export function MovieCard({ movie, size = "md", showRating = true }: MovieCardProps) {
  const navigate = useNavigate();

  const dimensions = {
    sm: "w-32 h-48",
    md: "w-40 h-60",
    lg: "w-48 h-72",
  };

  return (
    <div
      className={`${dimensions[size]} flex-shrink-0 relative group cursor-pointer`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 border border-white/5 rounded-xl" />

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3">
          <div className="flex items-center gap-2 mb-2">
            <button
              className="p-1.5 rounded-lg bg-[#e50914] hover:bg-[#c20810] transition-colors"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <Plus size={12} className="text-white" />
            </button>
            <button
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <Heart size={12} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {showRating && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm rounded-md px-1.5 py-0.5">
          <Star size={10} fill="#e50914" className="text-[#e50914]" />
          <span className="text-white text-xs">{movie.avgRating}</span>
        </div>
      )}

      <div className="mt-2 px-0.5">
        <p className="text-white text-xs truncate" style={{ fontWeight: 500 }}>{movie.title}</p>
        <p className="text-gray-500 text-xs">{movie.year}</p>
      </div>
    </div>
  );
}
