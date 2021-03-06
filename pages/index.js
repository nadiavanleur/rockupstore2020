import client from "../components/ApolloClient";
import Layout from "../components/Layout";
import ProductsList from "../components/ProductsList";
import Section from "../components/Section";
import PRODUCTS_QUERY from "../graphql/queries/get-products";
import { defaultInitialProps } from "../helpers/defaultInitialProps";

/**
 * Index
 */
const Index = ({
  featuredProducts = [],
  saleProducts = [],
  popularProducts = [],
  menus,
  settings,
}) => {
  const metaImages = [
    ...featuredProducts,
    ...saleProducts,
    ...popularProducts,
  ]?.nodes?.map((product) => product.image.sourceUrl);

  return (
    <Layout menus={menus} settings={settings} metaData={{ images: metaImages }}>
      {/* Featured products */}
      {!!featuredProducts?.length && (
        <div className="o-retain o-retain--wall">
          <Section title="Featured" extraClasses="c-section--secondary">
            <ProductsList
              products={featuredProducts}
              listName="Homepage | Featured"
            />
          </Section>
        </div>
      )}

      {/* Sale products */}
      {!!saleProducts?.length && (
        <div className="o-retain o-retain--wall">
          <Section
            title="Sale"
            extraClasses="c-section--tertiary"
            cta={{ href: "/product-category/sale", label: "View all sale" }}
          >
            <ProductsList products={saleProducts} listName="Homepage | Sale" />
          </Section>
        </div>
      )}

      {/* Popular products */}
      {!!popularProducts?.length && (
        <div className="o-retain o-retain--wall">
          <Section title="Popular" extraClasses="c-section--quinary">
            <ProductsList
              products={popularProducts}
              listName="Homepage | Popular"
            />
          </Section>
        </div>
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

  const settingsProps = await defaultInitialProps();

  return {
    ...settingsProps,
    popularProducts: popularProductsResult?.data?.products?.nodes,
    saleProducts: saleProductsResult?.data?.products?.nodes,
    featuredProducts: featuredProductsResult?.data?.products?.nodes,
  };
};

export default Index;
