import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Star, Heart, Bookmark, Share2, Clock, Users, ChevronLeft, Send, ThumbsUp } from "lucide-react";
import { reviews, users, currentUser } from "../data/mockData";
import useMovies from "../../hooks/useMovies";
import { MovieCard } from "../components/MovieCard";
import { StarRating } from "../components/StarRating";
import { ReviewCard } from "../components/ReviewCard";

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { movies, loading } = useMovies();
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <div className="mb-2">Cargando película…</div>
        </div>
      </div>
    );
  }

  const movie = movies.find(m => m.id === id);
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold">Película no encontrada</h2>
          <p className="text-gray-400">La película solicitada no existe o aún no se ha sincronizado.</p>
        </div>
      </div>
    );
  }

  const movieReviews = reviews.filter(r => r.movieId === movie.id || reviews.indexOf(r) < 3);
  const similar = movies.filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))).slice(0, 6);

  const handleSubmit = () => {
    if (reviewText.trim() || userRating > 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setReviewText("");
      setUserRating(0);
    }
  };

  const ratingDist = [
    { stars: 5, pct: 52 },
    { stars: 4, pct: 28 },
    { stars: 3, pct: 13 },
    { stars: 2, pct: 5 },
    { stars: 1, pct: 2 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Backdrop */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={movie.backdropUrl} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-sm text-white hover:bg-black/60 transition-all"
        >
          <ChevronLeft size={16} />
          Volver
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 pb-20 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Poster + Actions */}
          <div className="lg:col-span-1">
            <div className="relative">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full max-w-xs mx-auto lg:mx-0 rounded-2xl shadow-2xl shadow-black/80 border border-white/10"
                style={{ aspectRatio: "2/3", objectFit: "cover" }}
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border transition-all ${isLiked ? "bg-[#e50914] border-[#e50914]" : "bg-black/60 border-white/20 hover:border-white/40"}`}
                >
                  <Heart size={16} fill={isLiked ? "white" : "transparent"} className="text-white" />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border transition-all ${isBookmarked ? "bg-[#e50914] border-[#e50914]" : "bg-black/60 border-white/20 hover:border-white/40"}`}
                >
                  <Bookmark size={16} fill={isBookmarked ? "white" : "transparent"} className="text-white" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-sm border border-white/20 hover:border-white/40 flex items-center justify-center transition-all">
                  <Share2 size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-5 bg-[#111] border border-white/[0.06] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Puntuación</span>
                <div className="flex items-center gap-1.5">
                  <Star size={14} fill="#e50914" className="text-[#e50914]" />
                  <span className="text-white" style={{ fontWeight: 700 }}>{movie.avgRating}</span>
                  <span className="text-gray-600 text-xs">/ 5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Votos</span>
                <span className="text-white text-sm" style={{ fontWeight: 500 }}>{movie.ratingCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Duración</span>
                <div className="flex items-center gap-1 text-white text-sm">
                  <Clock size={13} />
                  <span style={{ fontWeight: 500 }}>{movie.duration} min</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Año</span>
                <span className="text-white text-sm" style={{ fontWeight: 500 }}>{movie.year}</span>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title + Meta */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres.map(g => (
                  <span key={g} className="bg-[#e50914]/10 text-[#e50914] text-xs px-3 py-1 rounded-lg border border-[#e50914]/20" style={{ fontWeight: 500 }}>
                    {g}
                  </span>
                ))}
              </div>
              <h1 className="text-white mb-2" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-1px" }}>
                {movie.title}
              </h1>
              <p className="text-gray-400 text-sm mb-4">
                Dirigida por <span className="text-white">{movie.director}</span>
                <span className="mx-2 text-gray-700">·</span>
                Reparto: <span className="text-white">{movie.cast.join(", ")}</span>
              </p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(movie.avgRating) ? "#e50914" : "transparent"} className={i < Math.floor(movie.avgRating) ? "text-[#e50914]" : "text-[#333]"} />
                  ))}
                </div>
                <span className="text-white" style={{ fontWeight: 700, fontSize: "20px" }}>{movie.avgRating}</span>
                <span className="text-gray-600 text-sm">({movie.ratingCount.toLocaleString()} valoraciones)</span>
              </div>

              <p className="text-gray-400 leading-relaxed">{movie.description}</p>
            </div>

            {/* Rating distribution */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-white mb-4" style={{ fontWeight: 600 }}>Distribución de puntuaciones</h3>
              <div className="space-y-2">
                {ratingDist.map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16 flex-shrink-0">
                      <span className="text-gray-400 text-sm w-3">{stars}</span>
                      <Star size={11} fill="#e50914" className="text-[#e50914]" />
                    </div>
                    <div className="flex-1 h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#e50914] rounded-full transition-all duration-1000"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-gray-500 text-xs w-8 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Review */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Tu reseña</h3>
              <div className="mb-4">
                <p className="text-gray-500 text-sm mb-2">Tu calificación</p>
                <StarRating value={userRating} onChange={setUserRating} size="lg" />
              </div>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="¿Qué te pareció esta película? Comparte tu opinión con la comunidad..."
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-4 text-white placeholder-gray-600 text-sm resize-none outline-none focus:border-[#e50914]/40 transition-colors"
                rows={4}
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-gray-500 text-sm">Como {currentUser.name}</span>
                </div>
                <button
                  onClick={handleSubmit}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    submitted
                      ? "bg-green-600 text-white"
                      : "bg-[#e50914] hover:bg-[#c20810] text-white hover:shadow-lg hover:shadow-red-900/30"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {submitted ? "¡Publicada!" : (<><Send size={14} /> Publicar</>)}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white" style={{ fontWeight: 700, fontSize: "20px" }}>Reseñas de la comunidad</h2>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-gray-500" />
                <span className="text-gray-500 text-sm">{movie.ratingCount.toLocaleString()} reseñas</span>
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movieReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Similar movies */}
        <div className="mt-12">
          <h2 className="text-white mb-5" style={{ fontWeight: 700, fontSize: "20px" }}>Películas similares</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {similar.map(movie => <MovieCard key={movie.id} movie={movie} size="md" />)}
          </div>
        </div>
      </div>
    </div>
  );
}