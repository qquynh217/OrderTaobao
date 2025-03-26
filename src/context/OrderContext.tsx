import showMessage from "components/Message";
import { ORDER_FIELD_NAME } from "constants";
import { initOrder } from "constants/initials";
import { IOrder } from "constants/interface";
import {
  FC,
  SetStateAction,
  createContext,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { orderService } from "services/order";
import { provinceService } from "services/province";

interface IOrderContext {
  order: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder>>;
  handleUpdateOrder: (value: any, field: string, msg?: string) => Promise<void>;
}
const OrderContext = createContext<IOrderContext>({
  order: initOrder,
  setOrder: () => {},
  handleUpdateOrder: async () => {},
});

export const OrderProvider: FC<any> = ({ children }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<IOrder>(initOrder);

  const fetchOrder = async () => {
    if (orderId) {
      try {
        const res = await orderService.getDetail(orderId);
        const data: IOrder = res.data.data.result;

        if (data.province && data.district) {
          const location = await provinceService.getLocationText({
            province: data.province,
            district: data.district,
          });
          data.full_address = data.address_detail + ", " + location;
        }
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateOrder = async (value: any, field: string, msg?: string) => {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          [field]: value,
        })
      );
      const res = await orderService.update({
        orderId: order.id + "",
        data: formData,
      });
      let message = msg
        ? `${msg} thành công`
        : `Sửa ${ORDER_FIELD_NAME[field] || "đơn hàng"} thành công.`;
      if (res.status == 200) {
        showMessage("success", message);
        // setOrder((prev) => ({
        //   ...prev,
        //   [field]: value,
        // }));
        fetchOrder();
      }
    } catch (error) {
      console.log(error);
      let message =
        `${msg} không thành công` ||
        `Sửa ${ORDER_FIELD_NAME[field] || "đơn hàng"} không thành công.`;
      showMessage("error", message);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [orderId]);
  return (
    <OrderContext.Provider value={{ order, setOrder, handleUpdateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const value = useContext(OrderContext);
  return value;
};
