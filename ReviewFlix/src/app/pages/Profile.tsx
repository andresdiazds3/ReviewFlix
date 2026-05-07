import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Star, Edit3, Settings, Film, BookOpen, Heart, Clock, Users, TrendingUp, MessageCircle, Share2 } from "lucide-react";
import { movies, reviews, users, currentUser } from "../data/mockData";

export function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isOwn = !id || id === "u0";
  const profile = isOwn ? currentUser : (users.find(u => u.id === id) || currentUser);
  const [tab, setTab] = useState<"reviews" | "lists" | "activity">("reviews");
  const [isFollowing, setIsFollowing] = useState(!isOwn && (users.find(u => u.id === id)?.isFollowing ?? false));

  const userReviews = reviews.filter(r => r.userId === profile.id).concat(reviews.slice(0, 2));
  const topMovies = profile.topMovies.map(mid => movies.find(m => m.id === mid)!).filter(Boolean);

  const recentActivity = [
    { text: `Calificó ${movies[0].title}`, time: "2h", type: "rating" },
    { text: `Escribió reseña de ${movies[2].title}`, time: "1d", type: "review" },
    { text: `Agregó ${movies[5].title} a su watchlist`, time: "2d", type: "watchlist" },
    { text: `Actualizó su Top 5`, time: "3d", type: "top5" },
  ];

  const lists = [
    { title: "Mejores del 2024", count: 12, movies: movies.slice(0, 4) },
    { title: "Thriller imperdibles", count: 8, movies: movies.slice(2, 6) },
    { title: "Para ver con lluvia", count: 6, movies: movies.slice(1, 5) },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Profile header */}
      <div className="relative">
        <div className="h-48 md:h-64 overflow-hidden">
          <img
            src={topMovies[0]?.backdrop || movies[0].backdrop}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-16 pb-8 relative z-10">
            <div className="relative flex-shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-[#0a0a0a] shadow-2xl"
              />
              {isOwn && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#e50914] rounded-xl flex items-center justify-center shadow-lg">
                  <Edit3 size={13} className="text-white" />
                </button>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                <div>
                  <h1 className="text-white" style={{ fontSize: "26px", fontWeight: 800 }}>{profile.name}</h1>
                  <p className="text-gray-500 text-sm">@{profile.username}</p>
                </div>
                <div className="flex items-center gap-3 sm:ml-auto">
                  {isOwn ? (
                    <>
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-all">
                        <Settings size={14} />
                        Editar perfil
                      </button>
                      <button className="p-2.5 rounded-xl border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all">
                        <Share2 size={15} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all ${isFollowing ? "bg-white/5 border border-white/10 text-gray-300" : "bg-[#e50914] hover:bg-[#c20810] text-white"}`}
                        style={{ fontWeight: 500 }}
                      >
                        <Users size={14} />
                        {isFollowing ? "Siguiendo" : "Seguir"}
                      </button>
                      <button
                        onClick={() => navigate("/chat")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-gray-300 text-sm transition-all"
                      >
                        <MessageCircle size={14} />
                        Mensaje
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">{profile.bio}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Reseñas", value: profile.stats.reviews, icon: BookOpen },
                  { label: "Películas vistas", value: profile.stats.watched, icon: Film },
                  { label: "Calificaciones", value: profile.stats.ratings, icon: Star },
                  { label: "Watchlist", value: profile.stats.watchlist, icon: Clock },
                  { label: "Seguidores", value: profile.stats.followers, icon: Users },
                  { label: "Siguiendo", value: profile.stats.following, icon: TrendingUp },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="text-center">
                    <div className="flex items-center gap-1 text-white">
                      <Icon size={13} className="text-[#e50914]" />
                      <span style={{ fontWeight: 700, fontSize: "18px" }}>{value.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 pb-20">

        {/* Top 5 */}
        {topMovies.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <Heart size={16} className="text-[#e50914]" />
              <h2 className="text-white" style={{ fontWeight: 700, fontSize: "17px" }}>Películas favoritas</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {topMovies.map((movie, i) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 cursor-pointer group"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-28 h-40 object-cover rounded-2xl group-hover:opacity-80 transition-opacity border border-white/5"
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 bg-[#e50914] rounded-lg flex items-center justify-center">
                      <span className="text-white" style={{ fontSize: "11px", fontWeight: 800 }}>{i + 1}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-2 w-28 truncate group-hover:text-white transition-colors">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 bg-[#111] p-1 rounded-2xl border border-white/[0.06] w-fit">
          {[
            { key: "reviews", label: "Reseñas" },
            { key: "lists", label: "Listas" },
            { key: "activity", label: "Actividad" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`px-5 py-2.5 rounded-xl text-sm transition-all ${tab === key ? "bg-[#e50914] text-white" : "text-gray-500 hover:text-white"}`}
              style={{ fontWeight: tab === key ? 600 : 400 }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Reviews tab */}
        {tab === "reviews" && (
          <div className="space-y-4">
            {userReviews.map((review, i) => {
              const movie = movies.find(m => m.id === review.movieId) || movies[i % movies.length];
              return (
                <div key={`${review.id}-${i}`} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
                  <div className="flex gap-4">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded-xl flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className="text-white cursor-pointer hover:text-[#e50914] transition-colors"
                            style={{ fontWeight: 600 }}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                          >
                            {movie.title}
                          </h3>
                          <p className="text-gray-600 text-xs">{movie.year} · {movie.genres[0]}</p>
                        </div>
                        <span className="text-gray-600 text-xs">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array(5).fill(0).map((_, si) => (
                          <Star key={si} size={12} fill={si < review.rating ? "#e50914" : "transparent"} className={si < review.rating ? "text-[#e50914]" : "text-[#333]"} />
                        ))}
                        <span className="text-gray-500 text-xs ml-1">{review.rating}/5</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{review.content}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#e50914] transition-colors">
                          <Heart size={12} />
                          {review.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
                          <MessageCircle size={12} />
                          Comentar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lists tab */}
        {tab === "lists" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lists.map((list, i) => (
              <div key={i} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center">
                    <BookOpen size={16} className="text-[#e50914]" />
                  </div>
                  <div>
                    <p className="text-white" style={{ fontWeight: 600 }}>{list.title}</p>
                    <p className="text-gray-500 text-sm">{list.count} películas</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {list.movies.slice(0, 4).map((m, mi) => (
                    <img key={`${m.id}-${mi}`} src={m.poster} alt={m.title} className="w-14 h-20 object-cover rounded-xl" />
                  ))}
                  {list.count > 4 && (
                    <div className="w-14 h-20 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">+{list.count - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isOwn && (
              <button className="bg-[#111] border border-dashed border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all text-center h-40 flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-xl border border-dashed border-white/20 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">+</span>
                </div>
                <span className="text-gray-500 text-sm">Nueva lista</span>
              </button>
            )}
          </div>
        )}

        {/* Activity tab */}
        {tab === "activity" && (
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#111] border border-white/[0.06] rounded-2xl p-4 hover:border-white/10 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center flex-shrink-0">
                  {item.type === "rating" && <Star size={14} className="text-[#e50914]" />}
                  {item.type === "review" && <BookOpen size={14} className="text-[#e50914]" />}
                  {item.type === "watchlist" && <Clock size={14} className="text-[#e50914]" />}
                  {item.type === "top5" && <TrendingUp size={14} className="text-[#e50914]" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </div>
                <span className="text-gray-600 text-xs">{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
