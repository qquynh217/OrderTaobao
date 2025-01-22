import { Checkbox, Col, Divider, Row, Space, Tag } from "antd";
import EditableParagraph from "components/EditableParagraph";
import OrderPackage from "components/page/order-detail/OrderPackage";
import OrderProducts from "components/page/order-detail/OrderProducts";
import { orderEx } from "constants/dumpData";
import { initOrder } from "constants/initials";
import { IOrder } from "constants/interface";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderStatus } from "utils";

const OrderDetail: FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<IOrder>(initOrder);

  const fetchOrder = async () => {
    try {
      const res = orderEx;
      setOrder(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  return (
    <div className="order-detail">
      <h2 className="title">Chi tiết đơn hàng</h2>
      <Row gutter={10}>
        <Col span={16}>
          <div className="order-info">
            <Row className="order-info_header">
              <Col span={6}>
                <img src={order.images} alt="" className="order-img" />
              </Col>
              <Col span={18} className="order-header_text">
                <Space>
                  <h4>Mã đơn: {order.id}</h4>
                  <Tag color={getOrderStatus(order.status).color}>
                    {getOrderStatus(order.status).value}
                  </Tag>
                </Space>
                <Checkbox checked={order.isWoodPackaging}>Đóng gỗ</Checkbox>
                <EditableParagraph
                  initvalue={order.noteForOwner}
                  tooltip="Sửa ghi chú đơn riêng, nhân viên không nhìn thấy"
                />
                <p>
                  <b>Hàng ở kho: </b>
                  <span>{order.stockWarehouse || "Chưa về kho"}</span>
                </p>
                <p>
                  <b>Kho mong muốn: </b>
                  <span>{order.userWarehouse || "Chưa về kho"}</span>
                </p>
              </Col>
            </Row>
            <Divider />
            <OrderPackage order={order} />
            <OrderProducts
              products={order.products}
              exchangeRate={order.exchangeRate}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className="order-history"></div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetail;
