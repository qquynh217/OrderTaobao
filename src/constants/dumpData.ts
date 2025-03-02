import { USER_ROLE } from "constants";
import { IOrder, ITransaction, IUser } from "./interface";

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
