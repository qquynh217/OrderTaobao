import { Card, Col, Form, Input, Row, Select, Spin } from "antd"
import { CONSIGNMENT } from "constants"
import { IConsignment } from "constants/interface"
import { FC, useEffect } from "react"

const CustomerInfo: FC<{ data: IConsignment, loading: boolean }> = ({ data, loading = false }) => {

  const [form] = Form.useForm()
  useEffect(() => {
    const formatData = {
      username: data.receiverInfo?.name,
      address: data.receiverInfo?.address,
      email: data.receiverInfo?.email || '',
      phone: data.receiverInfo?.phone || '',
      VNStorage: data.VNStorage,
      shipType: data.shipType,
    }
    form.setFieldsValue(formatData)
  }, [data])

  return (
    <div className="customer-info">
      <Card title="Thông tin đặt hàng" bordered>
        <Spin spinning={loading} tip="Đang tải..." size="large">
          <Form layout="vertical" form={form}>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item label="Họ và tên" name="username">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ" name="address">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input placeholder="Email" readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Kho TQ" name="shipType" >
                  <Select options={CONSIGNMENT.SHIP_TYPE} open={false} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Kho VN" name="VNStorage">
                  <Select options={CONSIGNMENT.VN_STORAGE} open={false} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}

export default CustomerInfo