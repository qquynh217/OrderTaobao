import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'; // Icons cho thêm/xóa
import { Button, Card, Col, Form, InputNumber, Row, Space } from 'antd'; // Import AntD components
import { IConfig } from 'constants/interface';
import { useEffect } from 'react';



interface CurrentConfigFormProps {
  initialValues: IConfig;
  handleSubmit: (values: IConfig) => void;
}

function CurrentConfigForm({ initialValues, handleSubmit }: CurrentConfigFormProps) {
  const [form] = Form.useForm(); // Sử dụng AntD Form hook

  // Dùng useEffect để set giá trị ban đầu khi initialValues thay đổi
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  // Hàm này sẽ được gọi khi form submit thành công
  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  // Hàm này sẽ được gọi nếu form submit thất bại (validation errors)
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="current-config-tab">
      {/* Thiết lập Form với form instance và các hàm submit */}
      <Form
        form={form}
        name="config_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical" // Layout dọc
        initialValues={initialValues} // Set giá trị ban đầu cho form
      >
        <Row gutter={20}>
          <Col span={8}>
            {/* Phần Tỷ giá */}
            <Card title="Tỷ giá (VNĐ/Tệ)" className="config-section ant-card-small">
              <Form.Item
                label="Tỷ giá"
                name="exchange_rate"
                rules={[{ required: true, message: 'Vui lòng nhập tỷ giá!' }]}
              >
                <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={8}>
            {/* Phần Phí mua hàng */}
            <Card title="Phí mua hàng (%)" className="config-section ant-card-small">
              <Form.List name="purchase_fee">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" className="ant-input-group-custom">
                        <Form.Item
                          {...restField}
                          name={[name, 'min']}
                          label="Từ"
                          rules={[{ required: true, message: 'Vui lòng nhập giá trị min!' }]}
                        >
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'max']}
                          label="Đến"
                          rules={[
                            { required: true, message: 'Vui lòng nhập giá trị max!' },
                            () => ({
                              validator(_, value) {
                                if (!value || form.getFieldValue(['purchase_fee', name, 'min']) <= value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Giá trị Đến phải lớn hơn hoặc bằng Từ!'));
                              },
                            }),
                          ]}
                        >
                          <InputNumber min={form.getFieldValue(['purchase_fee', name, 'min']) || 0} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          label="Phí (%)"
                          rules={[{ required: true, message: 'Vui lòng nhập giá trị phí!' }]}
                        >
                          <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className="dynamic-delete-button"
                          />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm mức phí mua hàng
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

          </Col>

          <Col span={8}>
            {/* Phần Phí vận chuyển theo cân nặng */}
            <Card title="Phí vận chuyển theo cân nặng (VNĐ/KG)" className="config-section ant-card-small">
              <Form.List name="weight">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" className="ant-input-group-custom">
                        <Form.Item
                          {...restField}
                          name={[name, 'min']}
                          label="Từ (kg)"
                          rules={[{ required: true, message: 'Vui lòng nhập cân nặng min!' }]}
                        >
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'max']}
                          label="Đến (kg)"
                          rules={[
                            { required: true, message: 'Vui lòng nhập cân nặng max!' },
                            () => ({
                              validator(_, value) {
                                if (!value || form.getFieldValue(['weight', name, 'min']) <= value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Giá trị Đến phải lớn hơn hoặc bằng Từ!'));
                              },
                            }),
                          ]}
                        >
                          <InputNumber min={form.getFieldValue(['weight', name, 'min']) || 0} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          label="Phí (VNĐ)"
                          rules={[{ required: true, message: 'Vui lòng nhập giá trị phí!' }]}
                        >
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className="dynamic-delete-button"
                          />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm mức cân nặng
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>
        </Row>



        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Lưu cấu hình
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CurrentConfigForm;