import type { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderPublic from "./Header";
import Footer from "./Footer";

const PublicLayout: FC = () => {
  return (
    <div className="public-layout">
      <HeaderPublic />
      <div className="public-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default PublicLayout;
