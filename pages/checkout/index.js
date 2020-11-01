import React, { useContext, useState } from "react";
import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import { CartContext } from "../../components/context/CartContext";
import Section from "../../components/Section";
import CartItems from "../../components/cart/CartItems";
import BillingForm from "../../components/checkout/BillingForm";
import { default as CheckoutMutation } from "../../components/mutationButtons/Checkout";
import {
  TOP_MENU_QUERY,
  CATEGORIES_MENU_QUERY,
  FOOTER_MENU_QUERY,
  USER_MENU_QUERY,
} from "../../graphql/queries/get-menus";
import SETTINGS_QUERY from "../../graphql/queries/get-settings";
import PAYMENT_METHODS_QUERY from "../../graphql/queries/get-payment-methods";

/**
 * Checkout
 */
const Checkout = ({ paymentMethods, menus, settings }) => {
  return (
    <Layout menus={menus} settings={settings} title="Checkout">
      <CheckoutContent paymentMethods={paymentMethods} />
    </Layout>
  );
};

const CheckoutContent = ({ paymentMethods, menus, settings }) => {
  const [cart, setCart] = useContext(CartContext);
  const cartEmpty =
    !cart?.contents?.itemCount ||
    !cart?.contents?.nodes?.length ||
    !cart?.cartItems;

  return (
    <>
      {cartEmpty ? (
        <div className="o-retain o-retain--wall">
          <Section title="Checkout">
            <p>Cart is empty</p>
          </Section>
        </div>
      ) : (
        <div className="o-retain o-retain--wall">
          <Section
            title="Checkout"
            extraClasses="u-margin-bottom-base u-padding-bottom-none"
          />
          <div className="o-layout o-layout--gutter-base">
            <div className="o-layout__cell u-fraction--6of12@from-md">
              <Section title="Billing details">
                <CheckoutMutation>
                  {({ input, onSubmit, onChange, checkoutLoading }) => (
                    <BillingForm
                      input={input}
                      onSubmit={onSubmit}
                      onChange={onChange}
                      checkoutLoading={checkoutLoading}
                      paymentMethods={paymentMethods}
                    />
                  )}
                </CheckoutMutation>
              </Section>
            </div>
            <div className="o-layout__cell u-fraction--6of12@from-md">
              <Section title="Your order">
                <CartItems collapsed />
              </Section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Checkout.getInitialProps = async () => {
  const paymentMethodsResult = await client.query({
    query: PAYMENT_METHODS_QUERY,
  });

  const settingsResult = await client.query({
    query: SETTINGS_QUERY,
  });

  const topMenuResult = await client.query({
    query: TOP_MENU_QUERY,
  });

  const categoriesMenuResult = await client.query({
    query: CATEGORIES_MENU_QUERY,
  });

  const footerMenuResult = await client.query({
    query: FOOTER_MENU_QUERY,
  });

  const userMenuResult = await client.query({
    query: USER_MENU_QUERY,
  });

  return {
    paymentMethods: paymentMethodsResult?.data?.paymentGateways.nodes,
    settings: settingsResult?.data?.allSettings,
    menus: {
      topMenu: topMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      categoriesMenu:
        categoriesMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      footerMenu: footerMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      userMenu: userMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
    },
  };
};

export default Checkout;
