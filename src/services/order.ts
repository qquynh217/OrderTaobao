import axiosInstance from "services";
import { objectToSearchParams } from "utils";

type SearchType = {
  page?: number;
  size?: number;
  sort_by?: string;
  sort?: string;
  search?: string;
  time_from?: string | number;
  time_to?: string | number;
  status?: string | number;
};

class OrderService {
  get(params: SearchType) {
    const paramStr = objectToSearchParams(params);
    console.log(paramStr);

    return axiosInstance.get(`/order?${paramStr}`);
  }
  create(params: any) {
    return axiosInstance.post("/order", params);
  }
  getImage(params: { order_id: string; image_id: string }) {
    return axiosInstance.get(
      `/order/${params.order_id}/image/${params.image_id}/thumbnail?user=user`,
      { responseType: "arraybuffer" }
    );
  }
  getDetail(params: string) {
    return axiosInstance.get(`/order/${params}`);
  }
  update(params: { orderId: string; data: any }) {
    return axiosInstance.put(`/order/${params.orderId}`, params.data);
  }
}

export const orderService = new OrderService();
