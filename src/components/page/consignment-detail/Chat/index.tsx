import { Card, Input } from "antd";
import { FaTelegramPlane } from "react-icons/fa";

const ConsignmentChat = () => {
  return (
    <div className="consignment-chat">
      <Card title="Chat với chúng tôi" bordered>
        <div className="consignment-chat-frame">
          <div className="empty-message">
            <i>Liên hệ hỗ trợ đơn hàng!</i>
          </div>
        </div>
        <Input.Search size="large" placeholder="Nhập nội dung" enterButton={<FaTelegramPlane />} />
      </Card>
    </div>
  )
}

export default ConsignmentChat