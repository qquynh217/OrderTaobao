import {
  Breadcrumb,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { INSURANCE_TYPE } from "constants";
import { FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTE_URL } from "routes";

const ConsignmentCreate = () => {
  return (
    <div className="consignment-create">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to={ROUTE_URL.CONSIGNMENT} className="title">
                <FaBox />
                <span>KÝ GỬI</span>
              </Link>
            ),
          },
          {
            title: "TẠO MỚI KÝ GỬI",
          },
        ]}
      />
      <div className="consignment-create_wrapper">
        <Form layout="horizontal" initialValues={{ insurance: 0 }}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name="isWoodPackage">
                <Checkbox>Đóng gỗ</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isItemInspected">
                <Checkbox>Kiểm hàng</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="insurance" label="Bảo hiểm">
                <Select options={INSURANCE_TYPE} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <h3 className="sub-title">Thông tin vận đơn</h3>
            </Col>
            <Col span={10}>
              <Form.Item name="transactionCode" label="Mã vận đơn">
                <Input />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item name="productName" label="Tên sản phẩm">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="productName" label="Giá trị">
                <InputNumber suffix="¥" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="numberPackage" label="Số kiện">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="productAmount" label="Số sản phẩm">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={24}>
              <h3 className="sub-title">Địa chỉ giao nhận</h3>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ConsignmentCreate;
