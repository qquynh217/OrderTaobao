import { Avatar, Dropdown } from "antd";
import NumberFormat from "components/NumberFormat";
import { FC } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import emptyAva from "resources/images/empty-avatar.png";
import { ROUTE_URL } from "routes";
import { userStore } from "store/userStore";

const HeaderPrivate: FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const { fullname, email, balance, handleLogout } = userStore();
  return (
    <div
      className="header-private"
      style={{ marginLeft: isCollapsed ? 80 : 240 }}
    >
      <div className="header-private_inner">
        <div className="header-left">
          <div className="balance">
            <p>Số dư:</p>
            <NumberFormat value={balance || 0} suffix="đ" />
          </div>
        </div>
        <div className="header-right">
          <p>Tỉ giá: 3695</p>
          <Link to={ROUTE_URL.CART}>Giỏ hàng</Link>
          <Dropdown
            menu={{
              items: [
                {
                  key: "info",
                  label: (
                    <div className="user-menu-item user-info">
                      <Avatar src={emptyAva} alt="" size={44} />
                      <b>{fullname}</b>
                      <p>{email}</p>
                    </div>
                  ),
                },
                {
                  key: ROUTE_URL.PROFILE,
                  label: (
                    <div className="user-menu-item">
                      <FaRegPenToSquare />
                      <NavLink to={ROUTE_URL.PROFILE}>
                        Sửa thông tin cá nhân
                      </NavLink>
                    </div>
                  ),
                },
                {
                  key: "logout",
                  label: (
                    <div className="user-menu-item" onClick={handleLogout}>
                      <TbLogout />
                      <p>Đăng xuất</p>
                    </div>
                  ),
                },
              ],
            }}
            placement="bottomLeft"
            arrow={false}
            trigger={["click"]}
          >
            <div className="header-item user-info">
              <Avatar src={emptyAva} alt="" size={36} />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrivate;
