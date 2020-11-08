import { withRouter } from "next/router";
import gql from "graphql-tag";
import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import Section from "../../components/Section";
import Card from "../../components/Card";
import ProductsList from "../../components/ProductsList";
import Select from "../../components/inputs/Select";
import { defaultInitialProps } from "../helpers/defaultInitialProps";
import CATEGORIES_QUERY from "../../graphql/queries/get-categories";

/**
 * CategoryPage
 */
const CategoryPage = ({ categories, menus, settings }) => (
  <Layout menus={menus} settings={settings} title="Categories">
    {/* Categories */}
    <div className="o-retain o-retain--wall">
      <Section title="Categories" extraClasses="c-section--black">
        {!!categories?.length ? (
          <ul className="o-layout o-layout--gutter-base">
            {categories.map((category) => (
              <li className="o-layout__cell u-fraction--6of12 u-fraction--3of12@from-md u-margin-bottom-base">
                <Card
                  image={category?.products?.nodes?.[0]?.image}
                  cta={{
                    href: "/product-category/[slug]",
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

  const settingsProps = await defaultInitialProps();

  return {
    ...settingsProps,
    categories: categoriesResult?.data?.productCategories.nodes,
  };
};

export default withRouter(CategoryPage);
