import { Col, Row } from "antd";
import { FC } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { NavLink } from "react-router-dom";
import logo from "resources/images/logo.png";
import { ROUTE_URL } from "routes";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Row gutter={30}>
          <Col span={10}>
            <div className="logo">
              <img src={logo} alt="" />
              <span>{import.meta.env.VITE_TITLE}</span>
            </div>
            <p>
              Hệ thống website chất lượng, uy tín, hỗ trợ tìm kiếm mặt hàng với
              nhiều mẫu mã và giá cả hợp lí, đồng thời vận chuyển nhanh chóng,
              thanh toán tiện lợi
            </p>
            <div className="contact">
              <IoMdMail fontSize={18} />
              <p>cskh.orderthangloi@gmail.com</p>
            </div>
          </Col>
          <Col span={2} />
          <Col span={5}>
            <h2>Về chúng tôi</h2>
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
            </div>
          </Col>
          <Col span={7}>
            <h2>Văn phòng Hà Nội</h2>
            <div className="contact">
              <FaPhoneAlt />
              <p>0985.265.385</p>
            </div>
            <div className="contact">
              <FaMapMarkerAlt />
              <p>168 Trung Kính - Cầu Giấy - Hà Nội</p>
            </div>
            <h2 style={{ marginTop: 25 }}>Văn phòng Hồ Chí Minh</h2>
            <div className="contact">
              <FaPhoneAlt />
              <p>0985.265.385</p>
            </div>
            <div className="contact">
              <FaMapMarkerAlt />
              <p>Số 9 Phan Văn Hớn, phường Tân Thới nhất, quận 12 ,TP HCM</p>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};
export default Footer;
