import { Button, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { initPackage } from "constants/initials";
import { IPackage } from "constants/interface";
import { useOrderContext } from "context/OrderContext";
import dayjs from "dayjs";
import { FC, useMemo } from "react";

const PackageModal: FC<{
  packages: Array<IPackage>;
  isOpen: {
    action: string;
    index: number | null;
  };
  setIsOpen: any;
}> = ({ packages, isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen({
      action: "",
      index: 0,
    });
  };
  const { handleUpdateOrder } = useOrderContext();
  const initData: any = useMemo(() => {
    let initialValue: any = initPackage;
    if (isOpen.action == "edit" && isOpen.index != null) {
      const item = packages[isOpen.index];
      initialValue = {
        ...initialValue,
        ...item,
        ship_at: item.ship_at ? dayjs(item.ship_at) : item.ship_at,
        transit_at_vn: item.transit_at_vn
          ? dayjs(item.transit_at_vn)
          : item.transit_at_vn,
        stock_at_vn: item.stock_at_vn
          ? dayjs(item.stock_at_vn)
          : item.stock_at_vn,
        return_at: item.return_at ? dayjs(item.return_at) : item.return_at,
      };
    }
    return initialValue;
  }, [isOpen, packages]);

  const onSubmit = async (value: IPackage) => {
    if (isOpen.action == "create") {
      const newpackages = [...(packages || []), value];
      await handleUpdateOrder(newpackages, "packages", "Thêm kiện hàng");
      handleClose();
    } else {
      if (isOpen.index != null && packages.length > isOpen.index) {
        const newpackages = [...packages];
        newpackages[isOpen.index] = value;
        await handleUpdateOrder(newpackages, "packages", "Sửa kiện hàng");
        handleClose();
      }
    }
  };
  return (
    <Modal
      className="product-modal"
      footer={null}
      destroyOnClose
      onCancel={handleClose}
      open={isOpen.action != ""}
      title={isOpen.action == "create" ? "Thêm kiện hàng" : "Sửa kiện hàng"}
      width={600}
      centered
    >
      <Form
        className="product-detail-form"
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initData}
      >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item name="id" label="Mã kiện">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="weight" label="Cân nặng">
              <Input type="number" suffix="kg" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="weight_base_volumn" label="Cân nặng theo thể tích">
              <Input type="number" suffix="kg" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="transit_at_vn" label="Trên đường về VN">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="stock_at_vn" label="Trong kho VN">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ship_at" label="Người bán giao">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="return_at" label="Trả hàng">
              <DatePicker />
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

export default PackageModal;
