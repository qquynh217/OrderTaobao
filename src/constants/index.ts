export const USER_STORAGE = import.meta.env.VITE_USER_STORE;
export const CONFIG_STORAGE = import.meta.env.VITE_CONFIG_STORE;

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_PATTERN = /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}/;
export const DATE_FORMAT = "DD-MM-YYYY";
export const PAGE_SIZE_OPTIONS = [10, 20, 50];
export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
};

export const WAREHOUSES = [
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
];

export const ORDER_STATUS = [
  { key: "1", value: "Chờ báo giá", color: "#5E50F9" },
  { key: "2", value: "Chờ đặt cọc", color: "#ff3366" },
  { key: "3", value: "Đang mua hàng", color: "#f2a654" },
  { key: "4", value: "Đã mua hàng", color: "#46c35f" },
  { key: "5", value: "Người bán giao", color: "#f6e84e" },
  { key: "6", value: "Kho TQ nhận hàng", color: "#f96868" },
  { key: "7", value: "Trên đường về VN", color: "#6a008a" },
  { key: "8", value: "Trong kho VN", color: "#57c7d4" },
];

export const SHIPPING_TYPE = [
  {
    value: "normal",
    text: "Chuyển thường",
  },
  {
    value: "fast",
    text: "Chuyển nhanh",
  },
  {
    value: "line",
    text: "Đi line TMDT",
  },
];

export const USER_ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const INIT_USER_STORAGE = {
  state: {
    token: "",
    email: "",
    name: "",
    role: "",
  },
  version: 0,
};

export const TRANSACTION_KEY_TYPE = {
  ALL: "all",
  DEPOSIT: "deposit",
  PAY: "pay",
  PAY_SHIP: "pay_ship",
  REFUND: "refund",
  WITHDRAW: "withdraw",
  PAY_WEIGHT: "pay_weight",
  PAY_WOOD_PACKAGE: "pay_wood_package",
  PAY_EXTRA_SHIP: "pay_extra_ship",
};

export const TRANSACTION_TYPE = [
  {
    value: "all",
    text: "Loại giao dịch",
  },
  {
    value: TRANSACTION_KEY_TYPE["DEPOSIT"],
    text: "Nạp tiền",
  },
  {
    value: TRANSACTION_KEY_TYPE["PAY"],
    text: "Thanh toán",
  },
  {
    value: TRANSACTION_KEY_TYPE["PAY_SHIP"],
    text: "Thanh toán phí ship",
  },
  {
    value: TRANSACTION_KEY_TYPE["REFUND"],
    text: "Hoàn tiền",
  },
  {
    value: TRANSACTION_KEY_TYPE["WITHDRAW"],
    text: "Rút tiền",
  },
  {
    value: TRANSACTION_KEY_TYPE["PAY_WEIGHT"],
    text: "Thanh toán cân nặng",
  },
  {
    value: TRANSACTION_KEY_TYPE["PAY_WOOD_PACKAGE"],
    text: "Thanh toán tiền đóng gỗ",
  },
  {
    value: TRANSACTION_KEY_TYPE["PAY_EXTRA_SHIP"],
    text: "Thanh toán tiền cước chuyển phát thêm",
  },
];

export const STORAGE_STATUS = [
  {
    value: "",
    label: "Chưa về kho",
  },
  {
    value: "Hà Nội",
    label: "Hà Nội",
  },
  {
    value: "Hồ Chí Minh",
    label: "Hồ Chí Minh",
  },
];

export const ORDER_FIELD_NAME: { [key: string]: string } = {
  status: "trạng thái",
  stock_storage: "hàng ở kho",
  products: "danh sách hàng",
  ship_cn_fee: "phí ship nội địa TQ",
  tally_fee: "phí kiểm đếm",
};

export const CONSIGNMENT = {
  STATUS: [
    {
      value: "total",
      label: "Tất cả",
    },
    {
      value: "shop_dispatching",
      label: "Shop phát hàng",
      color: "pink",
    },
    {
      value: "warehouse_inbound_cn",
      label: "Nhập kho TQ",
      color: "cyan",
    },
    {
      value: "shipping_to_vn",
      label: "Chuyển về VN",
      color: "purple",
    },
    {
      value: "warehouse_inbound_vn",
      label: "Nhập kho VN",
      color: "orange",
    },
    {
      value: "dispatched",
      label: "Đã xuất kho",
      color: "blue",
    },
    {
      value: "cancelled",
      label: "Đơn hàng hủy",
      color: "red",
    },
    {
      value: "completed",
      label: "Hoàn thành",
      color: "green",
    },
  ],
  INSURANCE_TYPE: [
    {
      value: 0,
      label: "Không sử dụng",
    },
    {
      value: 2,
      label: "5% hàng giá trị cao",
    },
    {
      value: 3,
      label: "3% hàng phổ thông mất đền 100%",
    },
  ],
  VN_STORAGE: [
    {
      value: "Hà Nội",
      label: "Hà Nội",
    },
    {
      value: "Hồ Chí Minh",
      label: "Hồ Chí Minh",
    },
  ],
  SHIP_TYPE: [
    {
      value: 0,
      label: "Vận chuyển TMĐT",
      // Chỉ tính cân thực đơn giá 18k/kg
    },
    {
      value: 1,
      label: "Vận chuyển hàng lô",
      // Đơn giá 9k/kg, 1650k/m3 => bên nào nhiều tiền hơn tính bên đó
    },
    {
      value: 2,
      label: "Vận chuyển hàng xách tay",
      // 35k/kg mặc định về kho Móng Cái
    },
  ]
}

