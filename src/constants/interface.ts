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

export interface IOder {
  id: number;
  image?: string;
  link: string;
  color?: string;
  size?: string;
  qty: number;
  price: number;
  note?: string;
}
