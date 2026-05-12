import React from "react";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
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
      { path: "/home", Component: () => <PrivateRoute><Home /></PrivateRoute> },
      { path: "/movie/:id", Component: () => <PrivateRoute><MovieDetail /></PrivateRoute> },
      { path: "/rankings", Component: () => <PrivateRoute><Rankings /></PrivateRoute> },
      { path: "/social", Component: () => <PrivateRoute><Social /></PrivateRoute> },
      { path: "/chat", Component: () => <PrivateRoute><Chat /></PrivateRoute> },
      { path: "/chat/:userId", Component: () => <PrivateRoute><Chat /></PrivateRoute> },
      { path: "/profile", Component: () => <PrivateRoute><UserProfile /></PrivateRoute> },
      { path: "/profile/:id", Component: () => <PrivateRoute><UserProfile /></PrivateRoute> },
      { path: "/watchlist", Component: () => <PrivateRoute><Watchlist /></PrivateRoute> },
    ],
  },
]);