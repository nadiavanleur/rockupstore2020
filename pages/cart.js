import client from "../components/ApolloClient";
import Layout from "../components/Layout";
import ProductsList from "../components/ProductsList";
import gql from "graphql-tag";
import Section from "../components/Section";
import CartItems from "../components/cart/CartItems";
import Button from "../components/Button";

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
    <Layout menus={menus} settings={settings} title="Cart">
      <Section title="Cart">
        <CartItems />
      </Section>
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
    settings: settingsResult?.data?.allSettings,
    menus: {
      topMenu: topMenuResult?.data?.menu.menuItems.nodes,
      categoriesMenu: categoriesMenuResult?.data?.menu.menuItems.nodes,
      footerMenu: footerMenuResult?.data?.menu.menuItems.nodes,
      userMenu: userMenuResult?.data?.menu.menuItems.nodes,
    },
  };
};

export default Cart;
