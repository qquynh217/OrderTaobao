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
import ImageOrder from "components/ImageOrder";
import showMessage from "components/Message";
import NumberFormat from "components/NumberFormat";
import { IOrder, IOrderProduct } from "constants/interface";
import { FC, useState } from "react";
import noImage from "resources/images/no-image-product.png";
import { ROUTE_URL, router } from "routes";
import { orderService } from "services/order";
import { userStore } from "store/userStore";
import { formatDate, getOrderStatus, getShippingType } from "utils";

const MAX_PRODUCT_ROW = 5;

const OrderItem: FC<{ item: IOrder; status: number }> = ({ item, status }) => {
  const { storage: user_storage } = userStore();
  const [isWoodPackage, setIsWoodPackage] = useState(
    item.is_wood_package || false
  );
  const column: TableProps<IOrderProduct>["columns"] = [
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (val: string, rec) => (
        <a href={val} className="product-link">
          <img src={rec.link_product_image || noImage} alt="" />
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
            value={item.exchange_rate * val}
            suffix="đ"
            decimalScale={0}
          />
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "number",
      key: "number",
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

  const toggleWoodPackage = async (e: any) => {
    const value = e.target.checked;
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          is_wood_package: value,
        })
      );
      const res = await orderService.update({
        orderId: item.id + "",
        data: formData,
      });
      if (res.status == 200) {
        showMessage("success", "Yêu cầu đóng gỗ thành công.");
        setIsWoodPackage(value);
      }
    } catch (error) {
      console.log(error);
      showMessage("error", "Yêu cầu đóng gỗ không thành công.");
    }
  };
  return (
    <div className="order-item">
      {status == 2 && <Checkbox>Chọn</Checkbox>}
      <div className="order-header">
        <Row gutter={24}>
          <Col span={10}>
            <Space className="order-id">
              <ImageOrder order_id={item.id} image_id={item.image_order} />
              <div className="oder-info">
                <Space>
                  <h2 className="id">{item.code}</h2>
                  <Tag color={getOrderStatus(item.status).color}>
                    {getOrderStatus(item.status).value}
                  </Tag>
                  <p className="shipping-type">
                    {getShippingType(item.type_delivery)?.text}
                  </p>
                </Space>
                <div className="deposit">
                  <Checkbox
                    checked={isWoodPackage}
                    onChange={toggleWoodPackage}
                  >
                    Đóng gỗ
                  </Checkbox>
                </div>
                <EditableParagraph
                  initvalue={item.note_owner}
                  tooltip="Sửa ghi chú đơn riêng, nhân viên không nhìn thấy"
                />
              </div>
            </Space>
          </Col>
          <Col span={10}>
            <Tooltip title="Ghi chú cho nhân viên thấy">
              <p className="note">Ghi chú: {item.note_staff || "..."}</p>
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
                { label: "Số kiện hàng", value: item.number_package || 0 },
                {
                  label: "% phí mua hàng",
                  value: item.order_fee_percent
                    ? item.order_fee_percent * 100 + " %"
                    : "--",
                },
                { label: "Tỷ giá", value: item.exchange_rate },

                { label: "Hàng về kho", value: item.stock_storage || "--" },
                { label: "Kho khách chọn", value: user_storage },
              ].map(({ label, value }, index) => (
                <div className="order-fee_item" key={index}>
                  <p className="label">{label}:</p>
                  <p className="value">{value}</p>
                </div>
              ))}
            </Col>
            <Col span={8}>
              {[
                {
                  label: "Tổng chi phí",
                  value: (
                    <NumberFormat
                      value={item.total_fee}
                      suffix="đ"
                      emptyText="--"
                    />
                  ),
                },
                {
                  label: "Đã thanh toán",
                  value: (
                    <NumberFormat value={item.total_paid || 0} suffix="đ" />
                  ),
                },
                {
                  label: "Chưa thanh toán",
                  value: (
                    <NumberFormat
                      value={item.total_fee - item.total_paid}
                      suffix="đ"
                    />
                  ),
                },
              ].map(({ label, value }, index) => (
                <div className="order-fee_item" key={index}>
                  <p className="label">{label}:</p>
                  <p className="value">{value}</p>
                </div>
              ))}
            </Col>
            <Col span={8}>
              {[
                { label: "Đặt cọc", value: formatDate(item.deposit_at) },
                { label: "Đã mua hàng", value: formatDate(item.purchased_at) },
                {
                  label: "Trên đường về VN",
                  value: formatDate(
                    item.packages ? item.packages[0]?.transit_at_vn : ""
                  ),
                },
                {
                  label: "Trong kho VN",
                  value: formatDate(
                    item.packages ? item.packages[0]?.stock_at_vn : ""
                  ),
                },
                {
                  label: "Trả hàng",
                  value: formatDate(
                    item.packages ? item.packages[0]?.return_at : ""
                  ),
                },
              ].map(({ label, value }, index) => (
                <div className="order-fee_item" key={index}>
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
              item.products.length > MAX_PRODUCT_ROW
                ? { pageSize: MAX_PRODUCT_ROW, position: ["bottomLeft"] }
                : false
            }
          />
          <div className="order-fee">
            <Row gutter={30}>
              <Col span={10}>
                {[
                  { label: "Tỷ giá", value: item.exchange_rate },
                  { label: "VIP", value: 0 },
                  {
                    label: "Kiểu Vận chuyển",
                    value: getShippingType(item.type_delivery)?.text,
                  },
                  { label: "Kho khách chọn", value: user_storage },
                ].map(({ label, value }, index) => (
                  <div className="order-fee_item" key={index}>
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
                      <NumberFormat
                        value={item.item_total_cost || 0}
                        suffix="đ"
                      />
                    ),
                  },
                  {
                    label: "Phí mua hàng",
                    value: (
                      <NumberFormat
                        value={item.item_total_cost * item.order_fee_percent}
                        decimalScale={0}
                        suffix="đ"
                      />
                    ),
                  },
                  {
                    label: "Phí ship nội địa TQ",
                    value: (
                      <NumberFormat value={item.ship_cn_fee || 0} suffix="đ" />
                    ),
                  },
                ].map(({ label, value }, index) => (
                  <div className="order-fee_item" key={index}>
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
                    value: (
                      <NumberFormat value={item.total_fee || 0} suffix="đ" />
                    ),
                  },
                  {
                    label: (
                      <span>
                        Đặt cọc tối thiểu tiền hàng <b>(70%)</b>
                      </span>
                    ),
                    value: (
                      <NumberFormat
                        value={item.item_total_cost * 0.7}
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
                        value={item.item_total_cost * 0.8}
                        decimalScale={0}
                        suffix="đ"
                      />
                    ),
                  },
                ].map(({ label, value }, index) => (
                  <div className="order-fee_item" key={index}>
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
