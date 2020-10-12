import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Metadata from "./Metadata";
import { AppProvider } from "./context/AppContext";
import { ApolloProvider } from "react-apollo";
import client from "./ApolloClient";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

const Layout = ({ children, extraClasses, menus, settings, title }) => {
  const { topMenu, categoriesMenu, footerMenu } = menus || {};

  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Metadata settings={settings} title={title} />
          <Header
            topMenu={topMenu}
            categoriesMenu={categoriesMenu}
            settings={settings}
            categoriesMenu={categoriesMenu}
          />
          <main className={extraClasses}>{children}</main>
          <Footer footerMenu={footerMenu} />
        </ApolloHooksProvider>
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;
