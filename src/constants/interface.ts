export interface IUser {
  id?: string;
  email: string;
  name: string;
  phone_number: string;
  token: string;
  storage: string;
  district: string;
  province: string;
  address_detail: string;
  role: string;
  balance: number;
  transferContent?: string;
  avatar?: string;
  exp?: number;
}

export interface IProduct {
  id?: number | string;
  link_product: string;
  color?: string;
  size?: string;
  number: number;
  price: number; // giá theo tệ
  note?: string;
  link_product_image?: string;
}
export interface IProductCart extends IProduct {
  id: string;
  name?: string;
  isSelected: boolean;
}
export interface IPackage {
  code: number | string;
  weight?: number; // cân nặng
  weight_rate?: number; // đơn giá cân nặng
  total_weight_price: number;
  ship_at?: string; // thời gian người bán giao
  transit_at_vn?: string; // Trên đường về VN
  stock_at_vn?: string; // Trong kho VN
  return_at?: string; // Thời gian trả hàng
  weight_base_volumn?: number; // cân nặng theo thể tích
  weight_base_volumn_rate?: number; // cân nặng theo thể tích
  status?: string;
}
export type IOrderProduct = IProduct & {
  number_order: number;
  // number_receive: number;
  note_staff?: string;
};
export interface IOrder {
  id: string;
  code: number | string;
  status: string; // trạng thái đơn
  image_order: string; // ảnh đơn
  type_delivery: string; // phương thức vận chuyển
  products: Array<IOrderProduct>; // danh sách sản phẩm
  packages: Array<IPackage>;

  note_owner: string; // ghi chú cho người tạo
  note_staff: string; // ghi chú cho staff
  order_fee_percent: number; // % phí mua hàng
  exchange_rate: number; // tỉ giá
  number_package?: number;

  stock_storage: string | number; // Hàng về kho
  user_storage: string | number; // Kho khách chọn

  extra_fee?: number; // phí trả thêm
  ship_cn_fee?: number; // phí ship nội địa TQ
  tally_fee?: number; // phí kiểm đếm
  item_total_cost: number; // tiền hàng
  total_fee: number; // tổng giá trị đơn hàng
  total_paid: number; // đã trả

  deposit_at?: string; // Thời gian đặt cọc
  purchased_at?: string; // Thời gian mua (bên order mua)

  weight_base_volumn?: number; // tiền cân quy đổi
  weight_fee?: number; // tiền cân thực
  total_weight_fee?: number; // tiền cân tính
  wood_package_fee?: number; // phí đóng gỗ
  is_wood_package?: boolean; // đóng gỗ?
  extra_ship_fee?: number; // Cước vận phát sinh
  volumn_fee?: number; // tiền cân quy đổi từ thể tích

  modified_time?: string | number;
  created_time?: string | number;

  custom_percent_paid?: string | number | null;

  // Thông tin user
  name?: string;
  phone_number?: string;
  address_detail?: string;
  email?: string;
  created_by?: string;
  province?: string;
  district?: string;
  full_address?: string;
}

export interface ITransaction {
  trans_code: string;
  order_code?: string;
  order_id?: string;
  type: string;
  created_time: string | number;
  description: string;
  amount: number;
  balance: number;
}

export interface IConsignment {
  id: string;
  code: string;
  userId: string;
  status: string;
  isWoodPackage?: boolean;  // có đóng gỗ không
  isItemInspected?: boolean; // có kiểm đếm không
  insurance?: number; // bảo hiểm
  woodPackageFee?: number; // phí đóng gỗ
  itemInspectedFee?: number; // phí kiểm đếm
  insuranceFee?: number; // phí bảo hiểm
  extraFee?: number; // phụ thu
  discount?: number; // chiết khấu
  paid?: number; // số tiền đã trả
  paymentStatus?: string; // trạng thái thanh toán
  totalWeight?: number; // tổng kg
  totalVolume?: number; // tổng m3
  feeShipCN?: number; // phí ship CN
  shipType?: number; // loại vận chuyển
  weightPrice?: number; // đơn giá cước VCQT
  totalPrice?: number; // tổng tiền
  receiverInfo?: {
    name?: string;
    phone?: string;
    address?: string;
    email?: string;
  }
  VNStorage?: string; // kho nhận hàng VN
  createdAt?: string; // ngày tạo
  transactions?: Array<IConsignmentTransaction>
}
export interface IConsignmentTable {
  id: string;
  code: string; // mã ký gửi
  numberPackage?: number; // số kiện
  productName?: string; // tên sản phẩm
  productAmount?: number; // số lượng
  orderType: string; // loại đơn
  totalWeight: number; // tổng kg
  totalVolume?: number; // tổng m3
  totalPrice: number; // tổng tiền
  paid: number; // số tiền đã trả
  paymentStatus: string; // trạng thái thanh toán
  status: string; // trạng thái đơn
  createdAt: string; // ngày tạo
}
export interface IConsignmentTransaction {
  id?: string
  transactionCode?: string // mã vận đơn
  consignmentCode?: string // mã ký gửi
  userId?: string // id user
  productName?: string // tên sản phẩm
  productValue?: number // giá trị
  productAmount?: number // số sản phẩm
  weight?: number // cân nặng
  weightByVolume?: number // cân nặng theo thể tích
  width?: number // chiều rộng
  length?: number // chiều dài
  height?: number // chiều cao
  price?: number // đơn giá
  totalPrice?: number // tổng tiền
  createdAt?: string // ngày tạo
  updatedAt?: string // ngày cập nhật
  status?: string // trạng thái
}

export interface IMessage {
  id?: string
  consignmentId?: string
  senderId?: string
  message?: string
  createdAt?: string
  senderName?: string
}

export interface IConfigItem {
  min: number
  max: number
  value: number
}

export interface IConfig {
  id?: string
  exchange_rate: number
  purchase_fee: Array<IConfigItem>
  weight: Array<IConfigItem>
}