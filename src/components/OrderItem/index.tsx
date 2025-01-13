import { Button, Checkbox, Col, Row, Space, Tag, Tooltip } from "antd";
import EditableParagraph from "components/EditableParagraph";
import NumberFormat from "components/NumberFormat";
import { ORDER_STATUS } from "constants";
import { IOrder } from "constants/interface";
import { FC } from "react";
import { formatDate } from "utils";

const OrderItem: FC<{ item: IOrder }> = ({ item }) => {
  return (
    <div className="order-item">
      <div className="order-header">
        <Row gutter={24}>
          <Col span={8}>
            <Space className="order-id">
              <img src={item.images} alt="" />
              <div className="oder-info">
                <Space>
                  <h2 className="id">{item.id}</h2>
                  <Tag color={ORDER_STATUS[item.status].color}>
                    {ORDER_STATUS[item.status].value}
                  </Tag>
                  <p className="shipping-type">{item.shippingType}</p>
                </Space>
                <div className="deposit">
                  <Checkbox>Đóng cọc</Checkbox>
                  <Checkbox>Sẽ đặt cọc</Checkbox>
                </div>
                <EditableParagraph
                  initvalue={item.noteForOwner}
                  tooltip="Sửa ghi chú đơn riêng, nhân viên không nhìn thấy"
                />
              </div>
            </Space>
          </Col>
          <Col span={12}>
            <Tooltip title="Ghi chú cho nhân viên thấy">
              <p className="note">Ghi chú: {item.noteForStaff || "..."}</p>
            </Tooltip>
          </Col>
          <Col span={4} className="button-detail">
            <Button type="primary">Chi tiết</Button>
          </Col>
        </Row>
      </div>
      <div className="order-fee">
        <Row gutter={24}>
          <Col span={8}>
            {[
              { label: "Số kiện hàng", value: item.products.length },
              {
                label: "% phí mua hàng",
                value: item.orderFeePercent * 100 + " %",
              },
              { label: "Tỷ giá", value: item.exchangeRate },
              { label: "Kiểu Vận chuyển", value: item.shippingType },
              { label: "Hàng về kho", value: item.stockWarehouse },
              { label: "Kho khách chọn", value: item.userWarehouse },
            ].map(({ label, value }) => (
              <div className="order-fee_item">
                <p className="label">{label}:</p>
                <p className="value">{value}</p>
              </div>
            ))}
          </Col>
          <Col span={8}>
            {[
              {
                label: "Tổng chi phí",
                value: <NumberFormat value={item.totalFee} suffix="đ" />,
              },
              {
                label: "Đã thanh toán",
                value: <NumberFormat value={item.totalPaid} suffix="đ" />,
              },
              {
                label: "Đã thanh toán",
                value: (
                  <NumberFormat
                    value={item.totalFee - item.totalPaid}
                    suffix="đ"
                  />
                ),
              },
            ].map(({ label, value }) => (
              <div className="order-fee_item">
                <p className="label">{label}:</p>
                <p className="value">{value}</p>
              </div>
            ))}
          </Col>
          <Col span={8}>
            {[
              { label: "Đặt cọc", value: formatDate(item.depositAt) },
              { label: "Đã mua hàng", value: formatDate(item.purchasedAt) },
              {
                label: "Trên đường về VN",
                value: formatDate(item.transitToVnAt),
              },
              { label: "Trong kho VN", value: formatDate(item.stockInVnAt) },
              { label: "Trả hàng", value: formatDate(item.returnAt) },
            ].map(({ label, value }) => (
              <div className="order-fee_item">
                <p className="label">{label}:</p>
                <p className="value">{value}</p>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default OrderItem;
