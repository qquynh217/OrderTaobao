import axios from "axios";
import { USER_STORAGE } from "constants/index";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

axiosInstance.interceptors.request.use((config) => {
  let store: any = window.localStorage.getItem(USER_STORAGE);
  if (store) {
    store = JSON.parse(store) || {};
    if (store && store.state.token) {
      let token = store.state.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: any) {
    const msg = error.response?.statusText || "";
    const status = error.response?.status;
    const path = error.response?.data?.path || "";

    if (
      status == 401 &&
      msg.toLowerCase().includes("unauthorized") &&
      !path.includes("login")
    ) {
      // showNotification(
      //   "warning",
      //   "Token expired",
      //   "Your token has expired! Please login again."
      // );
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      localStorage.removeItem(USER_STORAGE);
      location.reload();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
