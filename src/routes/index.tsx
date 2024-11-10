import HomePage from "pages/home";
import PublicLayout from "pages/layout/Public";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const ROUTE_URL = {
  HOME: "/",
  PRICE: "/bieu-phi",
  INSTRUCTION: "/huong-dan",
  ORDER: "/don-hang",
  CART: "/don-hang/gio-hang",
  POLICY: "/chinh-sach",
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
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_URL.HOME} />,
  },
];

export const router = createBrowserRouter(routes);
