import React from "react";
import { Navbardef } from "../components/Navbar";
import { DefaultSidebar } from "../components/SideBar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbardef />
      <div className="flex mt-2">
        <div className="w-1/4">
          <DefaultSidebar />
        </div>
        <div className="w-3/4 h-screen bg-white m-5">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
