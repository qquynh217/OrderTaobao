import { Col, Row } from "antd";
import type { FC } from "react";
import {
  FaCheckCircle,
  FaSearch,
  FaShippingFast,
  FaShoppingBasket,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoChevronForwardCircle } from "react-icons/io5";
import { RiCurrencyFill } from "react-icons/ri";

const HomePage: FC = () => {
  const steps = [
    {
      icon: <FaUser className="icon" />,
      title: "Đăng ký tài khoản",
    },
    {
      icon: <FaCartShopping className="icon" />,
      title: "Gửi đơn hàng",
    },
    {
      icon: <FaCheckCircle className="icon" />,
      title: "Xác nhận đơn hàng",
    },
    {
      icon: <RiCurrencyFill className="icon" />,
      title: "Đặt cọc tiền hàng",
    },
    {
      icon: <FaShippingFast className="icon" />,
      title: "Nhận hàng nhanh",
    },
  ];
  const services = [
    {
      icon: <FaShoppingBasket className="icon" />,
      title: "Dịch vụ đặt hàng",
      desc: "Những trang web thương mại điện tử hàng đầu Trung Quốc",
    },
    {
      icon: <FaShippingFast className="icon" />,
      title: "Vận chuyển hàng",
      desc: "Hàng về HN chỉ sau 2-5 ngày, về HCM chỉ sau 5-7 ngày sau khi đặt hàng....",
    },
    {
      icon: <FaSearch className="icon" />,
      title: "Tìm nguồn hàng",
      desc: "Những trang web thương mại điện tử hàng đầu Trung Quốc",
    },
    {
      icon: <RiCurrencyFill className="icon" />,
      title: "Thanh toán dễ dàng",
      desc: "Dễ dàng thanh toán các khoản tiền Trung nhanh chóng",
    },
  ];
  return (
    <div className="home-page">
      <div className="banner">
        <h1>Chuyên đặt hàng từ Quảng Châu !</h1>
        <h2>
          Tư vấn, tìm kiếm nguồn hàng và nhập hàng trực tiếp từ các website hàng
          đầu Trung Quốc.
        </h2>
        <h2>Cam kết mức giá tốt nhất cho bạn Bạn cần nhập hàng!</h2>
        <h2>Hãy đến với nhattinorder.com!</h2>
      </div>
      <div className="home-page_inner">
        <div className="order-step">
          {steps.map((item, index) => (
            <>
              <div className="order-step_item">
                {item.icon}
                <p>{item.title}</p>
              </div>
              {index < steps.length - 1 && (
                <IoChevronForwardCircle className="next-icon" />
              )}
            </>
          ))}
        </div>
        <div className="our-services">
          <h2>Dịch vụ từ chúng tôi</h2>
          <p>
            Với hệ thống website chất lượng, uy tín, chúng tôi còn hỗ trợ bạn
            trong tìm kiếm mặt hàng với nhiều mẫu mã và giá cả hợp lí, đồng thời
            vận chuyển nhanh chóng, thanh toán tiện lợi
          </p>
          <Row className="services" gutter={[30, 30]}>
            {services.map((item) => (
              <Col span={12}>
                <div className="service-item">
                  {item.icon}
                  <div className="content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
