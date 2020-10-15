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
} from "../../graphql/queries/get-menus";
import SETTINGS_QUERY from "../../graphql/queries/get-settings";
import PRODUCT_QUERY from "../../graphql/queries/get-product-by-slug";
import VariationSelect from "../../components/VariationSelect";
import { useState } from "react";

// @TODO: fitfinder

/**
 * ProductPage
 */
const ProductPage = ({ product, menus, settings }) => {
  if (product.type === "GROUP") return null; //@TODO Group product

  const defaultVariation = product.variations && product.variations.nodes[0];
  const [selectedVariation, setSelectedVariation] = useState(defaultVariation);

  const onSale = selectedVariation ? selectedVariation.onSale : product.onSale;
  const salePrice = selectedVariation
    ? selectedVariation.salePrice
    : product.salePrice;
  const price = selectedVariation ? selectedVariation.price : product.price;
  const description = selectedVariation
    ? selectedVariation.description || product.description
    : product.description;

  return (
    <Layout menus={menus} settings={settings} title={product.name}>
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
                      <div key={image.sourceUrl} className="o-flexembed">
                        <img
                          src={image.sourceUrl}
                          srcSet={image.srcSet}
                          alt={image.altText || image.title || ""}
                          className="o-flexembed__item"
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
                onSale ? " c-price--on-sale" : ""
              } u-margin-bottom-small`}
            >
              {salePrice && <div className="c-price__old">{salePrice}</div>}
              {price && <div className="c-price">{price}</div>}
            </div>

            <VariationSelect
              variations={product.variations}
              attributes={product.attributes}
              defaultSelectedVariation={selectedVariation}
              updateSelectedVariation={setSelectedVariation}
            />

            <AddToCard product={product} variation={selectedVariation} />

            {description && <p>{description}</p>}
          </div>
        </div>
      </Section>
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
