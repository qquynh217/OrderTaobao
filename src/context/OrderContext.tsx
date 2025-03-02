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

interface IOrderContext {
  order: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder>>;
  handleUpdateOrder: (value: any, field: string) => Promise<void>;
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
        const data = res.data.data.result;
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleUpdateOrder = async (value: any, field: string) => {
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
      if (res.status == 200) {
        showMessage(
          "success",
          `Sửa ${ORDER_FIELD_NAME[field] || "đơn hàng"} thành công.`
        );
        setOrder((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    } catch (error) {
      console.log(error);
      showMessage("error", "Sửa đơn hàng không thành công.");
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
