import { FC, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "resources/images/logo.png";
import { ROUTE_URL } from "routes";
import { userStore } from "store/userStore";

const HeaderPublic: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { id: userId } = userStore();
  // Hàm theo dõi sự kiện cuộn
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener khi component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`header-public ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <img src={logo} alt="" />
        <span>{import.meta.env.VITE_TITLE}</span>
      </div>
      <div className="nav-bar">
        <div className="nav-item">
          <NavLink to={ROUTE_URL.HOME}>Trang chủ</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to={ROUTE_URL.PRICE}>Biểu phí</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to={ROUTE_URL.INSTRUCTION}>Hướng dẫn</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to={ROUTE_URL.POLICY}>Quy định & Chính sách</NavLink>
        </div>
        {userId ? (
          <>
            <div className="nav-item">
              <NavLink to={ROUTE_URL.ORDER}>Quản lý đơn hàng</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to={ROUTE_URL.CART}>
                <div className="cart">
                  <FaShoppingCart />
                </div>
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="nav-item">
              <NavLink to={ROUTE_URL.ORDER}>Đăng ký</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to={ROUTE_URL.ORDER}>Đăng nhập</NavLink>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderPublic;
