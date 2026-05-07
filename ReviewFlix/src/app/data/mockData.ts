export const HERO_BG = "https://images.unsplash.com/photo-1767066973428-b7d56f879ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80";
export const CINEMA_BG = "https://images.unsplash.com/photo-1759230766134-e3ff1c27d20e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";

export const POSTERS = {
  scifi: "https://images.unsplash.com/photo-1758685295938-e27200ff3f6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  action: "https://images.unsplash.com/photo-1669064851784-26629ebb7611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  mystery: "https://images.unsplash.com/photo-1766878778057-2caacb066ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  romance: "https://images.unsplash.com/photo-1771598480268-b8da5af0c67c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  horror: "https://images.unsplash.com/photo-1627682028405-9c5673287cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  animated: "https://images.unsplash.com/photo-1769008301392-3567c972c437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  crime: "https://images.unsplash.com/photo-1679089391756-a721c23e32d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  cinematic: "https://images.unsplash.com/photo-1767066973428-b7d56f879ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  drama: "https://images.unsplash.com/photo-1759230766134-e3ff1c27d20e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
};

export const AVATARS = {
  sofia: "https://images.unsplash.com/photo-1618661148759-0d481c0c2116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
  marcos: "https://images.unsplash.com/photo-1628619487925-e9b8fc4c6b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
  elena: "https://images.unsplash.com/photo-1776466336437-b30d0ef94cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
};

export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  genres: string[];
  duration: number;
  rating: number;
  votes: number;
  poster: string;
  backdrop: string;
  description: string;
  cast: string[];
  trailer: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  stats: { reviews: number; ratings: number; watched: number; watchlist: number; followers: number; following: number; };
  topMovies: string[];
  isFollowing?: boolean;
  isPending?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  movieId: string;
  rating: number;
  content: string;
  likes: number;
  date: string;
  liked?: boolean;
}

export const currentUser: User = {
  id: "u0",
  name: "Alex Reyes",
  username: "alexreyes",
  avatar: AVATARS.marcos,
  bio: "Cinéfilo empedernido. Colecciono emociones, no películas.",
  stats: { reviews: 47, ratings: 183, watched: 312, watchlist: 28, followers: 241, following: 89 },
  topMovies: ["m1", "m3", "m5", "m7", "m9"],
};

