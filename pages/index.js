import client from "../components/ApolloClient";
import Layout from "../components/Layout";
import ProductsList from "../components/ProductsList";
import gql from "graphql-tag";
import Section from "../components/Section";
import {
  TOP_MENU_QUERY,
  CATEGORIES_MENU_QUERY,
  FOOTER_MENU_QUERY,
  USER_MENU_QUERY,
} from "../graphql/queries/get-menus";
import SETTINGS_QUERY from "../graphql/queries/get-settings";
import PRODUCTS_QUERY from "../graphql/queries/get-products";

/**
 * Index
 */
const Index = ({
  popularProducts,
  saleProducts,
  featuredProducts,
  menus,
  settings,
}) => {
  return (
    <Layout menus={menus} settings={settings}>
      {/* Popular products */}
      {!!popularProducts?.length && (
        <Section title="Popular" extraClasses="c-section--quinary">
          <ProductsList products={popularProducts} />
        </Section>
      )}

      {/* Sale products */}
      {!!saleProducts?.length && (
        <Section title="Sale" extraClasses="c-section--quinary">
          <ProductsList products={saleProducts} />
        </Section>
      )}

      {/* Featured products */}
      {!!featuredProducts?.length && (
        <Section title="Featured" extraClasses="c-section--quinary">
          <ProductsList products={featuredProducts} />
        </Section>
      )}
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const popularProductsResult = await client.query({
    query: PRODUCTS_QUERY,
    variables: {
      first: 3,
      orderby: "TOTAL_SALES",
    },
  });

  const saleProductsResult = await client.query({
    query: PRODUCTS_QUERY,
    variables: {
      first: 3,
      orderby: "DATE",
      onSale: true,
    },
  });

  const featuredProductsResult = await client.query({
    query: PRODUCTS_QUERY,
    variables: {
      first: 3,
      orderby: "DATE",
      featured: true,
    },
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
    popularProducts: popularProductsResult?.data?.products.nodes,
    saleProducts: saleProductsResult?.data?.products.nodes,
    featuredProducts: featuredProductsResult?.data?.products.nodes,
    settings: settingsResult?.data?.allSettings,
    menus: {
      topMenu: topMenuResult?.data?.menu.menuItems.nodes,
      categoriesMenu: categoriesMenuResult?.data?.menu.menuItems.nodes,
      footerMenu: footerMenuResult?.data?.menu.menuItems.nodes,
      userMenu: userMenuResult?.data?.menu.menuItems.nodes,
    },
  };
};

export default Index;
