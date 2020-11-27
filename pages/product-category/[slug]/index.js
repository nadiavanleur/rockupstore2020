import { withRouter } from "next/router";
import client from "../../../components/ApolloClient";
import Layout from "../../../components/Layout";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import ProductsList from "../../../components/ProductsList";
import Select from "../../../components/inputs/Select";
import { defaultInitialProps } from "../../../helpers/defaultInitialProps";
import CATEGORY_QUERY from "../../../graphql/queries/get-category-by-slug";
import PRODUCTS_QUERY from "../../../graphql/queries/get-products";
import Designer from "../../../components/Designer";

/**
 * CategoryPage
 */
const CategoryPage = ({ category, products = [], sortby, menus, settings }) => {
  const isDesignerOverview = category?.databaseId === 44;
  const isDesigner = category?.parentDatabaseId === 44;
  const metaImages = [
    category?.image?.sourceUrl,
    ...products?.nodes?.map((product) => product?.image?.sourceUrl),
  ];

  return (
    <Layout
      menus={menus}
      settings={settings}
      metaData={{
        title: category.name,
        description: category.description,
        images: metaImages,
      }}
      parent={{
        title: category?.parent?.node?.name,
        url: `/product-category/${category?.parent?.node?.slug}`,
      }}
    >
      {/* About category */}
      {category.description && (
        <div className="o-retain o-retain--wall">
          <Section>
            <Designer designer={category} />
          </Section>
        </div>
      )}

      {/* Subcategories */}
      {!!category?.children?.nodes?.length && (
        <div className="o-retain o-retain--wall">
          <Section
            title={isDesignerOverview ? "Designers" : "Subcategories"}
            extraClasses="c-section--black"
          >
            <ul className="o-layout o-layout--gutter-base o-layout--equalheight">
              {category.children.nodes.map((subcategory) => (
                <li
                  className="o-layout__cell u-fraction--3of12@from-md u-fraction--2of12@from-lg u-margin-bottom-small@until-md u-margin-bottom-base@from-md"
                  key={subcategory.slug}
                >
                  <Card
                    image={
                      subcategory?.image ||
                      subcategory?.products?.nodes?.[0]?.image
                    }
                    cta={{
                      href: "/product-category/slug",
                      as: `/product-category/${subcategory.slug}`,
                      label: subcategory.name,
                    }}
                    extraClasses="c-card--mobile"
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
          title={isDesignerOverview ? "Designer products" : category.name}
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
                  value:
                    '?sortby={"orderby":"PRICE","orderbyDirection":"DESC"}',
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
};

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

  const settingsProps = await defaultInitialProps();

  return {
    ...settingsProps,
    category: categoryResult?.data?.productCategory,
    products: productsResult?.data?.products,
    sortby,
  };
};

export default withRouter(CategoryPage);
