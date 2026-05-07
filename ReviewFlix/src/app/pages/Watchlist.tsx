import { useState } from "react";
import { useNavigate } from "react-router";
import { Bookmark, Heart, List, SlidersHorizontal, Star, Clock, Plus, Trash2, Search } from "lucide-react";
import { movies, watchlistMovies, favoriteMovies } from "../data/mockData";

const GENRES = ["Todos", "Sci-Fi", "Drama", "Thriller", "Crimen", "Romance", "Terror", "Animación", "Acción"];

export function Watchlist() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"watchlist" | "favorites" | "lists">("watchlist");
  const [genreFilter, setGenreFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState<"added" | "rating" | "year">("added");
  const [search, setSearch] = useState("");

  const wMovies = movies.filter(m => watchlistMovies.includes(m.id));
  const fMovies = movies.filter(m => favoriteMovies.includes(m.id));

  const filterAndSort = (list: typeof movies) => {
    let filtered = list.filter(m =>
      (genreFilter === "Todos" || m.genres.includes(genreFilter)) &&
      (search === "" || m.title.toLowerCase().includes(search.toLowerCase()))
    );
    if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    if (sortBy === "year") filtered = [...filtered].sort((a, b) => b.year - a.year);
    return filtered;
  };

  const displayMovies = tab === "watchlist" ? filterAndSort(wMovies) : filterAndSort(fMovies);

  const customLists = [
    { id: "cl1", name: "Ver este fin de semana", count: 4, movies: movies.slice(0, 4), color: "#6366f1" },
    { id: "cl2", name: "Recomendadas por amigos", count: 6, movies: movies.slice(2, 6), color: "#10b981" },
    { id: "cl3", name: "Premios & festivales", count: 8, movies: movies.slice(1, 5), color: "#f59e0b" },
  ];

  const recommendations = movies.filter(m => !watchlistMovies.includes(m.id) && !favoriteMovies.includes(m.id)).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 pb-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center">
              <Bookmark size={22} className="text-[#e50914]" />
            </div>
            <div>
              <h1 className="text-white" style={{ fontSize: "28px", fontWeight: 800 }}>Watchlist & Favoritos</h1>
              <p className="text-gray-500 text-sm">{wMovies.length} pendientes · {fMovies.length} favoritas</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#e50914] hover:bg-[#c20810] text-white px-4 py-2.5 rounded-xl text-sm transition-all" style={{ fontWeight: 600 }}>
            <Plus size={15} />
            Agregar
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 bg-[#111] p-1 rounded-2xl border border-white/[0.06] w-fit">
          {[
            { key: "watchlist", label: "Por ver", icon: Clock, count: wMovies.length },
            { key: "favorites", label: "Favoritas", icon: Heart, count: fMovies.length },
            { key: "lists", label: "Mis listas", icon: List, count: customLists.length },
          ].map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all ${tab === key ? "bg-[#e50914] text-white" : "text-gray-500 hover:text-white"}`}
              style={{ fontWeight: tab === key ? 600 : 400 }}
            >
              <Icon size={14} />
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-md ${tab === key ? "bg-white/20 text-white" : "bg-white/5 text-gray-600"}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {tab !== "lists" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    className="w-full bg-[#111] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-[#e50914]/30 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-gray-600" />
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="bg-[#111] border border-white/[0.06] rounded-xl px-3 py-2.5 text-white text-sm outline-none cursor-pointer"
                  >
                    <option value="added">Recién agregadas</option>
                    <option value="rating">Mayor rating</option>
                    <option value="year">Año</option>
                  </select>
                </div>
              </div>

              {/* Genre filters */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
                {GENRES.map(g => (
                  <button
                    key={g}
                    onClick={() => setGenreFilter(g)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs transition-all ${genreFilter === g ? "bg-[#e50914] text-white" : "bg-[#111] border border-white/[0.06] text-gray-500 hover:text-white"}`}
                    style={{ fontWeight: genreFilter === g ? 600 : 400 }}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Movies grid */}
              {displayMovies.length > 0 ? (
                <div className="space-y-3">
                  {displayMovies.map(movie => (
                    <div
                      key={movie.id}
                      className="flex items-center gap-4 bg-[#111] border border-white/[0.06] rounded-2xl p-4 hover:border-white/10 transition-all group"
                    >
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded-xl flex-shrink-0 cursor-pointer"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-white cursor-pointer hover:text-[#e50914] transition-colors mb-1"
                          style={{ fontWeight: 600 }}
                          onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                          {movie.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {movie.genres.map(g => (
                            <span key={g} className="text-xs bg-white/5 text-gray-500 px-2 py-0.5 rounded-md">{g}</span>
                          ))}
                        </div>
                        <p className="text-gray-500 text-xs">{movie.year} · {movie.director} · {movie.duration} min</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star size={11} fill="#e50914" className="text-[#e50914]" />
                          <span className="text-white text-xs" style={{ fontWeight: 600 }}>{movie.rating}</span>
                          <span className="text-gray-600 text-xs">({movie.votes.toLocaleString()} votos)</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 rounded-xl bg-[#e50914]/10 border border-[#e50914]/20 text-[#e50914] hover:bg-[#e50914] hover:text-white transition-all"
                          onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                          <Star size={14} />
                        </button>
                        <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:bg-red-900/20 hover:text-red-400 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                    {tab === "watchlist" ? <Clock size={24} className="text-gray-600" /> : <Heart size={24} className="text-gray-600" />}
                  </div>
                  <p className="text-gray-500">No hay películas que coincidan con los filtros</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={15} className="text-[#e50914]" />
                  <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>Recomendadas para ti</h3>
                </div>
                <div className="space-y-3">
                  {recommendations.map(m => (
                    <div key={m.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate(`/movie/${m.id}`)}>
                      <img src={m.poster} alt={m.title} className="w-10 h-14 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate group-hover:text-[#e50914] transition-colors">{m.title}</p>
                        <p className="text-gray-600 text-xs">{m.genres[0]}</p>
                      </div>
                      <button className="p-1.5 rounded-lg bg-[#e50914]/10 text-[#e50914] hover:bg-[#e50914] hover:text-white transition-all flex-shrink-0">
                        <Plus size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
                <h3 className="text-white text-sm mb-4" style={{ fontWeight: 700 }}>Resumen</h3>
                {[
                  { label: "Por ver", value: wMovies.length, color: "#6366f1" },
                  { label: "Favoritas", value: fMovies.length, color: "#e50914" },
                  { label: "Listas creadas", value: customLists.length, color: "#10b981" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span style={{ color, fontWeight: 700 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Lists tab */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {customLists.map(list => (
              <div key={list.id} className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: list.color + "15", border: `1px solid ${list.color}25` }}>
                    <List size={16} style={{ color: list.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white" style={{ fontWeight: 600 }}>{list.name}</p>
                    <p className="text-gray-500 text-sm">{list.count} películas</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {list.movies.slice(0, 4).map((m, i) => (
                    <img key={`${m.id}-${i}`} src={m.poster} alt={m.title} className="w-14 h-20 object-cover rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
            <button className="bg-[#111] border border-dashed border-white/[0.08] rounded-2xl p-5 hover:border-[#e50914]/30 transition-all flex flex-col items-center justify-center gap-3 h-48 group">
              <div className="w-12 h-12 rounded-2xl border border-dashed border-white/10 group-hover:border-[#e50914]/40 flex items-center justify-center transition-colors">
                <Plus size={20} className="text-gray-600 group-hover:text-[#e50914] transition-colors" />
              </div>
              <span className="text-gray-500 text-sm group-hover:text-white transition-colors">Crear nueva lista</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
