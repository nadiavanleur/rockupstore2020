import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import ProductsList from "../../components/ProductsList";
import Section from "../../components/Section";
import PRODUCTS_QUERY from "../../graphql/queries/get-products";
import { defaultInitialProps } from "../../helpers/defaultInitialProps";

/**
 * SaleProducts
 */
const SaleProducts = ({ saleProducts, menus, settings }) => {
  return (
    <Layout menus={menus} settings={settings} title="Sale">
      <div className="o-retain o-retain--wall">
        <Section title="Sale" extraClasses="c-section--tertiary">
          <ProductsList products={saleProducts} />
        </Section>
      </div>
    </Layout>
  );
};

SaleProducts.getInitialProps = async () => {
  const saleProductsResult = await client.query({
    query: PRODUCTS_QUERY,
    variables: {
      orderby: "DATE",
      onSale: true,
    },
  });

  const settingsProps = await defaultInitialProps();

  return {
    ...settingsProps,
    saleProducts: saleProductsResult?.data?.products?.nodes,
  };
};

export default SaleProducts;
