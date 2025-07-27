import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Table
} from "antd";
import showMessage from "components/Message";
import { CONSIGNMENT } from "constants";
import { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { provinceService } from "services/province";
import { userStore } from "store/userStore";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    width: 50,
    render: (_value: any, _record: any, index: number) => index + 1,
  },
  {
    title: "MÃ VẬN ĐƠN",
    dataIndex: "transactionCode",
    render: () => <Form.Item name='transactionCode' rules={[{ required: true, message: 'Vui lòng nhập mã vận đơn' }]}><Input placeholder="Mã vận đơn" /></Form.Item>,
  },
  {
    title: "TÊN SẢN PHẨM",
    dataIndex: "productName",
    render: () => <Form.Item name='productName'><Input placeholder="Tên sản phẩm" /></Form.Item>,
  },
  {
    title: "GIÁ TRỊ (¥)",
    dataIndex: "productValue",
    render: () => <Form.Item name='productValue'><InputNumber suffix="¥" placeholder="Giá trị" /></Form.Item>,
  },
  {
    title: "SỐ SẢN PHẨM",
    dataIndex: "productAmount",
    render: () => <Form.Item name='productAmount'><InputNumber placeholder="Số sản phẩm" /></Form.Item>,
  },
];

const ConsignmentCreate = () => {
  const { name, phone_number, province, district, address_detail, id: userId } = userStore()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const shipType = Form.useWatch('shipType', form)
  const navigate = useNavigate()
  const getAddress = async () => {
    const res = await provinceService.getLocationText({ province, district, field: "name" })
    form.setFieldsValue({ address: address_detail + ", " + res })
  }
  useEffect(() => {
    getAddress()
  }, [])
  useEffect(() => {
    if (shipType == 2) {
      form.setFieldsValue({ VNStorage: "Móng Cái" })
    } else {
      form.setFieldsValue({ VNStorage: "Hà Nội" })
    }
  }, [shipType])

  const handleSubmit = async (values: any) => {
    const { transactionCode, productName, productValue, productAmount, ...resValue } = values
    const data = {
      ...resValue,
      userId: userId,
      isWoodPackage: values.isWoodPackage || false,
      isItemInspected: values.isItemInspected || false,
      transaction: [
        {
          transactionCode,
          productName,
          productValue,
          productAmount
        }
      ],
      receiverInfo: {
        name: values.username,
        phone: values.phone,
        address: values.address
      }
    }
    console.log(data);
    setLoading(true)
    try {
      // Giả lập gọi API
      await new Promise(resolve => setTimeout(resolve, 1000))
      // const res = await consignmentService.create(data)
      // console.log(res);
      form.resetFields()
      showMessage('success', 'Tạo mới ký gửi thành công')
      setTimeout(() => {
        navigate(ROUTE_URL.CONSIGNMENT)
      }, 1000)
    } catch (error) {
      console.log(error);
      showMessage('error', 'Tạo mới ký gửi thất bại')
    } finally {
      setLoading(false)
    }
  }
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
        <Spin spinning={loading} tip="Đang tạo mới ký gửi...">
          <Form
            onFinish={handleSubmit}
            form={form}
            layout="horizontal"
            initialValues={{ insurance: 0, username: name, phone: phone_number }}
          >
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
                  <Select options={CONSIGNMENT.INSURANCE_TYPE} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <h3 className="sub-title">Thông tin vận đơn</h3>
              </Col>
              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={[{}]}
                  pagination={false}
                  bordered
                />
              </Col>
              <Divider />
              <Col span={24}>
                <h3 className="sub-title">Địa chỉ giao nhận</h3>
              </Col>
              <Col span={8}>
                <Form.Item label="Họ tên" name="username">
                  <Input placeholder="Họ tên" readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Điện thoại" name="phone">
                  <Input placeholder="Số điện thoại" readOnly />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="Địa chỉ" name="address">
                  <Input.TextArea placeholder="Địa chỉ" rows={2} readOnly />
                </Form.Item>
              </Col>
              <Col span={24}>
                <h3 className="sub-title">Kho nhận hàng</h3>
              </Col>
              <Col span={8}>
                <Form.Item label="Kho TQ" name='shipType' rules={[{ required: true, message: 'Vui lòng chọn kho TQ' }]}>
                  <Select options={CONSIGNMENT.SHIP_TYPE}>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Kho VN" name='VNStorage'>
                  <Select options={shipType == 2 ? [
                    {
                      value: "Móng Cái",
                      label: "Móng Cái",
                    }
                  ] : CONSIGNMENT.VN_STORAGE}>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="btn-create-wrapper">
              <Button type="primary" htmlType="submit" className="btn-create">
                Tạo mới
              </Button>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default ConsignmentCreate;
