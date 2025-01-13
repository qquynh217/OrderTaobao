export const USER_STORAGE = import.meta.env.VITE_USER_STORE;
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_PATTERN = /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}/;
export const DATE_FORMAT = "DD-MM-YYYY";

export const WAREHOUSES = [
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
];

export const ORDER_STATUS = [
  { key: 1, value: "Chờ báo giá", color: "#5E50F9" },
  { key: 2, value: "Chờ đặt cọc", color: "#ff3366" },
  { key: 3, value: "Đang mua hàng", color: "#f2a654" },
  { key: 4, value: "Đã mua hàng", color: "#46c35f" },
  { key: 5, value: "Người bán giao", color: "#f6e84e" },
  { key: 6, value: "Kho TQ nhận hàng", color: "#f96868" },
  { key: 7, value: "Trên đường về VN", color: "#6a008a" },
  { key: 8, value: "Trong kho VN", color: "#57c7d4" },
];
