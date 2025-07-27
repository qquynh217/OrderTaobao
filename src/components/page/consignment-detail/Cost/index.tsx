import { Card, Col, Row, Spin, Typography } from "antd";
import { FC } from "react";
const { Text } = Typography

const ConsignmentCost: FC<{ loading: boolean }> = ({ loading = false }) => {
  const data = [
    { label: 'Phí ship nội địa TQ', value: '0' },
    { label: 'Đơn giá cước VCQT', value: '17,000' },
    { label: 'Cước phí VCQT (143 kg)', value: '2,431,000', highlight: true },
    { label: 'Phí bảo hiểm', value: '0' },
    { label: 'Phí kiểm hàng', value: '0' },
    { label: 'Phụ thu', value: '0' },
    { label: 'Chiết khấu', value: '0' },
    { label: 'Tổng cộng', value: '2,431,000', bold: true },
    { label: 'Đã thanh toán', value: '2,431,000', bold: true },
    { label: 'Cần thanh toán', value: '0', color: '#faad14', bold: true },
  ];
  return (
    <div className="consignment-cost">
      <Spin spinning={loading} tip="Đang tải..." size="large">
        <Card
          title={<Text strong>CHI PHÍ KÝ GỬI</Text>}
          extra={<Text style={{ color: '#faad14' }}>TỈ GIÁ 3,710</Text>}
          bordered
        >
          {data.map((item, index) => (
            <Row
              key={index}
              style={{
                borderBottom: index < data.length - 1 ? '1px dotted #d9d9d9' : 'none',
                padding: '6px 0',
              }}
            >
              <Col span={18}>
                <Text>{item.label}</Text>
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Text
                  strong={item.bold}
                  style={{ color: item.color || (item.highlight ? '#1890ff' : 'inherit') }}
                >
                  {item.value}
                </Text>
              </Col>
            </Row>
          ))}
        </Card>
      </Spin>
    </div>
  )
}

export default ConsignmentCost
