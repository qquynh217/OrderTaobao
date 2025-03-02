import { Button, Form, Input } from "antd";
import showMessage from "components/Message";
import { USER_ROLE } from "constants";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { userService } from "services/user";
import { userStore } from "store/userStore";
import { getUserByJwtoken } from "utils/jwtdecode";

const LoginForm: FC = () => {
  const { handleUserLogin } = userStore();
  const navigate = useNavigate();
  const handleSubmit = async (value: { email: string; password: string }) => {
    try {
      const res = await userService.login(value);
      const token = res.data.data.result.token;
      const user = getUserByJwtoken(token);

      handleUserLogin(user);
      if (user.role == USER_ROLE["ADMIN"]) {
        navigate(ROUTE_URL.ORDER_ADMIN);
      } else {
        navigate(ROUTE_URL.ORDER_ALL);
      }

      showMessage("success", "Đăng nhập thành công!");
    } catch (error: any) {
      const msg = "Tài khoản hoặc mật khẩu sai!";
      showMessage("error", msg);
    }
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit} className="signup-form">
      <Form.Item
        name="email"
        label="Email"
        required
        // rules={[
        //   () => ({
        //     validator(_, value) {
        //       if (EMAIL_PATTERN.test(value)) {
        //         return Promise.resolve();
        //       }
        //       return Promise.reject(new Error("Vui lòng điền email hợp lệ.  "));
        //     },
        //   }),
        // ]}
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
