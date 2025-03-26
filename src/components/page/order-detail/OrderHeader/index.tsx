import { Button, Checkbox, Input, Select, Space, Tag } from "antd";
import EditableParagraph from "components/EditableParagraph";
import ImageOrder from "components/ImageOrder";
import { ORDER_STATUS, STORAGE_STATUS, USER_ROLE } from "constants";
import { useOrderContext } from "context/OrderContext";
import { FC, useEffect, useState } from "react";
import { userStore } from "store/userStore";
import { getOrderStatus } from "utils";

const OrderHeader: FC = () => {
  const { order, handleUpdateOrder } = useOrderContext();
  const { role } = userStore();
  const [deposit, setDeposit] = useState(order.custom_percent_paid);

  useEffect(() => {
    setDeposit(order.custom_percent_paid);
  }, [order]);
  return (
    <div className="order-info_header">
      <div className="order-header_inner">
        <div className="d-flex gap30">
          <div className="order-image">
            <ImageOrder image_id={order.image_order} order_id={order.id} />
          </div>
          <div className="order-header_text">
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
          </div>
        </div>
        {role == USER_ROLE.ADMIN && (
          <div className="user-info">
            <div className="section-user">
              <b>Khách hàng:</b>
              <p>{order.name}</p>
            </div>
            <div className="section-user">
              <b>Email:</b>
              <p>{order.created_by}</p>
            </div>
            <div className="section-user">
              <b>SĐT:</b>
              <p>{order.phone_number}</p>
            </div>
            <div className="section-user">
              <b>Địa chỉ:</b>
              <p>{order.full_address}</p>
            </div>
          </div>
        )}
      </div>
      {role == USER_ROLE.ADMIN && (
        <div className="custom-deposit d-flex gap10">
          <h4>Tùy chỉnh cọc</h4>
          <Input
            type="number"
            suffix="%"
            allowClear
            onChange={(e) => {
              setDeposit(e.target.value || null);
            }}
            value={deposit || undefined}
          />
          <Button
            type="primary"
            onClick={() => {
              handleUpdateOrder(
                deposit ?? null,
                "custom_percent_paid",
                "Tùy chỉnh đặt cọc"
              );
            }}
          >
            Cập nhật
          </Button>
        </div>
      )}
    </div>
  );
};
export default OrderHeader;
