import { Button, Col, Form, Input, InputNumber, Radio, Row, Space } from "antd";
import ImageUploader from "components/ImageUpload";
import { SHIPPING_TYPE } from "constants";
import { FC } from "react";
import { FaPlus, FaX } from "react-icons/fa6";
import noPhoto from "resources/images/no-photo.png";
import { orderService } from "services/order";
const tableCol = [
  { key: "image", name: "Ảnh", span: 2 },
  {
    key: "link",
    name: "Link sản phẩm",
    span: 5,
    label: "Nhập link sản phẩm",
    Comp: Input,
    rules: [
      {
        required: true,
        message: "Chưa nhập link sản phẩm",
      },
    ],
  },
  { key: "color", name: "Màu sắc", span: 3, label: "Màu sắc" },
  { key: "size", name: "Kích thước", span: 3, label: "Nhập size" },
  {
    key: "qty",
    name: "Số lượng",
    span: 3,
    label: "Số lượng",
    Comp: InputNumber,
    rules: [
      {
        required: true,
        message: "Chưa nhập số lượng",
      },
    ],
  },
  {
    key: "price",
    name: "Giá (Tệ)",
    span: 3,
    label: "Giá (Tệ)",
    Comp: InputNumber,
    rules: [
      {
        required: true,
        message: "Chưa nhập giá",
      },
    ],
  },
  {
    key: "note",
    name: "Ghi chú",
    span: 4,
    label: "Ghi chú",
    type: "text",
    Comp: Input.TextArea,
  },
];

const CreateOrder: FC = () => {
  const [form] = Form.useForm();
  // const image = Form.useWatch("image", form);
  const onSubmit = async (value: any) => {
    console.log(value);
    let data = {
      image: value.image || "",
      shippingType: value.shippingType,
      products: [
        {
          link_product: value.link,
          color: value.color || "",
          size: value.size || "",
          number: value.qty,
          price: value.price,
          note: value.note || "",
        },
        ...(value.products || []),
      ],
    };
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("data", JSON.stringify(data));
    try {
      const res = await orderService.create(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-order">
      <h2>Tạo đơn từ website</h2>
      <p className="desc">
        Quý khách nên tạo đơn hàng bằng extension để có được trải nghiệm tốt
        nhất. Mời quý khách cài đặt tại
      </p>
      <Row className="table-header">
        {tableCol.map((item) => (
          <Col span={item.span} key={item.key}>
            <p className="header-item">{item.name}</p>
          </Col>
        ))}
      </Row>
      <Form
        name="dynamic_form_nest_item"
        autoComplete="off"
        form={form}
        onFinish={onSubmit}
      >
        <Row className="table-row">
          {tableCol.map((item) => {
            let Comp = item.Comp || Input;
            return (
              <Col span={item.span} key={item.key}>
                <div className="column-item">
                  {item.key == "image" ? (
                    <img src={noPhoto} className="no-image" />
                  ) : (
                    <Form.Item
                      name={item.key}
                      rules={item.rules}
                      key={item.key}
                    >
                      <Comp placeholder={item.label} />
                    </Form.Item>
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row className="table-row" key={key}>
                  {tableCol.map((item) => {
                    let Comp = item.Comp || Input;
                    return (
                      <Col span={item.span} key={item.key}>
                        <div className="column-item">
                          {item.key == "image" ? (
                            <img src={noPhoto} className="no-image" />
                          ) : (
                            <Form.Item
                              {...restField}
                              name={[name, item.key]}
                              rules={item.rules}
                              key={item.key}
                            >
                              <Comp placeholder={item.label} />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                    );
                  })}
                  <Col span={1} className="button-cell">
                    <Button
                      type="primary"
                      className="delete-btn"
                      onClick={() => remove(name)}
                    >
                      <FaX />
                    </Button>
                  </Col>
                </Row>
              ))}
              <Row>
                <Col span={19} />
                <Col span={5} className="col-add-btn">
                  <Button
                    type="primary"
                    onClick={() => add()}
                    block
                    className="add-btn"
                  >
                    <span>Thêm sản phẩm</span>
                    <FaPlus />
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Form.List>
        <Row className="table-footer">
          <Col span={7}>
            <div className="column-item">
              <Form.Item
                name="shippingType"
                rules={[
                  {
                    required: true,
                    message: "Chọn phương thức vận chuyển",
                  },
                ]}
              >
                <Radio.Group>
                  <Space direction="vertical" style={{ gap: 20 }}>
                    {SHIPPING_TYPE.map((item) => (
                      <Radio value={item.value}>{item.text}</Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          </Col>
          <Col span={12}>
            <div className="column-item">
              <ImageUploader form={form} />
              <Form.Item name="image" style={{ display: "none" }}>
                <Input placeholder="Link ảnh" />
              </Form.Item>
            </div>
          </Col>
          <Col span={5}>
            <div className="column-item" style={{ gap: 20 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                }}
              >
                Tạo đơn
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateOrder;
