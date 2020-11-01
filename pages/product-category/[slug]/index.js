import { withRouter } from "next/router";
import client from "../../../components/ApolloClient";
import Layout from "../../../components/Layout";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import ProductsList from "../../../components/ProductsList";
import Select from "../../../components/inputs/Select";

import {
  TOP_MENU_QUERY,
  CATEGORIES_MENU_QUERY,
  FOOTER_MENU_QUERY,
  USER_MENU_QUERY,
} from "../../../graphql/queries/get-menus";
import SETTINGS_QUERY from "../../../graphql/queries/get-settings";
import CATEGORY_QUERY from "../../../graphql/queries/get-category-by-slug";
import PRODUCTS_QUERY from "../../../graphql/queries/get-products";

/**
 * CategoryPage
 */
const CategoryPage = ({ category, products, sortby, menus, settings }) => (
  <Layout menus={menus} settings={settings} title={category.name}>
    {/* Subcategories */}
    {category?.children?.nodes?.length && (
      <div className="o-retain o-retain--wall">
        <Section title="Subcategories" extraClasses="c-section--black">
          <ul className="o-layout o-layout--gutter-base">
            {category.children.nodes.map((subcategory) => (
              <li className="o-layout__cell u-fraction--6of12 u-fraction--3of12@from-md u-margin-bottom-base">
                <Card
                  image={subcategory?.products?.nodes?.[0]?.image}
                  cta={{
                    href: "/product-category/slug",
                    as: `/product-category/${subcategory.slug}`,
                    label: subcategory.name,
                  }}
                />
              </li>
            ))}
          </ul>
        </Section>
      </div>
    )}

    {/* Products */}
    <div className="o-retain o-retain--wall">
      <Section
        title="Products"
        rightToTitle={
          <Select
            onChange={({ target }) => (location = target.value)}
            defaultSelected={`?sortby=${sortby}`}
            options={[
              {
                value: '?sortby={"orderby":"DATE"}',
                label: "New",
              },
              {
                value: '?sortby={"orderby":"TOTAL_SALES"}',
                label: "Popular",
              },
              {
                value: '?sortby={"orderby":"PRICE","orderbyDirection":"ASC"}',
                label: "Price ascending",
              },
              {
                value: '?sortby={"orderby":"PRICE","orderbyDirection":"DESC"}',
                label: "Price descending",
              },
            ]}
          />
        }
      >
        <ProductsList products={products.nodes} />
      </Section>
    </div>
  </Layout>
);

CategoryPage.getInitialProps = async (router) => {
  const { slug, sortby } = router.query;

  const categoryResult = await client.query({
    query: CATEGORY_QUERY,
    variables: {
      id: slug,
    },
  });

  const orderVars = sortby ? JSON.parse(sortby) : {};
  const productsResult = await client.query({
    query: PRODUCTS_QUERY,
    variables: {
      category: slug,
      orderby: "DATE",
      ...orderVars,
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
    category: categoryResult?.data?.productCategory,
    products: productsResult?.data?.products,
    sortby,
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
