import { useNavigate } from "react-router";
import { Star, Users, Film, TrendingUp, MessageSquare, ListOrdered, Sparkles, Play, ArrowRight, Github, Twitter, Instagram } from "lucide-react";
import { HERO_BG, CINEMA_BG, POSTERS, AVATARS } from "../data/mockData";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#e50914] rounded-lg flex items-center justify-center">
              <Film size={16} className="text-white" />
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "2px" }}>ReviewFlix</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Funciones</a>
            <a href="#community" className="hover:text-white transition-colors">Comunidad</a>
            <a href="#stats" className="hover:text-white transition-colors">Estadísticas</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/home")}
              className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/home")}
              className="bg-[#e50914] hover:bg-[#c20810] text-white text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30"
            >
              Comenzar ahora
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />
        </div>

        {/* Floating movie cards */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { src: POSTERS.scifi, pos: "top-24 left-[5%] w-28 h-40", rot: "-8deg", delay: "0s" },
            { src: POSTERS.crime, pos: "top-32 right-[8%] w-24 h-36", rot: "6deg", delay: "0.2s" },
            { src: POSTERS.horror, pos: "bottom-40 left-[10%] w-24 h-36", rot: "5deg", delay: "0.4s" },
            { src: POSTERS.animated, pos: "bottom-32 right-[6%] w-28 h-40", rot: "-5deg", delay: "0.6s" },
            { src: POSTERS.romance, pos: "top-1/2 left-[2%] w-20 h-28", rot: "10deg", delay: "0.8s" },
            { src: POSTERS.mystery, pos: "top-1/3 right-[2%] w-20 h-28", rot: "-10deg", delay: "1s" },
          ].map((card, i) => (
            <div
              key={i}
              className={`absolute ${card.pos} rounded-xl overflow-hidden shadow-2xl border border-white/10`}
              style={{ transform: `rotate(${card.rot})`, animationDelay: card.delay, opacity: 0.6 }}
            >
              <img src={card.src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400 mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="text-[#e50914]" />
            La plataforma social de cine más elegante del mundo
          </div>
          <h1 className="text-white mb-6 leading-none" style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 800, letterSpacing: "-2px" }}>
            El cine nunca fue<br />
            <span className="text-[#e50914]">tan social.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7 }}>
            Descubre películas, escribe reseñas, sigue a tus amigos y recibe recomendaciones personalizadas. Todo en un solo lugar, diseñado para los que viven el cine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="bg-[#e50914] hover:bg-[#c20810] text-white px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/40 hover:scale-105 flex items-center gap-2"
              style={{ fontWeight: 600, fontSize: "16px" }}
            >
              Comenzar ahora — es gratis
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/home")}
              className="border border-white/10 hover:border-white/30 text-white px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-white/5 flex items-center gap-2"
              style={{ fontWeight: 500, fontSize: "16px" }}
            >
              <Play size={16} className="text-[#e50914]" />
              Explorar películas
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-6">Sin tarjeta de crédito · Configuración en 30 segundos</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#e50914]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse" />
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 border-y border-white/[0.05] bg-gradient-to-r from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { value: "+10,000", label: "Reseñas escritas", sub: "y creciendo cada día" },
              { value: "+2,500", label: "Usuarios activos", sub: "cinéfilos apasionados" },
              { value: "+15,000", label: "Películas registradas", sub: "de todos los géneros" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-[#e50914] mb-2 group-hover:scale-110 transition-transform" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "1px" }}>
                  {stat.value}
                </div>
                <p className="text-white mb-1" style={{ fontWeight: 600, fontSize: "16px" }}>{stat.label}</p>
                <p className="text-gray-500 text-sm">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#e50914] text-sm mb-3" style={{ fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Funcionalidades</p>
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-1px" }}>
              Todo lo que un cinéfilo necesita
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">Construido para los que aman el cine de verdad. No para los que simplemente lo ven.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Star,
                title: "Califica con precisión",
                desc: "Sistema de rating intuitivo con medias estrellas, historial completo de calificaciones y estadísticas detalladas de tu perfil cinéfilo.",
                color: "#e50914",
                img: POSTERS.scifi,
              },
              {
                icon: MessageSquare,
                title: "Reseñas que importan",
                desc: "Escribe críticas personales con formato rico, recibe likes de la comunidad y construye tu reputación como crítico de referencia.",
                color: "#6366f1",
                img: POSTERS.drama,
              },
              {
                icon: Users,
                title: "Tu círculo cinéfilo",
                desc: "Sigue a amigos, descubre sus opiniones, compara gustos y encuentra personas con tu misma sensibilidad cinematográfica.",
                color: "#10b981",
                img: POSTERS.crime,
              },
              {
                icon: Sparkles,
                title: "Recomendaciones inteligentes",
                desc: "IA que aprende de tus gustos, tu historial y el de tus amigos para sugerirte exactamente lo que quieres ver esta noche.",
                color: "#f59e0b",
                img: POSTERS.animated,
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="relative group bg-[#111] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/10 transition-all duration-500 hover:shadow-2xl"
                style={{ minHeight: 200 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                  <img src={feat.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 p-8 flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: feat.color + "15", border: `1px solid ${feat.color}20` }}>
                      <feat.icon size={22} style={{ color: feat.color }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white mb-3" style={{ fontWeight: 700, fontSize: "18px" }}>{feat.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social/Community Section */}
      <section id="community" className="py-28 bg-gradient-to-b from-transparent via-[#0d0d0d] to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#e50914] text-sm mb-3" style={{ fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Comunidad</p>
              <h2 className="text-white mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-1px" }}>
                El cine es mejor<br />cuando lo compartes
              </h2>
              <div className="space-y-5">
                {[
                  { icon: ListOrdered, text: "Crea listas y rankings personales que reflejen tu gusto único" },
                  { icon: Users, text: "Comparte watchlists con amigos y descubran juntos qué ver" },
                  { icon: TrendingUp, text: "Sigue perfiles de críticos y cinéfilos que admiras" },
                  { icon: MessageSquare, text: "Debate opiniones, recomienda en chats privados y grupales" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-[#e50914]" />
                    </div>
                    <p className="text-gray-300 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/home")}
                className="mt-10 bg-[#e50914] hover:bg-[#c20810] text-white px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-red-900/30 flex items-center gap-2"
                style={{ fontWeight: 600 }}
              >
                Únete a la comunidad
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Social proof cards */}
            <div className="relative">
              <div className="relative space-y-4">
                {[
                  {
                    user: "Sofía Méndez",
                    username: "@sofiamendez",
                    avatar: AVATARS.sofia,
                    text: "ReviewFlix cambió la forma en que veo películas. Ahora cada film es una conversación.",
                    rating: 5,
                    movie: "Eclipse Protocol",
                  },
                  {
                    user: "Marcos Gil",
                    username: "@marcosgil",
                    avatar: AVATARS.marcos,
                    text: "Por fin una plataforma que trata las reseñas como arte. El diseño es impecable.",
                    rating: 5,
                    movie: "City of Mirrors",
                  },
                  {
                    user: "Elena Torres",
                    username: "@elenatorres",
                    avatar: AVATARS.elena,
                    text: "Las recomendaciones son sorprendentemente precisas. Llevo 3 meses y no me ha fallado una.",
                    rating: 5,
                    movie: "Hollow Eden",
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all duration-300 hover:translate-x-1 hover:shadow-xl hover:shadow-black/50"
                    style={{ marginLeft: i % 2 === 1 ? "24px" : 0 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={t.avatar} alt={t.user} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-white text-sm" style={{ fontWeight: 600 }}>{t.user}</p>
                        <p className="text-gray-600 text-xs">{t.username}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-0.5">
                        {Array(5).fill(0).map((_, si) => (
                          <Star key={si} size={10} fill="#e50914" className="text-[#e50914]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">"{t.text}"</p>
                    <p className="text-gray-600 text-xs">sobre <span className="text-[#e50914]">{t.movie}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={CINEMA_BG} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="w-16 h-16 bg-[#e50914]/10 border border-[#e50914]/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Film size={28} className="text-[#e50914]" />
          </div>
          <h2 className="text-white mb-6" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-2px" }}>
            Tu próxima película<br />favorita empieza aquí
          </h2>
          <p className="text-gray-500 mb-10" style={{ fontSize: "18px" }}>
            Únete a miles de cinéfilos que ya están descubriendo, calificando y compartiendo su pasión por el cine.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-[#e50914] hover:bg-[#c20810] text-white px-10 py-5 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/40 hover:scale-105"
            style={{ fontWeight: 700, fontSize: "18px" }}
          >
            Únete a ReviewFlix — gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#e50914] rounded-lg flex items-center justify-center">
                  <Film size={16} className="text-white" />
                </div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "2px" }}>ReviewFlix</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">La plataforma social de reseñas de películas para cinéfilos de verdad.</p>
            </div>
            {[
              { title: "Plataforma", links: ["Descubrir", "Rankings", "Social", "Watchlist"] },
              { title: "Empresa", links: ["Sobre nosotros", "Blog", "Carreras", "Prensa"] },
              { title: "Legal", links: ["Privacidad", "Términos", "Cookies", "Contacto"] },
            ].map((col, i) => (
              <div key={i}>
                <p className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="text-gray-600 text-sm hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05]">
            <p className="text-gray-700 text-sm">© 2024 ReviewFlix. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {[Twitter, Github, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Icon size={15} className="text-gray-500 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
