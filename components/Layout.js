import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Metadata from "./Metadata";
import { CartProvider } from "./context/CartContext";
import { FlashMessageProvider } from "./context/FlashMessageContext";
import { BillingProvider } from "./context/BillingContext";
import { ApolloProvider } from "react-apollo";
import client from "./ApolloClient";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import FlashMessages from "./FlashMessages";

const Layout = ({ children, extraClasses, menus, settings, title }) => {
  const { topMenu, categoriesMenu, footerMenu } = menus || {};

  return (
    <BillingProvider>
      <FlashMessageProvider>
        <CartProvider>
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
              <Metadata settings={settings} title={title} />
              <FlashMessages />
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
        </CartProvider>
      </FlashMessageProvider>
    </BillingProvider>
  );
};

export default Layout;
