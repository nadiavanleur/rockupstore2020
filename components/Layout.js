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
import LocalBusinessSchema from "./schema/LocalBusinessSchema";
import clientConfig from "../client-config";

const Layout = ({
  children,
  extraClasses,
  menus,
  settings,
  parent,
  hideCategoryMenu,
  metaData,
}) => {
  const { topMenu, categoriesMenu, categories, footerMenu } = menus || {};

  return (
    <BillingProvider>
      <FlashMessageProvider>
        <CartProvider>
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
              <Metadata settings={settings} metaData={metaData} />
              {clientConfig.pinterestCode && (
                <noscript>
                  <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    alt=""
                    src={`https://ct.pinterest.com/v3/?event=init&tid=${clientConfig.pinterestCode}&noscript=1`}
                  />
                </noscript>
              )}
              <div className="o-body">
                <FlashMessages />
                {menus && settings && (
                  <Header
                    topMenu={topMenu}
                    hideCategoryMenu={hideCategoryMenu}
                    categoriesMenu={categoriesMenu}
                    categories={categories}
                    settings={settings}
                    title={metaData?.title}
                    parent={parent}
                  />
                )}
                <main className={extraClasses}>{children}</main>
                {footerMenu && <Footer footerMenu={footerMenu} />}
              </div>
              <LocalBusinessSchema settings={settings} />
            </ApolloHooksProvider>
          </ApolloProvider>
        </CartProvider>
      </FlashMessageProvider>
    </BillingProvider>
  );
};

export default Layout;
