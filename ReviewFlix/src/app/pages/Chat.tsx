import { useState } from "react";
import { useNavigate } from "react-router";
import { Send, Search, MoreHorizontal, Star } from "lucide-react";
import { users, movies, messages, currentUser } from "../data/mockData";

export function Chat() {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(users[0].id);
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);

  const activeUser = users.find(u => u.id === activeChat) || users[0];

  const conversations = users.map(u => ({
    user: u,
    lastMessage: u.id === users[0].id ? "Exacto! Y la escena del espejo... 🤯" : u.id === users[1].id ? "¿Qué te pareció City of Mirrors?" : "Oye, ¿viste Void Walker?",
    time: u.id === users[0].id ? "14:40" : u.id === users[1].id ? "Ayer" : "Lun",
    unread: u.id === users[1].id ? 2 : 0,
  }));

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg${Date.now()}`,
      userId: "u0",
      text,
      time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      movieRef: undefined,
    };
    setChatMessages(prev => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-0 h-[calc(100vh-120px)] min-h-[500px] bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">

          {/* Sidebar */}
          <div className="w-72 flex-shrink-0 border-r border-white/[0.06] flex flex-col">
            <div className="px-5 py-5 border-b border-white/[0.06]">
              <h2 className="text-white mb-4" style={{ fontWeight: 700, fontSize: "17px" }}>Mensajes</h2>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  placeholder="Buscar conversación..."
                  className="w-full bg-[#0a0a0a] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-[#e50914]/30 transition-colors"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(({ user, lastMessage, time, unread }) => (
                <button
                  key={user.id}
                  onClick={() => setActiveChat(user.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors text-left border-b border-white/[0.03] ${activeChat === user.id ? "bg-[#e50914]/5 border-l-2 border-l-[#e50914]" : ""}`}
                >
                  <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm truncate" style={{ fontWeight: 600 }}>{user.name}</p>
                      <span className="text-gray-600 text-xs flex-shrink-0 ml-2">{time}</span>
                    </div>
                    <p className="text-gray-500 text-xs truncate mt-0.5">{lastMessage}</p>
                  </div>
                  {unread > 0 && (
                    <span className="w-5 h-5 bg-[#e50914] rounded-full flex items-center justify-center text-white" style={{ fontSize: "10px", fontWeight: 700 }}>
                      {unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={() => navigate(`/profile/${activeUser.id}`)}
                />
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>{activeUser.name}</p>
              </div>
              <button className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                <MoreHorizontal size={17} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {chatMessages.map(msg => {
                const isMe = msg.isMe;
                const sender = isMe ? currentUser : activeUser;

                if (msg.movieRef) {
                  const m = movies.find(mv => mv.id === msg.movieRef);
                  return (
                    <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
                      {!isMe && <img src={sender.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-auto" />}
                      <div
                        className={`max-w-xs rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${isMe ? "rounded-br-md" : "rounded-bl-md"}`}
                        style={{ background: isMe ? "#e50914" : "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}
                        onClick={() => m && navigate(`/movie/${m.id}`)}
                      >
                        {m && <img src={m.poster} alt={m.title} className="w-full h-32 object-cover" />}
                        <div className="px-3 py-2.5">
                          <p className="text-white text-sm" style={{ fontWeight: 600 }}>{m?.title}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={10} fill={isMe ? "white" : "#e50914"} className={isMe ? "text-white" : "text-[#e50914]"} />
                            <span className="text-xs" style={{ color: isMe ? "rgba(255,255,255,0.7)" : "#9ca3af" }}>{m?.rating} · {m?.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
                    {!isMe && <img src={sender.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-auto" />}
                    <div>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm max-w-xs lg:max-w-sm ${isMe ? "bg-[#e50914] text-white rounded-br-md" : "bg-[#1a1a1a] text-gray-200 rounded-bl-md border border-white/[0.06]"}`}
                      >
                        {msg.text}
                      </div>
                      <p className={`text-gray-700 text-xs mt-1 ${isMe ? "text-right" : ""}`}>{msg.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input area */}
            <div className="px-6 pb-6 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center bg-[#1a1a1a] border border-white/[0.06] rounded-xl px-4">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-transparent text-white text-sm py-3 placeholder-gray-600 outline-none"
                  />
                </div>
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="p-3 bg-[#e50914] hover:bg-[#c20810] text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
