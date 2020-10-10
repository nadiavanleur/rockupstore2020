import client from "../components/ApolloClient";
import Layout from "../components/Layout";
import gql from "graphql-tag";
import Section from "../components/Section";
import CartItems from "../components/cart/CartItems";
import BillingForm from "../components/checkout/BillingForm";
import {
  TOP_MENU_QUERY,
  CATEGORIES_MENU_QUERY,
  FOOTER_MENU_QUERY,
  USER_MENU_QUERY,
} from "../graphql/queries/get-menus";
import SETTINGS_QUERY from "../graphql/queries/get-settings";

/**
 * Cart
 */
const Cart = ({ menus, settings }) => {
  return (
    <Layout menus={menus} settings={settings} title="Checkout">
      <Section
        title="Checkout"
        extraClasses="u-margin-bottom-base u-padding-bottom-none"
      />
      <div className="o-retain o-retain--wall">
        <div className="o-layout o-layout--gutter-base">
          <div className="o-layout__cell u-fraction--6of12@from-md">
            <Section
              title="Billing details"
              extraContainerClasses="o-retain--no-padding"
            >
              <BillingForm />
            </Section>
          </div>
          <div className="o-layout__cell u-fraction--6of12@from-md">
            <Section
              title="Your order"
              extraContainerClasses="o-retain--no-padding"
            >
              <CartItems collapsed />
            </Section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Cart.getInitialProps = async () => {
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
    settings: settingsResult && settingsResult.data.allSettings,
    menus: {
      topMenu: topMenuResult && topMenuResult.data.menu.menuItems.nodes,
      categoriesMenu:
        categoriesMenuResult && categoriesMenuResult.data.menu.menuItems.nodes,
      footerMenu:
        footerMenuResult && footerMenuResult.data.menu.menuItems.nodes,
      userMenu: userMenuResult && userMenuResult.data.menu.menuItems.nodes,
    },
  };
};

export default Cart;
