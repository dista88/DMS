import React from "react";
import Header from "../Dashboard/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
