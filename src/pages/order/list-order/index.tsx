import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import OrderItem from "components/OrderItem";
import { ORDER_STATUS } from "constants";
import { IOrder } from "constants/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderService } from "services/order";

const { RangePicker } = DatePicker;

const ListOrder: FC = () => {
  const { status } = useParams();
  const [orders, setOrders] = useState<{ list: Array<IOrder>; total: 0 }>({
    list: [],
    total: 0,
  });
  const handleSubmit = async (value: {
    key: any;
    isCheck: any;
    duration: (string | number | dayjs.Dayjs | Date | null | undefined)[];
  }) => {
    {
      try {
        let params = {
          search: value.key,
          time_from: value.duration[0]
            ? dayjs(value.duration[0]).valueOf()
            : "",
          time_to: value.duration[1] ? dayjs(value.duration[1]).valueOf() : "",
          page: 1,
          size: 10,
        };

        const res = await orderService.get(params);
        console.log(res);
        const result = res.data.data.result;
        const list: Array<IOrder> = result.map((item: any) => ({
          id: item.id,
          code: item.code,
          status: item.status || 1,
          shippingType: item.type_delivery,
          images: item.image_order
            ? orderService.getImage({
                order_id: item.id,
                image_id: item.image_order,
              })
            : "",
          products: item.products,
          modified_time: item.modified_time,
          created_time: item.created_time,
        }));
        setOrders({
          total: res.data.data.pagination.total_records,
          list: list,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchOrders = async () => {
    try {
      await handleSubmit({
        key: "",
        isCheck: false,
        duration: [null, null],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);
  return (
    <div className="list-order">
      <h2 className="title">
        {(status && ORDER_STATUS.find((item) => item.key == +status)?.value) ||
          "Tất cả"}
      </h2>
      <div className="search-field">
        <Form className="search-order_form" onFinish={handleSubmit}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name="key">
                <Input placeholder="Mã đơn hàng hoặc ghi chú riêng" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isCheck" valuePropName="checked" label={null}>
                <Checkbox>Đặt cọc</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8} />
            <Col span={8}>
              <Form.Item name="duration">
                <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Space style={{ gap: 20 }}>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
                <Button type="primary" className="export-btn">
                  Xuất excel
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <p className="total-result">
        Đang hiển thị <b>{orders.list.length}</b> trong tổng số{" "}
        <b>{orders.total}</b> bản ghi
      </p>

      {!status || (status && +status != 2) ? (
        <div className="list-order_wrapper">
          {orders.list.map((order) => (
            <OrderItem item={order} status={+(status || 0)} key={order.id} />
          ))}
        </div>
      ) : (
        <div className="list-order_wrapper list-order-deposit">
          {orders.list.map((order) => (
            <OrderItem item={order} status={+(status || 0)} key={order.id} />
          ))}
        </div>
      )}
    </div>
  );
};
export default ListOrder;
