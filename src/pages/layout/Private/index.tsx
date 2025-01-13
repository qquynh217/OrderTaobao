import { Layout, Menu, theme, Typography } from "antd";
import { USER_STORAGE } from "constants/index";
import { FC, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_URL, sidebarItems } from "routes";
import { userStore } from "store/userStore";
import FooterPrivate from "./Footer";
import HeaderPrivate from "./Header";

const { Text } = Typography;

const { Content, Sider } = Layout;

const PriveLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role, email } = userStore();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const userLocal = localStorage.getItem(USER_STORAGE) || "{}";
    const user = JSON.parse(userLocal).state;

    if (!user?.token) navigate(ROUTE_URL.HOME);
    else {
      navigate(location.pathname || ROUTE_URL.ORDER);
    }
  }, [token]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider className="private-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={240}
      >
        <div className={`sider-header ${collapsed ? "collapsed" : ""}`}>
          {!collapsed && (
            <Text className="email" ellipsis={{ tooltip: email }}>
              {email}
            </Text>
          )}
          <div
            className="collapsed-icon"
            onClick={() => {
              setCollapsed((prev) => !prev);
            }}
          >
            <FaBars />
          </div>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          onClick={(e) => navigate(e.key)}
          defaultOpenKeys={[ROUTE_URL.ORDER]}
          items={sidebarItems.filter((item) => item.role.includes(role))}
          selectedKeys={
            location.pathname + location.search
              ? [location.pathname + location.search]
              : []
          }
        />
      </Sider>
      <Layout
        style={{ marginLeft: collapsed ? 80 : 240 }}
        className="ant-layout-content"
      >
        <HeaderPrivate isCollapsed={collapsed} />
        <Content style={{ overflow: "initial" }}>
          <div
            className="private-layout-content"
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <FooterPrivate />
      </Layout>
    </Layout>
  );
};
export default PriveLayout;
