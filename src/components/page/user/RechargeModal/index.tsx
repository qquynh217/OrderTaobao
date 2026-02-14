import { Button, Col, Divider, Form, Input, Modal, Row } from "antd";
import showMessage from "components/Message";
import { IUser } from "constants/interface";
import { FC } from "react";
import { formatNumber } from "utils";


const RechargeModal: FC<{ isOpen: boolean; setIsOpen: any; user:IUser | null; handleRecharge: (userId: string, amount: number) => Promise<void> }> = ({
  isOpen,
  setIsOpen,
  user,
  handleRecharge
}) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    form.resetFields();
    setIsOpen(null);
  };

  const onSubmit = async (value: {amount: number}) => {
    if(!user) return;
    const amount = value.amount;
    try {
        if(isNaN(amount) || amount <= 0) {
            showMessage("error", "Số tiền không hợp lệ");
            return;
        }
        if(amount < 10000) {
            showMessage("error", "Số tiền nạp tối thiểu là 10.000đ");
            return;
        }
        await handleRecharge(user.id + "", amount);
        handleClose();
    } catch (error) {
        showMessage("error", "Nạp tiền thất bại");
    }
  };

  return (
    <Modal
      className="product-modal recharge-modal"
      footer={null}
      destroyOnClose
      onCancel={handleClose}
      open={isOpen}
      title="Nạp tiền"
      width={500}
      centered
    >
      <Form
        initialValues={{ amount: 0 }}
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Row gutter={20}>
          <Col span={24}>
            <div className="user-info">
              <b>Khách hàng:</b>
              <p>{user?.name}</p>
            </div>
            <div className="user-info">
              <b>Số điện thoại:</b>
              <p>{user?.phone_number}</p>
            </div>
            <div className="user-info">
              <b>Số dư:</b>
              <p className="balance">{formatNumber(user?.balance || 0)} đ</p>
            </div>
          </Col>
          <Divider />
          <Col span={24}>
            <Form.Item name="amount" label="Nạp thêm">
              <Input type="number" suffix="đ" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex-center justify-center gap10">
          <Button type="primary" className="small" htmlType="submit">
            Nạp thêm
          </Button>
          <Button type="primary" className="small black" onClick={handleClose}>
            Trở lại
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
export default RechargeModal;
