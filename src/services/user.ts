import axiosInstance from "services";

class UserService {
  login(params: { email: string; password: string }) {
    return axiosInstance.post("/user/login", params);
  }
}

export const userService = new UserService();
