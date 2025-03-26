import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { initUser } from "constants/initials";
import { IUser } from "constants/interface";
import { FC, useEffect } from "react";
import { userService } from "services/user";

const UserModal: FC<{ isOpen: string; setIsOpen: any; handleUpdate: any }> = ({
  isOpen,
  setIsOpen,
  handleUpdate,
}) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    setIsOpen("");
  };
  const fetchData = async () => {
    try {
      const res = await userService.get(isOpen);
      const data = res.data.data.result;
      form.setFieldsValue(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (value: IUser) => {
    await handleUpdate({ ...value, id: isOpen });
    handleClose();
  };
  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen]);

  return (
    <Modal
      className="product-modal"
      footer={null}
      destroyOnClose
      onCancel={handleClose}
      open={isOpen != ""}
      title="Thông tin tài khoản"
      width={500}
      centered
    >
      <Form
        initialValues={initUser}
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item name="email" label="Email">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="name" label="Họ tên">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phone_number" label="Số điện thoại">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="balance" label="Số dư">
              <Input type="number" suffix="đ" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="address_detail" label="Địa chỉ cụ thể">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="storage" label="Kho nhận">
              <Select
                options={[
                  {
                    label: "Hà Nội",
                    value: "Hà Nội",
                  },
                  {
                    label: "Hồ Chí Minh",
                    value: "Hồ Chí Minh",
                  },
                ]}
              />
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
export default UserModal;
