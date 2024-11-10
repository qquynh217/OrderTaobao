import GamePage from "pages/games";
import HomePage from "pages/home";
import PublicLayout from "pages/layout/Public";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const ROUTE_URL = {
  HOME: "/",
  GAMES: "/games",
  RULES: "rules",
  EVENTS: "/events",
};
const routes = [
  {
    path: ROUTE_URL.HOME,
    element: <PublicLayout />,
    children: [
      {
        path: ROUTE_URL.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTE_URL.GAMES,
        element: <GamePage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_URL.HOME} />,
  },
];

export const router = createBrowserRouter(routes);
