import axiosInstance from "services";
import { objectToSearchParams } from "utils";

class UserService {
  login(params: { email: string; password: string }) {
    return axiosInstance.post("/user/login", params);
  }
  signup(params: {
    email: string;
    password: string;
    name: string;
    phone_number: string;
    storage: string;
    province: string;
    district: string;
    address_detail: string;
  }) {
    return axiosInstance.post("/user", { ...params, balance: 0 });
  }
  getList(params: {
    page: number;
    size: number;
    sort_by: string;
    sort: string;
    search: string;
    time_form: string;
    time_to: string;
  }) {
    const paramStr = objectToSearchParams(params);
    return axiosInstance.get(`/user?${paramStr}`);
  }
  get(userId: string) {
    return axiosInstance.get(`/user/${userId}`);
  }
  update(params: {
    id: string;
    name?: string;
    phone_number?: string;
    storage?: string;
    address_detail?: string;
    balance?: number;
  }) {
    const { id, ...data } = params;
    return axiosInstance.put(`/user/${id}`, data);
  }
  delete(userId: string) {
    return axiosInstance.delete(`/user/${userId}`);
  }
}

export const userService = new UserService();
