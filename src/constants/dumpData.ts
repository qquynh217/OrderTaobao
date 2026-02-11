import { USER_ROLE } from "constants";
import {
  IConsignment,
  IConsignmentTable,
  IConsignmentTransaction,
  IOrder,
  ITransaction,
  IUser,
} from "./interface";
import dayjs from "dayjs";
import { OrderStatsItem } from "services/statistics";

export const user: IUser = {
  id: "1",
  email: "nltquynh875@gmail.com",
  name: "Trúc Quỳnh",
  phone_number: "0329484673",
  token: "123456789",
  storage: "Hà Nội",
  district: "Nam Từ Liêm",
  province: "Hà Nội",
  address_detail: "số nhà 18, ngõ 104, Cầu Diễn, Nam Từ Liêm, Hà Nội",
  role: USER_ROLE.USER,
  balance: 0,
};

export const orderEx: IOrder = {
  id: "85612",
  code: "85612",
  status: "2",
  image_order:
    "https://cbu01.alicdn.com/img/ibank/2019/456/041/11329140654_1610935134.jpg",
  type_delivery: "Chuyển thường",
  products: [
    {
      id: 1,
      link_product:
        "https://detail.1688.com/offer/597872715411.html?spm=a26352.b28411319.offerlist.5.63041e62pKsLr3",
      color: "Hồng",
      size: "Đường ngang + trống lớn",
      number: 2,
      number_order: 2,
      price: 6.17,
      note: "",
      link_product_image:
        "https://cbu01.alicdn.com/img/ibank/2019/456/041/11329140654_1610935134.jpg",
    },
    {
      id: 2,
      link_product:
        "https://detail.1688.com/offer/597872715411.html?spm=a26352.b28411319.offerlist.5.63041e62pKsLr3",
      color: "Xanh",
      size: "Hàng ngang + kèn trống",
      number: 2,
      number_order: 2,
      price: 4.56,
      note: "",
    },
  ],
  item_total_cost: 75539,
  note_owner: "Ghi chú",
  note_staff: "",
  order_fee_percent: 0.05,
  exchange_rate: 3520,
  stock_storage: "Hà Nội",
  user_storage: "Hà Nội",
  ship_cn_fee: 0,
  tally_fee: 0,
  extra_fee: 0,
  total_fee: 79316,
  total_paid: 0,
  deposit_at: "",
  purchased_at: "",

  weight_fee: 0,

  total_weight_fee: 0,
  wood_package_fee: 0,
  is_wood_package: false,
  extra_ship_fee: 0,
  packages: [],
};

export const transHistory: ITransaction[] = [
  {
    trans_code: "1099676",
    order_code: "1738861738027",
    order_id: "67a4ecaab20c2c1eb11689a2",
    amount: 70000,
    balance: 30000,
    created_time: 1738861738027,
    description: "Đặt cọc 80% tiền hàng",
    type: "pay",
  },
  {
    trans_code: "1005333",
    order_code: "",
    order_id: "",
    amount: 100000,
    balance: 100000,
    created_time: 1738861738027,
    description: "075720.200523.112822.ntt g5777",
    type: "deposit",
  },
];

export const consignmentData: IConsignmentTable[] = [
  {
    id: "1",
    code: "KG17624",
    productName: "ô",
    orderType: "Đơn thường",
    createdAt: "07-05-2025 11:52:05",
    totalWeight: 0.5,
    totalVolume: 0.5,
    totalPrice: 10000,
    paid: 10000,
    paymentStatus: "Đã thanh toán",
    status: "warehouse_inbound_vn",
  },
  {
    id: "2",
    code: "KG17284",
    productName: "quang anh",
    orderType: "Đơn thường",
    createdAt: "04-05-2025 13:48:04",
    totalWeight: 0.5,
    totalVolume: 0.5,
    totalPrice: 10000,
    paid: 10000,
    paymentStatus: "Đã thanh toán",
    status: "cancelled",
  },
];
export const consignment: IConsignment = {
  id: "consignment-001",
  code: "CGN-20250605-001",
  userId: "user-12345",
  status: "shop_dispatching",
  isWoodPackage: true,
  isItemInspected: true,
  insurance: 0,
  woodPackageFee: 150000,
  itemInspectedFee: 50000,
  insuranceFee: 0,
  extraFee: 0,
  discount: 0,
  paid: 739000,
  paymentStatus: "Đã thanh toán",
  totalWeight: 25.5,
  totalVolume: 0.12,
  feeShipCN: 80000,
  shipType: 0, // VD: 1 = nhanh, 2 = thường
  weightPrice: 459000,
  totalPrice: 739000,
  receiverInfo: {
    name: "Nguyễn Văn A",
    phone: "0987654321",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  },
  VNStorage: "Hà Nội",
  createdAt: "2025-06-05T09:30:00Z",
};

export const consignmentTransactions: IConsignmentTransaction = [
  {
    id: "txn-001",
    transactionCode: "TXN-20250605-001",
    consignmentCode: "CGN-20250605-001",
    userId: "user-12345",
    productName: "Áo thun nam",
    productValue: 200000,
    productAmount: 3,
    weight: 1.5,
    weightByVolume: 2,
    width: 30,
    length: 40,
    height: 10,
    price: 10000,
    totalPrice: 30000,
    createdAt: "2025-06-05T09:00:00Z",
    updatedAt: "2025-06-05T09:10:00Z",
    status: "packed",
  },
  {
    id: "txn-002",
    transactionCode: "TXN-20250605-002",
    consignmentCode: "CGN-20250605-001",
    userId: "user-12345",
    productName: "Giày thể thao",
    productValue: 1500000,
    productAmount: 1,
    weight: 2,
    weightByVolume: 2.5,
    width: 35,
    length: 30,
    height: 15,
    price: 20000,
    totalPrice: 20000,
    createdAt: "2025-06-05T09:15:00Z",
    updatedAt: "2025-06-05T09:20:00Z",
    status: "packed",
  },
];

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateFakeOrderStats(
  type: "day" | "week" | "month",
  from: string,
  to: string
): OrderStatsItem[] {
  const start = dayjs(from);
  const end = dayjs(to);

  const result: OrderStatsItem[] = [];
  let current = start;

  while (current.isBefore(end) || current.isSame(end, type)) {
    let label = "";

    if (type === "day") {
      label = current.format("YYYY-MM-DD");
      current = current.add(1, "day");
    } else if (type === "week") {
      label = current.format("YYYY-[W]WW");
      current = current.add(1, "week");
    } else {
      label = current.format("YYYY-MM");
      current = current.add(1, "month");
    }

    const itemCost = randomInt(5_000_000, 30_000_000);
    const weightFee = randomInt(300_000, 2_000_000);
    const orderFee = Math.floor((itemCost * randomInt(3, 7)) / 100);
    const extraFee = randomInt(0, 500_000);

    result.push({
      date_label: label,
      total_item_cost: itemCost,
      total_weight_fee: weightFee,
      total_order_fee: orderFee,
      total_extra_fee: extraFee,
    });
  }

  return result;
}
