import {
  Button,
  Checkbox,
  Col,
  Divider,
  Row,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import EditableParagraph from "components/EditableParagraph";
import NumberFormat from "components/NumberFormat";
import { SHIPPING_TYPE } from "constants";
import { IOrder, IOrderProduct } from "constants/interface";
import { FC } from "react";
import noImage from "resources/images/no-image-product.png";
import { ROUTE_URL, router } from "routes";
import { formatDate, getOrderStatus, getShippingType } from "utils";

const OrderItem: FC<{ item: IOrder; status: number }> = ({ item, status }) => {
  const column: TableProps<IOrderProduct>["columns"] = [
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (val: string, rec) => (
        <a href={val} className="product-link">
          <img src={rec.image || noImage} alt="" />
        </a>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "size",
      key: "size",
      render: (val: string, rec) => (
        <>
          <p>{val}</p>
          <p>{rec.color}</p>
        </>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (val: number) => (
        <div className="product-price">
          <NumberFormat value={val} suffix="¥" />
          <NumberFormat
            value={item.exchangeRate * val}
            suffix="đ"
            decimalScale={0}
          />
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Ghi chú khách",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Ghi chú nhân viên",
      dataIndex: "staffNote",
      key: "staffNote",
    },
  ];
  return (
    <div className="order-item">
      {status == 2 && <Checkbox>Chọn</Checkbox>}
      <div className="order-header">
        <Row gutter={24}>
          <Col span={10}>
            <Space className="order-id">
              <img src={item.images || noImage} alt="" />
              <div className="oder-info">
                <Space>
                  <h2 className="id">{item.code}</h2>
                  <Tag color={getOrderStatus(item.status).color}>
                    {getOrderStatus(item.status).value}
                  </Tag>
                  <p className="shipping-type">
                    {
                      SHIPPING_TYPE.find(
                        (type) => type.value == item.shippingType
                      )?.text
                    }
                  </p>
                </Space>
                <div className="deposit">
                  <Checkbox value={item.isWoodPackaging}>Đóng gỗ</Checkbox>
                  <Checkbox>Sẽ đặt cọc</Checkbox>
                </div>
                <EditableParagraph
                  initvalue={item.noteForOwner}
                  tooltip="Sửa ghi chú đơn riêng, nhân viên không nhìn thấy"
                />
              </div>
            </Space>
          </Col>
          <Col span={10}>
            <Tooltip title="Ghi chú cho nhân viên thấy">
              <p className="note">Ghi chú: {item.noteForStaff || "..."}</p>
            </Tooltip>
          </Col>
          <Col span={4} className="button-detail">
            <Button
              type="primary"
              onClick={() => {
                router.navigate(ROUTE_URL.ORDER_DETAIL + `/${item.id}`);
              }}
            >
              Chi tiết
            </Button>
          </Col>
        </Row>
      </div>
      {status != 2 ? (
        <div className="order-fee">
          <Row gutter={24}>
            <Col span={8}>
              {[
                { label: "Số kiện hàng", value: item.products.length },
                {
                  label: "% phí mua hàng",
                  value: item.orderFeePercent
                    ? item.orderFeePercent * 100 + " %"
                    : "--",
                },
                { label: "Tỷ giá", value: item.exchangeRate },
                {
                  label: "Kiểu Vận chuyển",
                  value: getShippingType(item.shippingType)?.text,
                },
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
      ) : (
        <div className="order-detail">
          <Table
            columns={column}
            dataSource={item.products}
            pagination={
              item.products.length > 3
                ? { pageSize: 3, position: ["bottomLeft"] }
                : false
            }
          />
          <div className="order-fee">
            <Row gutter={30}>
              <Col span={10}>
                {[
                  { label: "Tỷ giá", value: item.exchangeRate },
                  { label: "VIP", value: 0 },
                  {
                    label: "Kiểu Vận chuyển",
                    value: getShippingType(item.shippingType)?.text,
                  },
                  { label: "Kho khách chọn", value: item.userWarehouse },
                ].map(({ label, value }) => (
                  <div className="order-fee_item">
                    <p className="label">{label}:</p>
                    <p className="value">{value}</p>
                  </div>
                ))}
              </Col>
              <Col span={2} />
              <Col span={10}>
                {[
                  {
                    label: "Tiền hàng",
                    value: (
                      <NumberFormat value={item.itemTotalCost} suffix="đ" />
                    ),
                  },
                  {
                    label: "Phí mua hàng",
                    value: (
                      <NumberFormat
                        value={item.itemTotalCost * item.orderFeePercent}
                        decimalScale={0}
                        suffix="đ"
                      />
                    ),
                  },
                  {
                    label: "Phí ship nội địa TQ",
                    value: (
                      <NumberFormat value={item.shippingCnFee} suffix="đ" />
                    ),
                  },
                ].map(({ label, value }) => (
                  <div className="order-fee_item">
                    <p className="label">{label}:</p>
                    <p className="value">{value}</p>
                  </div>
                ))}
                <Divider
                  variant="dashed"
                  style={{ borderBlockStartColor: "#7cb305", margin: "10px 0" }}
                />
                {[
                  {
                    label: "Tổng chi phí",
                    value: <NumberFormat value={item.totalFee} suffix="đ" />,
                  },
                  {
                    label: (
                      <span>
                        Đặt cọc tối thiểu tiền hàng <b>(70%)</b>
                      </span>
                    ),
                    value: (
                      <NumberFormat
                        value={item.itemTotalCost * 0.7}
                        decimalScale={0}
                        suffix="đ"
                      />
                    ),
                  },
                  {
                    label: (
                      <span>
                        Đặt cọc tối đa <b>(80%)</b>
                      </span>
                    ),
                    value: (
                      <NumberFormat
                        value={item.itemTotalCost * 0.8}
                        decimalScale={0}
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
                <Divider />
                <div className="button-field">
                  <Space>
                    <Button type="primary">Đặt cọc 70%</Button>
                    <Button type="primary">Đặt cọc 80%</Button>
                  </Space>
                  <Button danger>Hủy đơn</Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderItem;
