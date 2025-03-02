import axiosInstance from "services";

class ConfigService {
  get() {
    return axiosInstance.get(`/config/latest`);
  }
}

export const configService = new ConfigService();
