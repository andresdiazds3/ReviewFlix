import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TrendingUp, Clock, Heart, Star, ChevronRight, Play, Sparkles } from "lucide-react";
import { users, currentUser, watchlistMovies } from "../data/mockData";
import useMovies from "../../hooks/useMovies";
import { MovieCard } from "../components/MovieCard";
import { useReviews } from "../../hooks/useReviews";
import { getTopMoviesByRating } from "../../utils/movieRanking";

export function Home() {
  const navigate = useNavigate();
  const { movies } = useMovies();
  const { reviews } = useReviews();
  const rankedMovies = getTopMoviesByRating(movies, movies.length);
  const featured = rankedMovies[0] ?? ({ id: "", title: "", year: 0, genres: [], duration: 0, backdropUrl: "", posterUrl: "", description: "", avgRating: 0 } as any);

  const trending = rankedMovies.slice(0, 6);
  const popular = rankedMovies.slice(2, 8);
  const recommended = rankedMovies.slice(1, 7);
  const watchlist = movies.filter(m => watchlistMovies.includes(m.id));

  const friendReviews = reviews.filter(r => ["u1", "u2", "u3"].includes(r.userId) && r.movieId).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Hero Banner */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={featured.backdropUrl} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end pb-16 px-8 md:px-12">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} className="text-[#e50914]" />
              <span className="text-[#e50914] text-sm" style={{ fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Tendencia #1</span>
            </div>
            <h1 className="text-white mb-3" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1 }}>
              {featured.title}
            </h1>
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
              <span className="text-white" style={{ fontWeight: 500 }}>{featured.year}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>{featured.genres.join(" · ")}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>{featured.duration} min</span>
                <div className="flex items-center gap-1 text-[#e50914]">
                <Star size={13} fill="#e50914" />
                <span className="text-white" style={{ fontWeight: 600 }}>{featured.avgRating}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">{featured.description}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/movie/${featured.id}`)}
                className="flex items-center gap-2 bg-[#e50914] hover:bg-[#c20810] text-white px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30"
                style={{ fontWeight: 600 }}
              >
                <Play size={16} fill="white" />
                Ver detalles
              </button>
              <button className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/5" style={{ fontWeight: 500 }}>
                <Heart size={16} />
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 pb-20">

        {/* Trending this week */}
        <Section title="Tendencias de la semana" icon={TrendingUp} onMore={() => navigate("/home")}>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {trending.map(movie => <MovieCard key={movie.id} movie={movie} size="md" />)}
          </div>
        </Section>

        {/* Two column layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
          <div className="xl:col-span-2 space-y-10">

            {/* Popular */}
            <Section title="Populares ahora" icon={Star} onMore={() => navigate("/home")}>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {popular.map(movie => <MovieCard key={movie.id} movie={movie} size="lg" />)}
              </div>
            </Section>

            {/* Recommendations */}
            <Section title="Para ti, basado en tus gustos" icon={Sparkles} onMore={() => navigate("/home")}>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {recommended.map(movie => <MovieCard key={movie.id} movie={movie} size="md" />)}
              </div>
            </Section>

            {/* Friend reviews */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-[#e50914]" />
                  <h2 className="text-white" style={{ fontWeight: 700, fontSize: "17px" }}>Reseñas de tus amigos</h2>
                </div>
                <button className="text-gray-500 hover:text-white text-sm transition-colors flex items-center gap-1">
                  Ver todas <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-4">
                {friendReviews.map(review => {
                  const user = users.find(u => u.id === review.userId) || currentUser;
                  const movie = movies.find(m => m.id === review.movieId);
                  if (!movie) return null;
                  return (
                    <div key={review.id} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
                      <div className="flex gap-4">
                                <img
                                  src={movie.posterUrl}
                                  alt={movie.title}
                                  className="w-16 h-24 object-cover rounded-xl flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => navigate(`/movie/${movie.id}`)}
                                />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <span className="text-white text-sm" style={{ fontWeight: 600 }}>{user.name}</span>
                              <span className="text-gray-500 text-xs ml-2">calificó</span>
                              <span className="text-white text-sm ml-1 hover:text-[#e50914] cursor-pointer transition-colors" onClick={() => navigate(`/movie/${movie.id}`)}>{movie.title}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} size={12} fill={i < review.rating ? "#e50914" : "transparent"} className={i < review.rating ? "text-[#e50914]" : "text-[#333]"} />
                            ))}
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{review.content}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-gray-700 text-xs">{review.createdAt ? review.createdAt.split("T")[0] : ""}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Watchlist preview */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-[#e50914]" />
                  <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Mi Watchlist</h3>
                </div>
                <button
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                  onClick={() => navigate("/watchlist")}
                >
                  Ver todo
                </button>
              </div>
              <div className="space-y-3">
                {watchlist.map(movie => (
                  <div key={movie.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate(`/movie/${movie.id}`)}>
                    <img src={movie.posterUrl} alt={movie.title} className="w-10 h-14 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate group-hover:text-[#e50914] transition-colors">{movie.title}</p>
                      <p className="text-gray-600 text-xs">{movie.genres[0]} · {movie.year}</p>
                    </div>
                    <Star size={12} fill="#e50914" className="text-[#e50914] flex-shrink-0" />
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/watchlist")}
                className="w-full mt-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-sm transition-all"
              >
                + Agregar película
              </button>
            </div>

            {/* Suggested friends */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Sugerencias</h3>
                <button className="text-xs text-gray-500 hover:text-white transition-colors" onClick={() => navigate("/social")}>Ver más</button>
              </div>
              <div className="space-y-3">
                {users.map(user => (
                  <div key={user.id} className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate" style={{ fontWeight: 500 }}>{user.name}</p>
                      <p className="text-gray-600 text-xs">{user.stats.reviews} reseñas</p>
                    </div>
                    <button className={`text-xs px-3 py-1.5 rounded-lg transition-all ${user.isFollowing ? "bg-white/5 text-gray-400" : "bg-[#e50914] text-white hover:bg-[#c20810]"}`}>
                      {user.isFollowing ? "Siguiendo" : "Seguir"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, onMore, children }: { title: string; icon: any; onMore?: () => void; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-[#e50914]" />
          <h2 className="text-white" style={{ fontWeight: 700, fontSize: "17px" }}>{title}</h2>
        </div>
        {onMore && (
          <button className="text-gray-500 hover:text-white text-sm transition-colors flex items-center gap-1" onClick={onMore}>
            Ver todas <ChevronRight size={14} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
