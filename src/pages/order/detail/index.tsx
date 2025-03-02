import { Divider } from "antd";
import OrderHeader from "components/page/order-detail/OrderHeader";
import OrderPackage from "components/page/order-detail/OrderPackage";
import OrderProducts from "components/page/order-detail/OrderProducts";
import OrderTotal from "components/page/order-detail/OrderTotal";
import { OrderProvider } from "context/OrderContext";
import { FC } from "react";

const OrderDetail: FC = () => {
  return (
    <OrderProvider>
      <div className="order-detail">
        <h2 className="title">Chi tiết đơn hàng</h2>
        <div className="order-info">
          <OrderHeader />
          <Divider />
          <OrderPackage />
          <OrderProducts />
          <OrderTotal />
        </div>
      </div>
    </OrderProvider>
  );
};

export default OrderDetail;
