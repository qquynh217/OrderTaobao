import { Avatar, Dropdown } from "antd";
import NumberFormat from "components/NumberFormat";
import { USER_ROLE } from "constants";
import { FC, useMemo } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import emptyAva from "resources/images/empty-avatar.png";
import { ROUTE_URL } from "routes";
import { configStore } from "store/configStore";
import { userStore } from "store/userStore";

const HeaderPrivate: FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const { name, email, balance, handleLogout, role } = userStore();
  const { exchange_rate } = configStore();

  const items = useMemo(() => [
    {
      key: "info",
      label: (
        <div className="user-menu-item user-info">
          <Avatar src={emptyAva} alt="" size={44} />
          <b>{name}</b>
          <p>{email}</p>
        </div>
      ),
      role: [USER_ROLE.USER, USER_ROLE.ADMIN],
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
      role: [USER_ROLE.USER],
    },
    {
      key: "logout",
      label: (
        <div className="user-menu-item" onClick={handleLogout}>
          <TbLogout />
          <p>Đăng xuất</p>
        </div>
      ),
      role: [USER_ROLE.USER, USER_ROLE.ADMIN],
    },
  ].filter((item) => item.role.includes(role)),[role])

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
          <p>Tỉ giá: {exchange_rate}</p>
          {/* <Link to={ROUTE_URL.CART}>Giỏ hàng</Link> */}
          <Dropdown
            menu={{
              items: items,
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
