import { IConfig } from "constants/interface";
import axiosInstance from "services";
import { SearchType } from "./order";
import { objectToSearchParams } from "utils";


class ConfigService {
  getLatest() {
    return axiosInstance.get(`/config/latest`);
  }
  // Lưu cấu hình mới
  createConfig(configData: IConfig) {
    return axiosInstance.post(`/config`, configData);
  }
  // Lấy lịch sử cấu hình với phân trang, tìm kiếm, sắp xếp
  // Params: { page, size, sort_by, sort, search, time_from, time_to }
  getHistoryConfigs(params: SearchType) {
    const paramStr = objectToSearchParams(params);
    return axiosInstance.get(`/config?${paramStr}`);
  }

  // Lấy chi tiết cấu hình theo ID (nếu cần hiển thị chi tiết hoặc khôi phục)
  getConfigById(configId: string) {
    return axiosInstance.get(`/config/${configId}`);
  }

  // Cập nhật cấu hình theo ID (ít dùng cho lịch sử, thường dùng cho cấu hình hiện tại nếu có ID)
  updateConfig(configId: string, configData: IConfig) {
    return axiosInstance.put(`/config/${configId}`, configData);
  }
  // Xóa cấu hình theo ID (ít dùng cho lịch sử, thường dùng cho cấu hình hiện tại nếu có ID)
  deleteConfig(configId: string) {
    return axiosInstance.delete(`/config/${configId}`);
  }
}

export const configService = new ConfigService();
