import { IUser } from "constants/interface";
import { jwtDecode } from "jwt-decode";

export const getUserByJwtoken = (token: string) => {
  const decoded: any = jwtDecode(token);
  console.log(decoded);

  const user: IUser = {
    id: decoded.sub || "",
    email: decoded.email || "",
    name: decoded.name || "",
    phone_number: decoded.phone_number || "",
    token: token,
    storage: decoded.storage || "",
    district: decoded.district || "",
    province: decoded.province || "",
    address_detail: decoded.address_detail || "",
    role: decoded.role || "",
    balance: decoded.balance || 0,
    avatar: decoded.avatar || "",
    exp: decoded.exp || 0,
  };
  return user;
};
