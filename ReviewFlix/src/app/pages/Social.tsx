import { useState } from "react";
import { useNavigate } from "react-router";
import { Users, Search, UserPlus, Star, TrendingUp, Bell, MessageCircle, Check, X } from "lucide-react";
import { users, movies, reviews, currentUser } from "../data/mockData";
import { ReviewCard } from "../components/ReviewCard";

export function Social() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"activity" | "friends" | "discover">("activity");
  const [searchQ, setSearchQ] = useState("");
  const [following, setFollowing] = useState<Record<string, boolean>>({ u1: true, u2: true });

  const allActivity = [
    { type: "review", user: users[0], movie: movies[0], review: reviews[0], time: "5 min" },
    { type: "rating", user: users[1], movie: movies[3], rating: 5, time: "23 min" },
    { type: "watchlist", user: users[0], movie: movies[7], time: "1h" },
    { type: "review", user: users[2], movie: movies[2], review: reviews[2], time: "2h" },
    { type: "top5", user: users[1], time: "3h" },
    { type: "rating", user: users[0], movie: movies[8], rating: 4, time: "5h" },
  ];

  const suggested = [
    { ...users[2], mutualFriends: 3, commonGenres: ["Terror", "Thriller"] },
    { id: "u4", name: "Rodrigo Paz", username: "rodrigopaz", avatar: users[1].avatar, bio: "Amateur de los westerns y documentales.", stats: users[1].stats, topMovies: users[1].topMovies, mutualFriends: 1, commonGenres: ["Drama"] },
  ];

  const pendingRequests = [users[2]];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 pb-20">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center">
            <Users size={22} className="text-[#e50914]" />
          </div>
          <div>
            <h1 className="text-white" style={{ fontSize: "28px", fontWeight: 800 }}>Social Hub</h1>
            <p className="text-gray-500 text-sm">Tu comunidad cinéfila</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-[#111] p-1 rounded-2xl border border-white/[0.06] w-fit">
          {[
            { key: "activity", label: "Actividad", icon: TrendingUp },
            { key: "friends", label: "Amigos", icon: Users },
            { key: "discover", label: "Descubrir", icon: UserPlus },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all ${tab === key ? "bg-[#e50914] text-white" : "text-gray-500 hover:text-white"}`}
              style={{ fontWeight: tab === key ? 600 : 400 }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">

            {/* Activity Feed */}
            {tab === "activity" && (
              <div className="space-y-4">
                {allActivity.map((item, i) => (
                  <div key={i} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 cursor-pointer"
                        onClick={() => navigate(`/profile/${item.user.id}`)}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <span
                              className="text-white text-sm cursor-pointer hover:text-[#e50914] transition-colors"
                              style={{ fontWeight: 600 }}
                              onClick={() => navigate(`/profile/${item.user.id}`)}
                            >
                              {item.user.name}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">
                              {item.type === "review" && "escribió una reseña de"}
                              {item.type === "rating" && `calificó con ${item.rating}★`}
                              {item.type === "watchlist" && "agregó a su watchlist"}
                              {item.type === "top5" && "actualizó su Top 5"}
                            </span>
                            {(item.type === "review" || item.type === "rating" || item.type === "watchlist") && item.movie && (
                              <span
                                className="text-white text-sm ml-1 cursor-pointer hover:text-[#e50914] transition-colors"
                                onClick={() => navigate(`/movie/${item.movie!.id}`)}
                              >
                                {item.movie.title}
                              </span>
                            )}
                          </div>
                          <span className="text-gray-600 text-xs flex-shrink-0 ml-3">{item.time}</span>
                        </div>

                        {item.type === "review" && item.review && (
                          <div className="mt-3">
                            <ReviewCard review={item.review} compact />
                          </div>
                        )}

                        {(item.type === "rating" || item.type === "watchlist") && item.movie && (
                          <div className="mt-3 flex items-center gap-3">
                            <img
                              src={item.movie.poster}
                              alt={item.movie.title}
                              className="w-12 h-16 object-cover rounded-lg cursor-pointer"
                              onClick={() => navigate(`/movie/${item.movie!.id}`)}
                            />
                            <div>
                              <p className="text-white text-sm" style={{ fontWeight: 500 }}>{item.movie.title}</p>
                              <p className="text-gray-600 text-xs">{item.movie.genres[0]} · {item.movie.year}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Friends list */}
            {tab === "friends" && (
              <div>
                {pendingRequests.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-white mb-3 text-sm" style={{ fontWeight: 700 }}>Solicitudes pendientes ({pendingRequests.length})</h3>
                    {pendingRequests.map(u => (
                      <div key={u.id} className="flex items-center gap-3 bg-[#111] border border-[#e50914]/20 rounded-2xl p-4 mb-3">
                        <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="text-white text-sm" style={{ fontWeight: 600 }}>{u.name}</p>
                          <p className="text-gray-500 text-xs">{u.stats.reviews} reseñas · {u.stats.watched} vistas</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-9 h-9 rounded-xl bg-green-600 hover:bg-green-700 flex items-center justify-center transition-colors">
                            <Check size={15} className="text-white" />
                          </button>
                          <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
                            <X size={15} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-3">
                  {users.filter(u => following[u.id]).map(user => (
                    <div key={user.id} className="bg-[#111] border border-white/[0.06] rounded-2xl p-4 hover:border-white/10 transition-all flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)}>
                      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-white" style={{ fontWeight: 600 }}>{user.name}</p>
                        <p className="text-gray-500 text-sm">@{user.username}</p>
                        <p className="text-gray-600 text-xs mt-1">{user.stats.reviews} reseñas · {user.stats.watched} vistas</p>
                      </div>
                      <div className="text-right">
                        <button
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-all"
                          onClick={e => { e.stopPropagation(); navigate(`/chat`); }}
                        >
                          <MessageCircle size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discover */}
            {tab === "discover" && (
              <div>
                <div className="relative mb-5">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    placeholder="Buscar usuarios por nombre o username..."
                    className="w-full bg-[#111] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#e50914]/40 transition-colors"
                  />
                </div>
                <div className="space-y-4">
                  {suggested.map((user, i) => (
                    <div key={i} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover cursor-pointer" />
                        <div className="flex-1">
                          <p className="text-white" style={{ fontWeight: 600 }}>{user.name}</p>
                          <p className="text-gray-500 text-sm">@{user.username}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-gray-600 text-xs">{user.mutualFriends} amigos en común</span>
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            {user.commonGenres.map(g => (
                              <span key={g} className="text-xs bg-[#e50914]/10 text-[#e50914] px-2 py-0.5 rounded border border-[#e50914]/20">{g}</span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => setFollowing(f => ({ ...f, [user.id]: !f[user.id] }))}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${following[user.id] ? "bg-white/5 border border-white/10 text-gray-400" : "bg-[#e50914] text-white hover:bg-[#c20810]"}`}
                          style={{ fontWeight: 500 }}
                        >
                          {following[user.id] ? <><Check size={13} /> Siguiendo</> : <><UserPlus size={13} /> Seguir</>}
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mt-3 ml-16">{user.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick stats */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-white mb-4 text-sm" style={{ fontWeight: 700 }}>Tu red social</h3>
              {[
                { label: "Amigos", value: currentUser.stats.following, icon: Users },
                { label: "Seguidores", value: currentUser.stats.followers, icon: Bell },
                { label: "Reseñas", value: currentUser.stats.reviews, icon: Star },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-2">
                    <Icon size={13} className="text-gray-600" />
                    <span className="text-gray-400 text-sm">{label}</span>
                  </div>
                  <span className="text-white text-sm" style={{ fontWeight: 600 }}>{value.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Friend suggestions */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-white mb-4 text-sm" style={{ fontWeight: 700 }}>Quizás te interese seguir</h3>
              <div className="space-y-3">
                {users.filter(u => !following[u.id]).slice(0, 3).map(user => (
                  <div key={user.id} className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate" style={{ fontWeight: 500 }}>{user.name}</p>
                      <p className="text-gray-600 text-xs">{user.stats.followers.toLocaleString()} seguidores</p>
                    </div>
                    <button
                      onClick={() => setFollowing(f => ({ ...f, [user.id]: true }))}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#e50914] text-white hover:bg-[#c20810] transition-colors"
                    >
                      Seguir
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