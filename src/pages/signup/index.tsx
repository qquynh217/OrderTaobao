import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import logo from "resources/images/logo.png";
import { userStore } from "store/userStore";

const SignUp: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id: userId } = userStore();
  if (userId) navigate(ROUTE_URL.ORDER_ALL);
  return (
    <div className="signup">
      <div
        className="logo"
        onClick={() => {
          navigate(ROUTE_URL.HOME);
        }}
      >
        <img src={logo} alt="" />
        <span>{import.meta.env.VITE_TITLE}</span>
      </div>
      <div className="signup-wrapper">
        <h2>{pathname == ROUTE_URL.LOGIN ? "Đăng nhập" : "Đăng ký"}</h2>
        {pathname == ROUTE_URL.LOGIN ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default SignUp;
