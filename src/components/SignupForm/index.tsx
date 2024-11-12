import { Button, Col, Form, Input, Row, Select } from "antd";
import showMessage from "components/Message";
import { EMAIL_PATTERN, PHONE_PATTERN, WAREHOUSES } from "constants";
import { IUser } from "constants/interface";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { provinceService } from "services/province";

const SignupForm: FC = () => {
  const [form] = Form.useForm();
  // State cho danh sách tỉnh/thành phố và quận/huyện
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  // State cho tỉnh/thành phố và quận/huyện đã chọn
  const [selectedProvince, setSelectedProvince] = useState("");

  // Tải danh sách tỉnh/thành phố từ API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await provinceService.searchProvice(); // Thay URL API thực tế
        setProvinces(response);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Khi chọn tỉnh/thành phố, gọi API lấy quận/huyện của tỉnh đó
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await provinceService.getDistrictsOfProvince({
            province: selectedProvince,
          });
          setDistricts(response);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  // Xử lý thay đổi tỉnh/thành phố
  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    form.setFieldValue("district", ""); // Reset quận/huyện khi thay đổi tỉnh
    setDistricts([]); // Clear quận/huyện khi thay đổi tỉnh
  };
  const handleSubmit = (value: IUser) => {
    console.log(value);
    try {
      showMessage("success", "Đăng ký tài khoản thành công!");
      form.resetFields();
    } catch (error) {
      showMessage("error", "Đăng ký không thành công!");
    }
  };

  return (
    <Form
      layout="vertical"
      size="large"
      form={form}
      className="signup-form"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="Email"
        label="Email"
        required
        rules={[
          () => ({
            validator(_, value) {
              if (EMAIL_PATTERN.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Vui lòng điền email hợp lệ.  "));
            },
          }),
        ]}
      >
        <Input placeholder="example@gmail.com" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          { required: true, message: "Mật khẩu không hợp lệ." },
          { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
          { max: 20, message: "Mật khẩu tối đa 20 ký tự" },
        ]}
      >
        <Input.Password placeholder="Mật khẩu tối thiểu 6 ký tự" />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        required
        rules={[
          { required: true, message: "Vui lòng xác nhận mật khẩu" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") == value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu không khớp"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Nhập lại mật khẩu" />
      </Form.Item>
      <Form.Item
        name="fullname"
        label="Họ tên"
        required
        rules={[{ required: true, message: "Vui lòng điền họ tên của bạn." }]}
      >
        <Input />
      </Form.Item>
      <Row gutter={15}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            required
            rules={[
              () => ({
                validator(_, value) {
                  if (PHONE_PATTERN.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Số điện thoại không hợp lệ")
                  );
                },
              }),
            ]}
          >
            <Input placeholder="0987654321" type="string" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="warehouse"
            label="Hàng của bạn về kho"
            rules={[{ required: true, message: "Vui lòng chọn kho." }]}
          >
            <Select options={WAREHOUSES} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="province"
            label="Tỉnh / thành phố"
            rules={[
              { required: true, message: "Vui lòng chọn tỉnh / thành phố." },
            ]}
          >
            <Select
              placeholder="Tỉnh / thành phố"
              options={provinces?.map((item: any) => ({
                label: item.full_name,
                value: item.id,
              }))}
              size="large"
              onChange={(value: string) => {
                if (value) {
                  handleProvinceChange(value);
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="district"
            label="Quận / huyện / thị xã"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn quận / huyện / thị xã.",
              },
            ]}
          >
            <Select
              placeholder="Quận / huyện / thị xã"
              size="large"
              options={districts?.map((item: any) => ({
                label: item.full_name,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="addressDetail"
        label="Địa chỉ chi tiết"
        required
        rules={[{ required: true, message: "Vui lòng điền địa chỉ chi tiết." }]}
      >
        <Input />
      </Form.Item>
      <div className="button-field">
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
        <p className="note">
          Bạn đã có tài khoản? <Link to={ROUTE_URL.LOGIN}>Đăng nhập</Link> tại
          đây
        </p>
      </div>
    </Form>
  );
};
export default SignupForm;
