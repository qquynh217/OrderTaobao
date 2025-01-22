import HomePage from "pages/home";
import PriveLayout from "pages/layout/Private";
import PublicLayout from "pages/layout/Public";
import ListOrder from "pages/order/list-order";
import CreateOrder from "pages/order/create-order";
import SignUp from "pages/signup";
import { FaBoxArchive, FaCartShopping, FaGlobe } from "react-icons/fa6";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { ORDER_STATUS } from "constants";
import OrderDetail from "pages/order-detail";

export const ROUTE_URL = {
  HOME: "/",
  PRICE: "/bieu-phi",
  INSTRUCTION: "/huong-dan",
  ORDER: "/don-hang",
  CART: "/don-hang/gio-hang",
  POLICY: "/chinh-sach",
  SIGNUP: "/dang-ky",
  LOGIN: "/dang-nhap",
  ORDER_ALL: "/don-hang/tat-ca",
  PROFILE: "/thong-tin-ca-nhan",
  ORDER_CREATE: "/don-hang/tao-don",
  ORDER_DETAIL: "/don-hang/chi-tiet",
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
    path: ROUTE_URL.ORDER,
    element: <PriveLayout />,
    children: [
      {
        path: ROUTE_URL.ORDER_ALL,
        element: <ListOrder />,
      },
      {
        path: ROUTE_URL.ORDER_CREATE,
        element: <CreateOrder />,
      },
      {
        path: ROUTE_URL.ORDER_ALL + "/:status",
        element: <ListOrder />,
      },
      {
        path: ROUTE_URL.ORDER_DETAIL + "/:orderId",
        element: <OrderDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_URL.HOME} />,
  },
];

export const router = createBrowserRouter(routes);

export const sidebarItems = [
  {
    key: ROUTE_URL.ORDER_CREATE,
    icon: <FaGlobe />,
    label: "Tạo đơn từ website",
    role: ["user", "admin"],
  },

  {
    key: ROUTE_URL.ORDER,
    icon: <FaBoxArchive />,
    label: "Đơn hàng",
    role: ["user", "admin"],
    children: [
      {
        key: ROUTE_URL.ORDER_ALL,
        label: "Tất cả",
        role: ["user", "admin"],
      },
      ...ORDER_STATUS.map((item) => ({
        key: ROUTE_URL.ORDER_ALL + `/${item.key}`,
        label: item.value,
        role: ["user", "admin"],
      })),
    ],
  },
  {
    key: ROUTE_URL.CART,
    icon: <FaCartShopping />,
    label: "Giỏ hàng",
    role: ["user", "admin"],
  },
];
