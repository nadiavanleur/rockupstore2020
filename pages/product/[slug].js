import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import Section from "../../components/Section";
import gql from "graphql-tag";
import { withRouter } from "next/router";
import Slider from "../../components/Slider";
import AddToCard from "../../components/cart/AddToCart";
import Select from "../../components/inputs/Select";
import {
  TOP_MENU_QUERY,
  CATEGORIES_MENU_QUERY,
  FOOTER_MENU_QUERY,
  USER_MENU_QUERY,
} from "../../graphql/queries/menus";
import SETTINGS_QUERY from "../../graphql/queries/settings";
import PRODUCT_QUERY from "../../graphql/queries/product-by-slug";

/**
 * ProductPage
 */
const ProductPage = ({ product, menus, settings }) => {
  const attributes =
    product.attributes &&
    product.attributes.edges &&
    product.attributes.edges.filter(
      ({ node: attribute }) => attribute.variation
    );
  const variables =
    (attributes && attributes.map(({ node: attribute }) => attribute)) || [];

  // Default selected variables
  let selectedVariables = variables.map((variable) => ({
    name: variable.name,
    value: variable.options[0],
  }));

  // Update selected variables
  const updateSelectedVariables = ({ target }) => {
    const changedVariable = selectedVariables.find(
      (variable) => variable.name === target.name
    );
    changedVariable.value = target.value;
  };

  return (
    <Layout menus={menus} settings={settings}>
      <Section>
        <div className="o-layout o-layout--gutter-base">
          <div className="o-layout__cell o-layout__cell--fill@from-md">
            <Slider>
              {product.image && product.image.sourceUrl && (
                <div>
                  <img
                    src={product.image.sourceUrl}
                    srcSet={product.image.srcSet}
                    alt={product.image.altText || product.image.title || ""}
                  />
                </div>
              )}
              {product.galleryImages &&
                product.galleryImages.edges &&
                product.galleryImages.edges.length &&
                product.galleryImages.edges.map(({ node: image }) => {
                  if (image && image.sourceUrl)
                    return (
                      <div key={image.sourceUrl}>
                        <img
                          src={image.sourceUrl}
                          srcSet={image.srcSet}
                          alt={image.altText || image.title || ""}
                        />
                      </div>
                    );
                })}
            </Slider>
          </div>
          <div className="o-layout__cell o-layout__cell--fill@from-md">
            <h2 className="u-margin-bottom-small">{product.name}</h2>
            <div
              className={`c-price${
                product.onSale ? " c-price--on-sale" : ""
              } u-margin-bottom-small`}
            >
              {product.salePrice && (
                <div className="c-price__old">{product.salePrice}</div>
              )}
              {product.price && <div className="c-price">{product.price}</div>}
            </div>

            {variables &&
              variables.map((variable) => (
                <div
                  className="o-layout o-layout--gutter-base o-layout--align-middle u-margin-bottom-small"
                  key={variable.name}
                >
                  {variable.name && (
                    <div className="o-layout__cell u-fraction--2of12">
                      <label htmlFor={variable.id}>{variable.name}</label>
                    </div>
                  )}
                  <div className="o-layout__cell u-fraction--10of12">
                    <Select
                      id={variable.id}
                      name={variable.name}
                      onChange={updateSelectedVariables}
                      options={variable.options}
                    />
                  </div>
                </div>
              ))}

            <AddToCard product={product} variables={selectedVariables} />
          </div>
        </div>
      </Section>
      Product page
    </Layout>
  );
};

ProductPage.getInitialProps = async (router) => {
  const { slug } = router.query;

  const productResult = await client.query({
    query: PRODUCT_QUERY,
    variables: {
      id: slug,
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
    product: productResult && productResult.data.product,
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

export default withRouter(ProductPage);
