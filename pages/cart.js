import client from "../components/ApolloClient";
import Layout from "../components/Layout";
import ProductsList from "../components/ProductsList";
import gql from "graphql-tag";
import Section from "../components/Section";
import CartItems from "../components/cart/CartItems";
import Button from "../components/Button";

const MENU_FRAGMENT = gql`
  fragment MenuFragment on Menu {
    id
    menuItems {
      nodes {
        id
        parentId
        label
        target
        connectedNode {
          node {
            id
            uri
          }
        }
        childItems {
          nodes {
            id
            parentId
            label
            target
            path
            connectedNode {
              node {
                id
                uri
              }
            }
          }
        }
      }
    }
  }
`;

const TOP_MENU_QUERY = gql`
  query TopMenuQuery {
    menu(idType: NAME, id: "Top menu") {
      ...MenuFragment
    }
  }
  ${MENU_FRAGMENT}
`;

const CATEGORIES_MENU_QUERY = gql`
  query CategoriesMenuQuery {
    menu(idType: NAME, id: "Categories") {
      ...MenuFragment
    }
  }
  ${MENU_FRAGMENT}
`;

const FOOTER_MENU_QUERY = gql`
  query FooterMenuQuery {
    menu(idType: NAME, id: "Footer menu") {
      ...MenuFragment
    }
  }
  ${MENU_FRAGMENT}
`;

const USER_MENU_QUERY = gql`
  query UserMenuQuery {
    menu(idType: NAME, id: "User menu") {
      ...MenuFragment
    }
  }
  ${MENU_FRAGMENT}
`;

const SETTINGS_QUERY = gql`
  query SettingsQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
  }
`;

/**
 * Cart
 */
const Cart = ({ menus, settings }) => {
  return (
    <Layout menus={menus} settings={settings}>
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
