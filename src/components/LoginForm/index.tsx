import { Button, Form, Input } from "antd";
import showMessage from "components/Message";
import { EMAIL_PATTERN } from "constants";
import { user } from "constants/dumpData";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { userStore } from "store/userStore";

const LoginForm: FC = () => {
  const { handleUserLogin } = userStore();
  const navigate = useNavigate();
  const handleSubmit = (value: { email: string; password: string }) => {
    console.log(value);
    handleUserLogin(user);
    navigate(ROUTE_URL.ORDER_ALL);
    try {
      showMessage("success", "Đăng nhập thành công!");
    } catch (error) {
      showMessage("error", "Đăng nhập không thành công!");
    }
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit} className="signup-form">
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
        ]}
      >
        <Input.Password placeholder="Mật khẩu tối thiểu 6 ký tự" />
      </Form.Item>
      <div className="button-field">
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
        <p className="note">
          Bạn chưa có tài khoản? <Link to={ROUTE_URL.SIGNUP}>Đăng ký</Link> tại
          đây
        </p>
      </div>
    </Form>
  );
};
export default LoginForm;
