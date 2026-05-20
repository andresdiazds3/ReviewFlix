import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Trophy, GripVertical, Star, Users, Zap, X } from "lucide-react";
import { users, currentUser } from "../data/mockData";
import useMovies from "../../hooks/useMovies";
import { getTopMoviesByRating } from "../../utils/movieRanking";
import { useRanking } from "../../hooks/useRanking";

export function Rankings() {
  const navigate = useNavigate();
  const { movies } = useMovies();
  const {
    topMovies: myTop,
    availableMovies,
    addMovieById,
    removeMovie,
    moveMovie,
    isFull,
  } = useRanking(movies, currentUser.topMovies);
  const topGlobalMovies = getTopMoviesByRating(movies, 5);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const dragIdx = useRef<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);

  const handleDragStart = (i: number) => { dragIdx.current = i; };
  const handleDragEnter = (i: number) => { dragOverIdx.current = i; };
  const handleDragEnd = () => {
    if (dragIdx.current === null || dragOverIdx.current === null) return;
    if (dragIdx.current === dragOverIdx.current) return;
    moveMovie(dragIdx.current, dragOverIdx.current);
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  const availableOptions = useMemo(() => {
    return availableMovies.map((m) => ({ id: m.id, title: m.title }));
  }, [availableMovies]);

  const handleAddMovie = () => {
    if (!selectedMovieId) return;
    const added = addMovieById(selectedMovieId);
    if (added) setSelectedMovieId("");
  };

  const compatibility = [
    { user: users[0], score: 87, shared: ["m1", "m4"] },
    { user: users[1], score: 72, shared: ["m4", "m9"] },
    { user: users[2], score: 61, shared: ["m3"] },
  ];

  const rankColors = ["#e50914", "#ff6b35", "#ffd700", "#4ade80", "#60a5fa"];
  const rankLabels = ["#1", "#2", "#3", "#4", "#5"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 pb-20">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center">
            <Trophy size={22} className="text-[#e50914]" />
          </div>
          <div>
            <h1 className="text-white" style={{ fontSize: "28px", fontWeight: 800 }}>Rankings</h1>
            <p className="text-gray-500 text-sm">Tu Top 5 personal y el de tus amigos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* My Top 5 */}
          <div className="xl:col-span-2">
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-white" style={{ fontWeight: 700, fontSize: "18px" }}>Mi Top 5</h2>
                  <p className="text-gray-500 text-sm mt-0.5">Arrastra para reordenar</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center gap-2 bg-[#0d0d0d] border border-white/10 rounded-xl px-2 py-1.5">
                    <select
                      value={selectedMovieId}
                      onChange={(e) => setSelectedMovieId(e.target.value)}
                      className="bg-transparent text-gray-300 text-xs outline-none"
                    >
                      <option value="">Agregar película</option>
                      {availableOptions.map((m) => (
                        <option key={m.id} value={m.id}>{m.title}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddMovie}
                      disabled={!selectedMovieId || isFull}
                      className="px-2 py-1 rounded-lg text-xs text-white bg-[#e50914] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-[#e50914]/10 border border-[#e50914]/20 rounded-xl px-3 py-1.5">
                    <GripVertical size={14} className="text-[#e50914]" />
                    <span className="text-[#e50914] text-xs" style={{ fontWeight: 600 }}>Editable</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {myTop.length > 0 ? (
                  myTop.map((movie, i) => (
                    <div
                      key={movie.id}
                      draggable
                      onDragStart={() => handleDragStart(i)}
                      onDragEnter={() => handleDragEnter(i)}
                      onDragEnd={handleDragEnd}
                      onDragOver={e => e.preventDefault()}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d0d0d] border border-white/[0.04] hover:border-white/10 cursor-grab active:cursor-grabbing hover:bg-[#131313] transition-all group"
                    >
                      {/* Rank number */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: rankColors[i] + "15", border: `1px solid ${rankColors[i]}25` }}>
                        <span style={{ color: rankColors[i], fontWeight: 800, fontSize: "16px", fontFamily: "'Bebas Neue', sans-serif" }}>
                          {rankLabels[i]}
                        </span>
                      </div>

                      {/* Poster */}
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-14 h-20 object-cover rounded-xl flex-shrink-0"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate cursor-pointer hover:text-[#e50914] transition-colors" style={{ fontWeight: 600 }} onClick={() => navigate(`/movie/${movie.id}`)}>
                          {movie.title}
                        </p>
                        <p className="text-gray-500 text-sm">{movie.year} · {movie.genres[0]}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          {Array(5).fill(0).map((_, si) => (
                            <Star key={si} size={10} fill={si < Math.floor(movie.avgRating) ? "#e50914" : "transparent"} className={si < Math.floor(movie.avgRating) ? "text-[#e50914]" : "text-[#333]"} />
                          ))}
                          <span className="text-gray-500 text-xs ml-1">{movie.avgRating}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeMovie(movie.id)}
                        className="p-2 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-colors"
                        aria-label="Eliminar"
                      >
                        <X size={14} />
                      </button>

                      {/* Drag handle */}
                      <GripVertical size={16} className="text-gray-700 group-hover:text-gray-500 flex-shrink-0 transition-colors" />
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-10 text-center text-gray-500 text-sm">
                    Tu top esta vacio. Agrega peliculas para completar tu Top 5.
                  </div>
                )}
              </div>
            </div>

            {/* Friends' Tops */}
            <div className="mt-6">
              <h2 className="text-white mb-5" style={{ fontWeight: 700, fontSize: "18px" }}>Top 5 de mis amigos</h2>
              <div className="space-y-4">
                {users.slice(0, 2).map(user => (
                  <div key={user.id} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3 mb-5">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-white text-sm" style={{ fontWeight: 600 }}>{user.name}</p>
                        <p className="text-gray-600 text-xs">@{user.username}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {user.topMovies.slice(0, 5).map((mid, idx) => {
                        const m = movies.find(mv => mv.id === mid);
                        if (!m) return null;
                        return (
                          <div key={mid} className="flex-shrink-0 w-20 cursor-pointer group" onClick={() => navigate(`/movie/${m.id}`)}>
                            <div className="relative">
                              <img src={m.posterUrl} alt={m.title} className="w-20 h-28 object-cover rounded-xl group-hover:opacity-80 transition-opacity" />
                              <div className="absolute -top-2 -left-1 w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: rankColors[idx], fontSize: "11px", fontWeight: 800 }}>
                                {idx + 1}
                              </div>
                            </div>
                            <p className="text-gray-400 text-xs mt-1.5 truncate">{m.title}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Compatibility */}
          <div className="space-y-5">
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <Zap size={16} className="text-[#e50914]" />
                <h3 className="text-white" style={{ fontWeight: 700 }}>Compatibilidad cinéfila</h3>
              </div>
              <div className="space-y-4">
                {compatibility.map(({ user, score, shared }) => (
                  <div key={user.id} className="bg-[#0d0d0d] rounded-xl p-4 border border-white/[0.04]">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-white text-sm" style={{ fontWeight: 600 }}>{user.name}</p>
                        <p className="text-gray-600 text-xs">{shared.length} películas en común</p>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-lg"
                          style={{
                            fontWeight: 800,
                            color: score >= 80 ? "#4ade80" : score >= 60 ? "#ffd700" : "#ff6b35",
                          }}
                        >
                          {score}%
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${score}%`,
                          background: score >= 80 ? "#4ade80" : score >= 60 ? "#ffd700" : "#ff6b35",
                        }}
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      {shared.map(mid => {
                        const m = movies.find(mv => mv.id === mid);
                        return m ? (
                          <img key={mid} src={m.posterUrl} alt={m.title} className="w-8 h-12 object-cover rounded-md" title={m.title} />
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global rankings */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={15} className="text-[#e50914]" />
                <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Top global ReviewFlix</h3>
              </div>
              <div className="space-y-3">
                {topGlobalMovies.map((m, i) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => navigate(`/movie/${m.id}`)}
                  >
                    <span style={{ color: rankColors[i], fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", width: 24 }}>
                      {i + 1}
                    </span>
                    <img src={m.posterUrl} alt={m.title} className="w-9 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate group-hover:text-[#e50914] transition-colors">{m.title}</p>
                      <div className="flex items-center gap-1">
                        <Star size={10} fill="#e50914" className="text-[#e50914]" />
                        <span className="text-gray-500 text-xs">{m.avgRating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shared rankings */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users size={15} className="text-[#e50914]" />
                <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Rankings compartidos</h3>
              </div>
              {[
                { title: "Mejores de 2024", author: "Sofía Méndez", movies: 5 },
                { title: "Thriller psicológico", author: "Elena Torres", movies: 8 },
                { title: "Sci-Fi imperdibles", author: "Marcos Gil", movies: 6 },
              ].map((list, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-white/[0.04] last:border-0">
                  <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center flex-shrink-0">
                    <Trophy size={14} className="text-[#e50914]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm" style={{ fontWeight: 500 }}>{list.title}</p>
                    <p className="text-gray-600 text-xs">{list.author} · {list.movies} películas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
