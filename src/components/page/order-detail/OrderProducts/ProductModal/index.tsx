import { Button, Col, Form, Input, Modal, Row } from "antd";
import { initProductOrder } from "constants/initials";
import { IOrderProduct } from "constants/interface";
import { useOrderContext } from "context/OrderContext";
import { FC, useMemo } from "react";

const ProductModal: FC<{
  products: Array<IOrderProduct>;
  index: number | null;
  setIndex: any;
}> = ({ products, index, setIndex }) => {
  const handleClose = () => {
    setIndex(null);
  };
  const { handleUpdateOrder } = useOrderContext();
  // const [form] = Form.useForm();
  const initData: IOrderProduct = useMemo(
    () => ({
      ...initProductOrder,
      ...products[index || 0],
    }),
    [index, products]
  );
  const onSubmit = async (value: IOrderProduct) => {
    if (index != null && products.length > index) {
      const newProducts = [...products];
      newProducts[index] = value;
      await handleUpdateOrder(newProducts, "products");
    }
  };
  return (
    <Modal
      className="product-modal"
      footer={null}
      destroyOnClose
      onCancel={handleClose}
      open={index != null}
      title="Sửa sản phẩm"
      width={600}
      centered
    >
      <Form
        className="product-detail-form"
        initialValues={initData}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              name="link_product"
              label="Link sản phẩm"
              rules={[{ required: true, message: "Link sản phẩm là bắt buộc" }]}
            >
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="link_product_image" label="Link ảnh sản phẩm">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="color" label="Màu sắc">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="size" label="Kích thước">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="number"
              label="Số lượng khách đặt"
              rules={[{ required: true, message: "Số lượng là bắt buộc" }]}
            >
              <Input type="number" min={1} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="number_order" label="Số lượng đặt được">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Đơn giá (¥)"
              rules={[{ required: true, message: "Đơn giá là bắt buộc" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="note" label="Ghi chú khách hàng">
              <Input.TextArea readOnly />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="staff_note" label="Ghi chú nhân viên">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex-center justify-center gap10">
          <Button type="primary" className="small" htmlType="submit">
            Lưu
          </Button>
          <Button type="primary" className="small black" onClick={handleClose}>
            Trở lại
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductModal;
