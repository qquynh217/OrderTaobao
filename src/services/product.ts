import axiosInstance from "services";

class ProductService {
  login(params: { email: string; password: string }) {
    return axiosInstance.post("/user/login", params);
  }
}

export const productService = new ProductService();
