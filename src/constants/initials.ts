import { IOrder, IUser } from "./interface";

export const initUser: IUser = {
  id: 0,
  email: "",
  fullname: "",
  phone: "",
  token: "",
  warehouse: "",
  district: "",
  province: "",
  addressDetail: "",
  role: "",
  balance: 0,
};

export const initOrder: IOrder = {
  id: 0,
  status: 0,
  images: "",
  shippingType: "",
  products: [],
  isChecked: false,
  noteForOwner: "",
  noteForStaff: "",
  orderFeePercent: 0,
  exchangeRate: 0,
  stockWarehouse: "",
  userWarehouse: "",
  totalFee: 0,
  totalPaid: 0,
  depositAt: "",
  purchasedAt: "",
  transitToVnAt: "",
  stockInVnAt: "",
  returnAt: "",
};
