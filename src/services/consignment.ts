import { consignment, consignmentTransactions } from "constants/dumpData";
import { IConsignment, IConsignmentTransaction } from "constants/interface";
import axiosInstance from "services";

class ConsignmentService {
  create(params: IConsignment & { transaction: IConsignmentTransaction[] }) {
    return axiosInstance.post("/consignment", params)
  }
  getDetail(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(consignment)
      }, 1000)
    })
    return axiosInstance.get(`/consignment/${id}`)
  }
  getTransactions(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(consignmentTransactions)
      }, 1000)
    })
    return axiosInstance.get(`/consignment/${id}/transactions`)
  }
}

const consignmentService = new ConsignmentService()

export default consignmentService
