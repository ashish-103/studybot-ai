import React, { Children } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layouts = ({ children }) => {
  return (
    <>
      <div className="flex">
        <div className="lg:w-[20%]">
          <Sidebar />
        </div>
        <div className="lg:w-[80%]">
          <Header />
          <div className="p-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layouts;
