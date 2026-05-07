import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Search, Home, Trophy, Users, MessageCircle, Bookmark, Film, ChevronDown, X } from "lucide-react";
import { currentUser, movies } from "../data/mockData";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery.length > 1
    ? movies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const navLinks = [
    { to: "/home", icon: Home, label: "Inicio" },
    { to: "/rankings", icon: Trophy, label: "Rankings" },
    { to: "/social", icon: Users, label: "Social" },
    { to: "/chat", icon: MessageCircle, label: "Chat" },
    { to: "/watchlist", icon: Bookmark, label: "Watchlist" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center gap-6">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-[#e50914] rounded-lg flex items-center justify-center">
            <Film size={16} className="text-white" />
          </div>
          <span className="text-white hidden sm:block" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "2px" }}>
            ReviewFlix
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1 flex-1">
          {navLinks.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to || location.pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? "bg-[#e50914]/10 text-[#e50914]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile nav */}
        <div className="flex lg:hidden items-center gap-1 flex-1 overflow-x-auto scrollbar-hide">
          {navLinks.map(({ to, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`p-2 rounded-lg flex-shrink-0 transition-all ${active ? "text-[#e50914]" : "text-gray-500"}`}
              >
                <Icon size={18} />
              </Link>
            );
          })}
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2 w-64">
                <Search size={15} className="text-gray-400 flex-shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar películas..."
                  className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-500"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                  <X size={14} className="text-gray-500 hover:text-white" />
                </button>
                {filtered.length > 0 && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-[#111] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
                    {filtered.map(m => (
                      <button key={m.id}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
                        onClick={() => { navigate(`/movie/${m.id}`); setSearchOpen(false); setSearchQuery(""); }}
                      >
                        <img src={m.poster} alt={m.title} className="w-8 h-12 object-cover rounded" />
                        <div>
                          <p className="text-white text-sm">{m.title}</p>
                          <p className="text-gray-500 text-xs">{m.year} · {m.genres[0]}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all"
          >
            <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
            <ChevronDown size={14} className="text-gray-500 hidden sm:block" />
          </button>
        </div>
      </div>
    </nav>
  );
}