export const movies: Movie[] = [
  {
    id: "m1",
    title: "Eclipse Protocol",
    year: 2024,
    director: "Nora Vasquez",
    genres: ["Sci-Fi", "Thriller"],
    duration: 128,
    rating: 4.7,
    votes: 12400,
    poster: POSTERS.scifi,
    backdrop: POSTERS.scifi,
    description: "Un agente encubierto descubre que el protocolo que debe activar podría borrar toda memoria colectiva de la humanidad. Una carrera contra el tiempo, la identidad y la mente.",
    cast: ["Damien Cross", "Leila Morin", "Victor Saenz"],
    trailer: "#",
  },
  {
    id: "m2",
    title: "The Last Conductor",
    year: 2023,
    director: "James Okafor",
    genres: ["Drama", "Música"],
    duration: 142,
    rating: 4.5,
    votes: 8900,
    poster: POSTERS.drama,
    backdrop: POSTERS.drama,
    description: "El maestro de orquesta más grande del siglo XXI dirige su última sinfonía sabiendo que morirá antes de escuchar el final. Una carta de amor al arte y la mortalidad.",
    cast: ["Étienne Morel", "Sarah Chen", "André Petrov"],
    trailer: "#",
  },
  {
    id: "m3",
    title: "Phantom Frequency",
    year: 2024,
    director: "Sofia Delgado",
    genres: ["Misterio", "Terror"],
    duration: 105,
    rating: 4.3,
    votes: 6700,
    poster: POSTERS.mystery,
    backdrop: POSTERS.mystery,
    description: "Una detective investiga una ola de desapariciones vinculadas a una frecuencia de radio que solo algunas personas pueden escuchar. El límite entre la realidad y la paranoia desaparece.",
    cast: ["Mara Flynn", "David Osei", "Keiko Tanaka"],
    trailer: "#",
  },
  {
    id: "m4",
    title: "Crimson Descent",
    year: 2023,
    director: "Marco Bellini",
    genres: ["Crimen", "Thriller"],
    duration: 135,
    rating: 4.6,
    votes: 15200,
    poster: POSTERS.crime,
    backdrop: POSTERS.crime,
    description: "Un fiscal incorruptible se convierte en el principal sospechoso de un crimen que él mismo debe resolver. Una trampa perfecta tejida en los oscuros pasillos del poder.",
    cast: ["Lucas Harman", "Irina Sokolova", "Felix Brandt"],
    trailer: "#",
  },
  {
    id: "m5",
    title: "After the Storm",
    year: 2024,
    director: "Camille Arnaud",
    genres: ["Romance", "Drama"],
    duration: 119,
    rating: 4.2,
    votes: 9300,
    poster: POSTERS.romance,
    backdrop: POSTERS.romance,
    description: "Dos desconocidos quedan atrapados en una ciudad costera durante un huracán. Lo que comienza como supervivencia se convierte en el amor más intenso de sus vidas.",
    cast: ["Nina Reeves", "José Medina", "Audrey Laurent"],
    trailer: "#",
  },
  {
    id: "m6",
    title: "Void Walker",
    year: 2024,
    director: "Chen Wei",
    genres: ["Acción", "Sci-Fi"],
    duration: 122,
    rating: 4.4,
    votes: 18700,
    poster: POSTERS.action,
    backdrop: POSTERS.action,
    description: "Una soldado con poderes de teletransportación lidera la última resistencia contra una inteligencia artificial que ha conquistado el sistema solar. La humanidad se juega todo.",
    cast: ["Zara Okonkwo", "Ray Nakamura", "Silas Webb"],
    trailer: "#",
  },
  {
    id: "m7",
    title: "Hollow Eden",
    year: 2023,
    director: "Tobias Krell",
    genres: ["Terror", "Psicológico"],
    duration: 98,
    rating: 4.1,
    votes: 7200,
    poster: POSTERS.horror,
    backdrop: POSTERS.horror,
    description: "Una familia muda a un pueblo que aparece en todos los mapas pero que nadie recuerda haber visitado. Los sueños y la vigilia se funden en una pesadilla sin salida.",
    cast: ["Clara Moss", "Adam Vance", "Ruth Ellery"],
    trailer: "#",
  },
  {
    id: "m8",
    title: "Neon Bloom",
    year: 2024,
    director: "Priya Sharma",
    genres: ["Animación", "Aventura"],
    duration: 94,
    rating: 4.8,
    votes: 22100,
    poster: POSTERS.animated,
    backdrop: POSTERS.animated,
    description: "En un mundo donde las emociones tienen color y textura, una niña ciega descubre que puede ver los sentimientos de los demás. Una historia de empatía, valentía y luz.",
    cast: ["Voices: Amara Joy", "Eli Stone", "Maya Sun"],
    trailer: "#",
  },
  {
    id: "m9",
    title: "City of Mirrors",
    year: 2024,
    director: "Rafael Moreno",
    genres: ["Crimen", "Drama"],
    duration: 148,
    rating: 4.6,
    votes: 11500,
    poster: POSTERS.cinematic,
    backdrop: POSTERS.cinematic,
    description: "Dos detectives con métodos opuestos deben colaborar para atrapar a un asesino que deja reflexiones filosóficas en sus escenas del crimen. Una disección del alma humana.",
    cast: ["Marcus Dahl", "Lea Fontaine", "Omar Rashid"],
    trailer: "#",
  },
  {
    id: "m10",
    title: "The Iron Shore",
    year: 2023,
    director: "Ingrid Larsen",
    genres: ["Drama", "Historia"],
    duration: 163,
    rating: 4.5,
    votes: 9800,
    poster: POSTERS.drama,
    backdrop: POSTERS.drama,
    description: "La historia de una familia de pescadores que sobrevive a tres generaciones de cambio político y climático en una pequeña isla del norte. Una épica íntima y devastadora.",
    cast: ["Bjorn Eriksen", "Astrid Holm", "Leif Andersen"],
    trailer: "#",
  },
];

export const users: User[] = [
  {
    id: "u1",
    name: "Sofía Méndez",
    username: "sofiamendez",
    avatar: AVATARS.sofia,
    bio: "Vivo en pantallas y sueño en celuloide.",
    stats: { reviews: 89, ratings: 340, watched: 521, watchlist: 43, followers: 892, following: 201 },
    topMovies: ["m8", "m1", "m4", "m2", "m6"],
    isFollowing: true,
  },
  {
    id: "u2",
    name: "Marcos Gil",
    username: "marcosgil",
    avatar: AVATARS.marcos,
    bio: "Crítico de fin de semana. Nerd del cine de arte.",
    stats: { reviews: 52, ratings: 198, watched: 287, watchlist: 15, followers: 334, following: 78 },
    topMovies: ["m4", "m9", "m2", "m7", "m5"],
    isFollowing: true,
  },
  {
    id: "u3",
    name: "Elena Torres",
    username: "elenatorres",
    avatar: AVATARS.elena,
    bio: "Horror, thriller y café negro. En ese orden.",
    stats: { reviews: 134, ratings: 502, watched: 748, watchlist: 67, followers: 1204, following: 312 },
    topMovies: ["m7", "m3", "m6", "m4", "m1"],
    isFollowing: false,
    isPending: true,
  },
];

