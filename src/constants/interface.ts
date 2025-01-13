export interface IUser {
  id: number | string;
  email: string;
  fullname: string;
  phone: string;
  token: string;
  warehouse?: string;
  district?: string;
  province?: string;
  addressDetail?: string;
  role: string;
  balance: number;
  transferContent?: string;
  avatar?: string;
}

export interface IProduct {
  id: number | string;
  link: string;
  color?: string;
  size?: string;
  qty: number;
  price: number;
  note?: string;
}

export type IOrderProduct = IProduct & {
  qtyOrder: number;
  qtyReceive: number;
};
export interface IOrder {
  id: number | string;
  status: number;
  images?: string;
  shippingType: string;
  products: Array<IOrderProduct>;
  isChecked: boolean;
  noteForOwner: string;
  noteForStaff: string;
  orderFeePercent: number;
  exchangeRate: number;
  stockWarehouse: string | number; // Hàng về kho
  userWarehouse: string | number; // Kho khách chọn
  extraFee?: number;
  shippingCnFee?: number;
  tallyFee?: number;
  totalFee: number;
  totalPaid: number;
  depositAt?: string; // Thời gian đặt cọc
  purchasedAt?: string; // Thời gian mua (bên order mua)
  transitToVnAt?: string; // Trên đường về VN
  stockInVnAt?: string; // Trong kho VN
  returnAt?: string; // Thời gian trả hàng
}
