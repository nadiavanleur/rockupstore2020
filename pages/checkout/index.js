import React, { useContext, useState } from "react";
import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import { CartContext } from "../../components/context/CartContext";
import Section from "../../components/Section";
import CartItems from "../../components/cart/CartItems";
import BillingForm from "../../components/checkout/BillingForm";
import { default as CheckoutMutation } from "../../components/mutationButtons/Checkout";
import { defaultInitialProps } from "../../helpers/defaultInitialProps";
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

  const settingsProps = await defaultInitialProps();

  return {
    ...settingsProps,
    paymentMethods: paymentMethodsResult?.data?.paymentGateways.nodes,
  };
};

export default Checkout;
