import { ORDER_STATUS, USER_ROLE } from "constants";
import HomePage from "pages/home";
import PriveLayout from "pages/layout/Private";
import PublicLayout from "pages/layout/Public";
import OrderAdmin from "pages/order-admin";
import CreateOrder from "pages/order/create-order";
import OrderDetail from "pages/order/detail";
import ListOrder from "pages/order/list-order";
import SignUp from "pages/signup";
import Transaction from "pages/transaction";
import UserAdmin from "pages/user-admin";
import { FaBoxArchive, FaGlobe, FaUserGroup, FaWallet } from "react-icons/fa6";
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
  ORDER_ALL: "/don-hang/tat-ca",
  PROFILE: "/thong-tin-ca-nhan",
  ORDER_CREATE: "/don-hang/tao-don",
  ORDER_DETAIL: "/don-hang/chi-tiet",
  TRANSACTION: "/don-hang/giao-dich",
  ADMIN: "/quan-ly",
  ORDER_ADMIN: "/quan-ly/don-hang",
  USER_ADMIN: "/quan-ly/khach-hang",
  ORDER_ADMIN_DETAIL: "/quan-ly/don-hang/:orderId",
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
      {
        path: ROUTE_URL.TRANSACTION,
        element: <Transaction />,
      },
    ],
  },
  {
    path: ROUTE_URL.ADMIN,
    element: <PriveLayout />,
    children: [
      {
        path: ROUTE_URL.ORDER_ADMIN,
        element: <OrderAdmin />,
      },
      {
        path: ROUTE_URL.USER_ADMIN,
        element: <UserAdmin />,
      },
      {
        path: ROUTE_URL.ORDER_ADMIN_DETAIL,
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
    role: [USER_ROLE["USER"]],
  },

  {
    key: ROUTE_URL.ORDER,
    icon: <FaBoxArchive />,
    label: "Đơn hàng",
    role: [USER_ROLE["USER"]],
    children: [
      {
        key: ROUTE_URL.ORDER_ALL,
        label: "Tất cả",
        role: [USER_ROLE["USER"]],
      },
      ...ORDER_STATUS.map((item) => ({
        key: ROUTE_URL.ORDER_ALL + `/${item.key}`,
        label: item.value,
        role: [USER_ROLE["USER"]],
      })),
    ],
  },
  // {
  //   key: ROUTE_URL.CART,
  //   icon: <FaCartShopping />,
  //   label: "Giỏ hàng",
  //   role: [USER_ROLE["USER"]],
  // },
  {
    key: ROUTE_URL.TRANSACTION,
    icon: <FaWallet />,
    label: "Lịch sử giao dịch",
    role: [USER_ROLE["USER"]],
  },
  {
    key: ROUTE_URL.ORDER_ADMIN,
    icon: <FaBoxArchive />,
    label: "Quản lý đơn hàng",
    role: [USER_ROLE["ADMIN"]],
  },
  {
    key: ROUTE_URL.USER_ADMIN,
    icon: <FaUserGroup />,
    label: "Quản lý khách hàng",
    role: [USER_ROLE["ADMIN"]],
  },
];
