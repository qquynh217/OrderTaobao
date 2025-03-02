import { Col, Row } from "antd";
import EditableParagraph from "components/EditableParagraph";
import NumberFormat from "components/NumberFormat";
import { USER_ROLE } from "constants";
import { useOrderContext } from "context/OrderContext";
import { FC } from "react";
import { userStore } from "store/userStore";

const OrderTotal: FC = () => {
  const { order, handleUpdateOrder } = useOrderContext();
  const { role } = userStore();
  const productsFees = [
    {
      label: "(1) Tiền hàng",
      value: order.item_total_cost || 0,
      key: "item_total_cost",
    },
    {
      label: "(2) Phí trả thêm (nếu có)",
      value: order.extra_fee || 0,
      key: "extra_fee",
    },
    {
      label: "(3) Ship nội địa TQ",
      value: order.ship_cn_fee || 0,
      key: "ship_cn_fee",
    },
    {
      label: "(4) Phí mua hàng",
      value: order.item_total_cost * order.order_fee_percent || 0,
    },
    {
      label: "(5) Phí kiểm đếm",
      value: order.tally_fee || 0,
      key: "tally_fee",
    },
  ];
  const weightFees = [
    { label: "Tiền cân thực", value: order.weight_fee || 0, key: "weight_fee" },
    {
      label: "Tiền cân quy đổi",
      value: order.volumn_fee || 0,
      key: "volumn_fee",
    },
    {
      label: "(7) Tiền cân tính",
      value: Math.max(order.weight_fee || 0, order.volumn_fee || 0),
    },
    {
      label: "(8) Đóng gỗ",
      value: order.wood_package_fee || 0,
      key: "wood_package_fee",
    },
    {
      label: "(9) Cước vận phát sinh (nếu có)",
      value: order.extra_ship_fee || 0,
      key: "extra_ship_fee",
    },
  ];
  const totals = [
    {
      label: "Tổng giá trị đơn hàng (6 + 7 + 8 + 9)",
      value: order.total_fee || 0,
    },
    {
      label: "Đã thanh toán",
      value: order.total_paid || 0,
    },
    {
      label: "Còn thiếu",
      value: (order.total_fee || 0) - (order.total_paid || 0),
    },
  ];

  return (
    <div className="order-total">
      <div className="d-flex-center justify-between ">
        <h2>Tổng phí</h2>
        <p>
          Tỉ giá áp dụng: <b>{order.exchange_rate}</b>
        </p>
      </div>

      <Row className="order-total_detail" gutter={30}>
        <Col span={12}>
          <h4>Tiền hàng</h4>
          {productsFees.map((item, id) => (
            <div
              className="d-flex-center justify-between"
              key={id}
              style={{ lineHeight: 2 }}
            >
              <p>{item.label}</p>
              {role == USER_ROLE.ADMIN && item.key ? (
                <EditableParagraph
                  initvalue={item.value}
                  handleUpdate={handleUpdateOrder}
                  field={item.key}
                />
              ) : (
                <b>
                  <NumberFormat value={item.value} suffix="đ" />
                </b>
              )}
            </div>
          ))}
          <div
            className="d-flex-center justify-between"
            style={{ lineHeight: 2 }}
          >
            <p>(6) Tổng = 1 + 2 + 3 + 4 + 5</p>
            <b>
              <NumberFormat
                value={productsFees.reduce((acc, item) => acc + +item.value, 0)}
                suffix="đ"
              />
            </b>
          </div>
        </Col>
        <Col span={12}>
          <h4>Tiền cân nặng</h4>
          {weightFees.map((item, id) => (
            <div
              className="d-flex-center justify-between"
              key={id}
              style={{ lineHeight: 2 }}
            >
              <p>{item.label}</p>
              {role == USER_ROLE.ADMIN && item.key ? (
                <EditableParagraph
                  initvalue={item.value}
                  handleUpdate={handleUpdateOrder}
                  field={item.key}
                />
              ) : (
                <b>
                  <NumberFormat value={item.value} suffix="đ" />
                </b>
              )}
            </div>
          ))}
        </Col>
      </Row>

      <div className="total-fee">
        <h4>Chốt đơn</h4>
        {totals.map((item, id) => (
          <div
            className="d-flex-center justify-between"
            key={id}
            style={{ lineHeight: 1.5 }}
          >
            <p>{item.label}</p>
            <b>
              <NumberFormat value={item.value} suffix="đ" />
            </b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTotal;
