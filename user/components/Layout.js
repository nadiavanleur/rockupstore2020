import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Metadata from "./Metadata";

const Layout = ({ children, extraClasses, menus, settings }) => {
  const { topMenu, categoriesMenu, footerMenu } = menus;
  return (
    <>
      <Metadata />
      <Header
        topMenu={topMenu}
        categoriesMenu={categoriesMenu}
        settings={settings}
        categoriesMenu={categoriesMenu}
      />
      <main className={extraClasses}>{children}</main>
      <Footer footerMenu={footerMenu} />
    </>
  );
};

export default Layout;
