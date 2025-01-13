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
import { FC } from "react";
import dayjs from "dayjs";
import OrderItem from "components/OrderItem";
import { orderEx } from "constants/dumpData";

const { RangePicker } = DatePicker;

const ListOrder: FC = () => {
  const handleSubmit = (value: {
    key: any;
    isCheck: any;
    duration: (string | number | dayjs.Dayjs | Date | null | undefined)[];
  }) => {
    {
      try {
        let params = {
          key: value.key,
          isCheck: value.isCheck,
          startTime: dayjs(value.duration[0]).format("DD/MM/YYYY"),
          endTime: dayjs(value.duration[1]).format("DD/MM/YYYY"),
        };
        console.log(params);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="list-order">
      <h2 className="title">Tất cả</h2>
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
        Đang hiển thị <b>4</b> trong tổng số <b>4</b> bản ghi
      </p>
      <div className="list-order_wrapper">
        <OrderItem item={orderEx} />
      </div>
    </div>
  );
};
export default ListOrder;
