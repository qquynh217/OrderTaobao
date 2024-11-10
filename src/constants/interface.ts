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
}
