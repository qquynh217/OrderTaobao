import { Button, Col, Form, Input, Row } from "antd";
import { FC } from "react";
import { IoRemoveCircleOutline } from "react-icons/io5";

const tableCol = [
  { key: "image", name: "Ảnh", span: 3 },
  { key: "image", name: "Link sản phẩm", span: 5 },
  { key: "image", name: "Màu sắc", span: 3 },
  { key: "image", name: "Kích thước", span: 3 },
  { key: "image", name: "Số lượng", span: 2 },
  { key: "image", name: "Giá (Tệ)", span: 3 },
  { key: "image", name: "Ghi chú", span: 5 },
];

const CreateOrder: FC = () => {
  return (
    <div className="create-order">
      <h2>Tạo đơn từ website</h2>
      <p className="desc">
        Quý khách nên tạo đơn hàng bằng extension để có được trải nghiệm tốt
        nhất. Mời quý khách cài đặt tại
      </p>
      <Row>
        {tableCol.map((item) => (
          <Col span={item.span} key={item.key}>
            <p className="table-header">{item.name}</p>
          </Col>
        ))}
      </Row>
      <Form
        name="dynamic_form_nest_item"
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row>
                  <Form.Item
                    {...restField}
                    name={[name, "first"]}
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "last"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <IoRemoveCircleOutline onClick={() => remove(name)} />
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateOrder;
