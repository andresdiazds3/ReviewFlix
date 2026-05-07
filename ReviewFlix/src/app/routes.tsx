import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { AppLayout } from "./pages/AppLayout";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { Rankings } from "./pages/Rankings";
import { Social } from "./pages/Social";
import { Chat } from "./pages/Chat";
import { Profile } from "./pages/Profile";
import { Watchlist } from "./pages/Watchlist";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    Component: AppLayout,
    children: [
      { path: "/home", Component: Home },
      { path: "/movie/:id", Component: MovieDetail },
      { path: "/rankings", Component: Rankings },
      { path: "/social", Component: Social },
      { path: "/chat", Component: Chat },
      { path: "/chat/:userId", Component: Chat },
      { path: "/profile", Component: Profile },
      { path: "/profile/:id", Component: Profile },
      { path: "/watchlist", Component: Watchlist },
    ],
  },
]);