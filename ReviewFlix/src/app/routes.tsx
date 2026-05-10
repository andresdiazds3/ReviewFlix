import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { AppLayout } from "./pages/AppLayout";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { Rankings } from "./pages/Rankings";
import { Social } from "./pages/Social";
import { Chat } from "./pages/Chat";
import { UserProfile } from "./pages/UserProfile";
import { Watchlist } from "./pages/Watchlist";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    Component: AppLayout,
    children: [
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/home", Component: Home },
      { path: "/movie/:id", Component: MovieDetail },
      { path: "/rankings", Component: Rankings },
      { path: "/social", Component: Social },
      { path: "/chat", Component: Chat },
      { path: "/chat/:userId", Component: Chat },
      { path: "/profile", Component: UserProfile },
      { path: "/profile/:id", Component: UserProfile },
      { path: "/watchlist", Component: Watchlist },
    ],
  },
]);