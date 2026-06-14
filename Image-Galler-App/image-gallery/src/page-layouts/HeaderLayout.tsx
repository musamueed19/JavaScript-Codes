import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/header/components";

const HeaderLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;
