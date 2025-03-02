import { Checkbox, Col, Row, Select, Space, Tag } from "antd";
import EditableParagraph from "components/EditableParagraph";
import ImageOrder from "components/ImageOrder";
import { ORDER_STATUS, STORAGE_STATUS, USER_ROLE } from "constants";
import { useOrderContext } from "context/OrderContext";
import { FC } from "react";
import { userStore } from "store/userStore";
import { getOrderStatus } from "utils";

const OrderHeader: FC = () => {
  const { order, handleUpdateOrder } = useOrderContext();
  const { role } = userStore();
  return (
    <Row className="order-info_header">
      <Col span={4}>
        <ImageOrder image_id={order.image_order} order_id={order.id} />
      </Col>
      <Col span={18} className="order-header_text">
        <Space>
          <h4>Mã đơn: {order.code}</h4>
          {role == USER_ROLE.USER && (
            <Tag color={getOrderStatus(order.status).color}>
              {getOrderStatus(order.status).value}
            </Tag>
          )}
        </Space>
        {role == USER_ROLE.ADMIN && (
          <Space>
            <b>Trạng thái</b>
            <Select
              options={ORDER_STATUS.map((item) => ({
                value: item.key,
                label: item.value,
              }))}
              style={{ width: 200 }}
              value={order.status}
              onChange={(value: any) => {
                handleUpdateOrder(value, "status");
              }}
            />
          </Space>
        )}
        <Checkbox checked={order.is_wood_package}>Đóng gỗ</Checkbox>
        {role == USER_ROLE.USER && (
          <EditableParagraph
            initvalue={order.note_owner}
            tooltip="Sửa ghi chú đơn riêng, nhân viên không nhìn thấy"
          />
        )}
        <Space>
          <b>Hàng ở kho: </b>
          {role == USER_ROLE.ADMIN ? (
            <Select
              options={STORAGE_STATUS}
              style={{ width: 150 }}
              value={order.stock_storage || ""}
              onChange={(value) => {
                handleUpdateOrder(value, "stock_storage");
              }}
            />
          ) : (
            <span>{order.stock_storage || "Chưa về kho"}</span>
          )}
        </Space>
        <p>
          <b>Kho mong muốn: </b>
          <span>{order.user_storage}</span>
        </p>
      </Col>
    </Row>
  );
};
export default OrderHeader;
