import { Layout, Space, Typography } from "antd";
import { FC } from "react";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiBankCardFill } from "react-icons/ri";

const { Footer } = Layout;
const { Text } = Typography;

const FooterPrivate: FC = () => {
  return (
    <Footer className="footer-private">
      <div className="transfer-information">
        <h3>Thông tin chuyển khoản</h3>
        <p>
          Để nạp tiền nhanh khi chuyển khoản ngân hàng, quý khách vui lòng ghi
          nội dung chuyển khoản theo mẫu sau
        </p>
        <Text copyable className="value">
          ntt G5777 abudory147
        </Text>
        Trong đó G5777 là mã khách của quý khách, abudory147 là phần đầu email
        của quý khách
      </div>

      <div className="footer-item">
        <h3>Tài khoản</h3>
        <div className="bank-item">
          <Space>
            <RiBankCardFill />
            <p>Techcombank</p>
          </Space>
          <p>
            STK: <b>0159100008531008</b>
          </p>
          <p>
            Chủ TK: <b>Trinh Minh Hoa</b>
          </p>
        </div>
      </div>

      <div className="footer-item">
        <h3>Liên hệ</h3>
        <div className="contact-item">
          <Space style={{ gap: 5 }}>
            <FaPhone /> <p>Hotline:</p>
          </Space>
          <b>0985.265.385</b>
        </div>
        <div className="contact-item">
          <Space>
            <IoMdMail />
            <p>Email</p>
          </Space>
          <b>cskh.orderthangloi@gmail.com</b>
        </div>
      </div>
    </Footer>
  );
};
export default FooterPrivate;
