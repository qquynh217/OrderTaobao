import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Spin,
} from "antd";
import ImageUploader from "components/ImageUpload";
import showMessage from "components/Message";
import { SHIPPING_TYPE } from "constants";
import { FC, useState } from "react";
import { FaPlus, FaX } from "react-icons/fa6";
import noPhoto from "resources/images/no-photo.png";
import { orderService } from "services/order";
import { configStore } from "store/configStore";
import { userStore } from "store/userStore";
const tableCol = [
  { key: "image", name: "Ảnh", span: 2 },
  {
    key: "link_product",
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
    key: "number",
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
  const [isLoading, setIsLoading] = useState(false);
  const { exchange_rate } = configStore();
  const { storage } = userStore();
  // const image = Form.useWatch("image", form);
  const onSubmit = async (value: any) => {
    setIsLoading(true);
    let data = {
      image: value.image || "",
      type_delivery: value.shippingType,
      user_storage: storage,
      item_total_cost: 0,
      products: [
        {
          link_product: value.link_product,
          color: value.color || "",
          size: value.size || "",
          number: value.number,
          price: value.price,
          note: value.note || "",
        },
        ...(value.products || []),
      ],
    };
    data.item_total_cost = data.products.reduce(
      (res, item) => res + item.price * item.number * exchange_rate,
      0
    );

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("data", JSON.stringify(data));

    try {
      const res = await orderService.create(formData);
      if (res.status == 200) {
        form.resetFields();
        showMessage("success", "Tạo đơn hàng thành công.");
      }
    } catch (error) {
      console.log(error);
      showMessage("error", "Tạo đơn hàng không thành công.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-order">
      {isLoading && <Spin fullscreen tip="Đang tạo đơn..." />}
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
