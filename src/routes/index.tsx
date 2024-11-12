import HomePage from "pages/home";
import PublicLayout from "pages/layout/Public";
import SignUp from "pages/signup";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const ROUTE_URL = {
  HOME: "/",
  PRICE: "/bieu-phi",
  INSTRUCTION: "/huong-dan",
  ORDER: "/don-hang",
  CART: "/don-hang/gio-hang",
  POLICY: "/chinh-sach",
  SIGNUP: "/dang-ky",
  LOGIN: "/dang-nhap",
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
    path: ROUTE_URL.SIGNUP,
    element: <SignUp />,
  },
  {
    path: ROUTE_URL.LOGIN,
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_URL.HOME} />,
  },
];

export const router = createBrowserRouter(routes);