export const reviews: Review[] = [
  {
    id: "r1", userId: "u1", movieId: "m1", rating: 5,
    content: "Absolutamente demoledora. La actuación de Damien Cross es de otro nivel. No podía respirar en los últimos 30 minutos. Una obra maestra del sci-fi contemporáneo que te deja sin palabras.",
    likes: 234, date: "2024-12-14", liked: true,
  },
  {
    id: "r2", userId: "u2", movieId: "m1", rating: 4,
    content: "Visual y conceptualmente brillante. El guión tiene algún bache en el segundo acto pero la dirección de Nora Vasquez lo compensa con creces. Un cine que piensa y emociona a la vez.",
    likes: 89, date: "2024-12-10",
  },
  {
    id: "r3", userId: "u3", movieId: "m3", rating: 5,
    content: "Phantom Frequency me aterró de una forma que hacía años no sentía. El sonido diseñado por el equipo es simplemente perturbador. Ver de noche, con auriculares. Bajo tu propio riesgo.",
    likes: 312, date: "2024-11-28",
  },
  {
    id: "r4", userId: "u0", movieId: "m4", rating: 4.5,
    content: "Crimson Descent teje una trama perfecta. Cada pista es un cuchillo bien colocado. Lucas Harman da la mejor actuación de su carrera y el giro final es impredecible.",
    likes: 156, date: "2024-12-01",
  },
  {
    id: "r5", userId: "u1", movieId: "m8", rating: 5,
    content: "Neon Bloom me hizo llorar tres veces. Una película animada que le enseña a los adultos lo que es la empatía. Visualmente es un milagro. La mejor de 2024 sin duda alguna.",
    likes: 445, date: "2024-11-15",
  },
  {
    id: "r6", userId: "u2", movieId: "m9", rating: 5,
    content: "City of Mirrors es una epopeya criminal filosófica. Moreno demuestra ser el mejor director de su generación. 148 minutos que se sienten como 10. Perfecta.",
    likes: 267, date: "2024-12-05",
  },
];

export const messages = [
  {
    id: "msg1", userId: "u1", text: "¿Ya viste Eclipse Protocol? Necesito hablar de ese final", time: "14:32", isMe: false,
  },
  {
    id: "msg2", userId: "u0", text: "Sí! Quedé sin palabras. El giro del tercer acto...", time: "14:35", isMe: true,
  },
  {
    id: "msg3", userId: "u1", text: "Exacto! Y la escena del espejo... 🤯", time: "14:35", isMe: false,
  },
  {
    id: "msg4", userId: "u0", text: "Te mando mi reseña cuando la termine. También te recomiendo City of Mirrors si no la has visto", time: "14:40", isMe: true,
  },
  {
    id: "msg5", userId: "u0", movieRef: "m9", text: "City of Mirrors - 4.6 ⭐", time: "14:40", isMe: true,
  },
];

export const watchlistMovies = ["m2", "m5", "m6", "m10"];
export const favoriteMovies = ["m1", "m4", "m8", "m9"];
export const recentlyWatched = ["m1", "m3", "m4", "m7", "m8", "m9"];

export const adminStats = {
  totalUsers: 14892,
  activeToday: 2341,
  totalReviews: 48203,
  pendingReports: 23,
  bannedUsers: 47,
  newUsersThisWeek: 834,
};

export const reportedReviews = [
  { id: "rep1", reviewId: "r_x1", userId: "u_bad1", username: "trollmaster99", content: "Esta película es basura total, el director es un idiota...", reason: "Lenguaje ofensivo", reports: 12, status: "pending" },
  { id: "rep2", reviewId: "r_x2", userId: "u_bad2", username: "spammer_films", content: "¡¡GANA DINERO DESDE CASA!! Haz clic en este enlace...", reason: "Spam/Publicidad", reports: 28, status: "pending" },
  { id: "rep3", reviewId: "r_x3", userId: "u_bad3", username: "hater2024", content: "Todos los que dieron buen puntaje son bots pagados...", reason: "Desinformación", reports: 7, status: "reviewing" },
];

export const reportedUsers = [
  { id: "bu1", username: "trollmaster99", name: "Unknown User", reports: 15, status: "pending", joinDate: "2024-10-01" },
  { id: "bu2", username: "spammer_films", name: "Spam Account", reports: 34, status: "banned", joinDate: "2024-11-15" },
  { id: "bu3", username: "fake_critic_x", name: "Fake Critic", reports: 8, status: "reviewing", joinDate: "2024-09-20" },
];
