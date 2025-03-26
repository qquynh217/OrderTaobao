import { IOrder, IOrderProduct, IPackage, IUser } from "./interface";

export const initUser: IUser = {
  id: 0,
  email: "",
  name: "",
  phone_number: "",
  token: "",
  storage: "",
  district: "",
  province: "",
  address_detail: "",
  role: "",
  balance: 0,
  transferContent: "",
  avatar: "",
};

export const initProductOrder: IOrderProduct = {
  id: "",
  link_product: "",
  color: "",
  size: "",
  number: 0,
  price: 0,
  note: "",
  link_product_image: "",
  number_order: 0,
  note_staff: "",
};

export const initPackage: IPackage = {
  code: "",
  weight: 0,
  weight_rate: 0,
  total_weight_price: 0,
  ship_at: "",
  transit_at_vn: "",
  stock_at_vn: "",
  return_at: "",
  weight_base_volumn: 0,
  status: "",
};

export const initOrder: IOrder = {
  id: "",
  code: "",
  status: "",
  image_order: "",
  type_delivery: "",
  products: [],
  note_owner: "",
  note_staff: "",
  order_fee_percent: 0,
  exchange_rate: 0,
  stock_storage: "",
  user_storage: "",
  extra_fee: 0,
  ship_cn_fee: 0,
  tally_fee: 0,
  item_total_cost: 0,
  total_fee: 0,
  total_paid: 0,

  deposit_at: "",
  purchased_at: "",

  weight_fee: 0,
  volumn_fee: 0,
  total_weight_fee: 0,
  wood_package_fee: 0,
  is_wood_package: false,
  extra_ship_fee: 0,

  modified_time: "",
  created_time: "",
  packages: [],
};
