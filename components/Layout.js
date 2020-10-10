import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Metadata from "./Metadata";
import { AppProvider } from "./context/AppContext";

const Layout = ({ children, extraClasses, menus, settings, title }) => {
  const { topMenu, categoriesMenu, footerMenu } = menus || {};
  return (
    <AppProvider>
      <Metadata settings={settings} title={title} />
      <Header
        topMenu={topMenu}
        categoriesMenu={categoriesMenu}
        settings={settings}
        categoriesMenu={categoriesMenu}
      />
      <main className={extraClasses}>{children}</main>
      <Footer footerMenu={footerMenu} />
    </AppProvider>
  );
};

export default Layout;
