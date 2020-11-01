import { withRouter } from "next/router";
import gql from "graphql-tag";
import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import Section from "../../components/Section";
import Card from "../../components/Card";
import ProductsList from "../../components/ProductsList";
import Select from "../../components/inputs/Select";

import {
  TOP_MENU_QUERY,
  CATEGORIES_MENU_QUERY,
  FOOTER_MENU_QUERY,
  USER_MENU_QUERY,
} from "../../graphql/queries/get-menus";
import SETTINGS_QUERY from "../../graphql/queries/get-settings";
import CATEGORIES_QUERY from "../../graphql/queries/get-categories";

/**
 * CategoryPage
 */
const CategoryPage = ({ categories, menus, settings }) => (
  <Layout menus={menus} settings={settings} title="Categories">
    {/* Categories */}
    <div className="o-retain o-retain--wall">
      <Section title="Categories" extraClasses="c-section--black">
        {categories?.length ? (
          <ul className="o-layout o-layout--gutter-base">
            {categories.map((category) => (
              <li className="o-layout__cell u-fraction--6of12 u-fraction--3of12@from-md u-margin-bottom-base">
                <Card
                  image={category?.products?.nodes?.[0]?.image}
                  cta={{
                    href: "/product-category/slug",
                    as: `/product-category/${category.slug}`,
                    label: category.name,
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found</p>
        )}
      </Section>
    </div>
  </Layout>
);

CategoryPage.getInitialProps = async (router) => {
  const { slug, sortby } = router.query;

  const categoriesResult = await client.query({
    query: CATEGORIES_QUERY,
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
    categories: categoriesResult?.data?.productCategories.nodes,
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

export default withRouter(CategoryPage);
