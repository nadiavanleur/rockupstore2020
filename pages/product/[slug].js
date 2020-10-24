import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import Section from "../../components/Section";
import gql from "graphql-tag";
import { withRouter } from "next/router";
import Slider from "../../components/Slider";
import AddToCard from "../../components/mutationButtons/AddToCart";
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
import FlashMessage from "../../components/Flashmessage";
import Button from "../../components/Button";

// @TODO: fitfinder

/**
 * ProductPage
 */
const ProductPage = ({ product, menus, settings }) => {
  if (product.type === "GROUP") return null; //@TODO Group product

  const defaultVariation = product?.variations?.nodes[0];
  const [selectedVariation, setSelectedVariation] = useState(defaultVariation);

  const hasVariations = !!product?.variations?.nodes?.length;

  const itemNotAvailable = hasVariations
    ? !selectedVariation?.variationId || !selectedVariation?.purchasable
    : !product.purchasable;

  let useProduct = { ...product };
  if (selectedVariation)
    Object.keys(selectedVariation).forEach(
      (key) => (useProduct[key] = selectedVariation[key] || useProduct[key])
    );

  const sliderImages = [
    ...(useProduct.galleryImages &&
      useProduct.galleryImages.nodes &&
      useProduct.galleryImages.nodes.length &&
      useProduct.galleryImages.nodes),
    ...(useProduct.image ? [useProduct.image] : []),
  ];

  return (
    <Layout menus={menus} settings={settings} title={useProduct.name}>
      <Section>
        <div className="o-layout o-layout--gutter-base">
          <div className="o-layout__cell o-layout__cell--fill@from-md">
            <Slider extraClasses="c-slider--product">
              {sliderImages.map((image) => {
                if (image?.sourceUrl)
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
            <h2 className="u-margin-bottom-small">{useProduct.name}</h2>
            {useProduct.shortDescription && (
              <div className="u-margin-bottom-small">
                <small
                  dangerouslySetInnerHTML={{
                    __html: useProduct.shortDescription,
                  }}
                />
              </div>
            )}
            <div
              className={`c-price${
                useProduct.onSale ? " c-price--on-sale" : ""
              } u-margin-bottom-small`}
            >
              {useProduct.salePrice && (
                <div className="c-price__old">{useProduct.salePrice}</div>
              )}
              {useProduct.price && (
                <div className="c-price">{useProduct.price}</div>
              )}
            </div>

            <VariationSelect
              variations={product.variations}
              attributes={product.attributes}
              defaultSelectedVariation={selectedVariation}
              updateSelectedVariation={setSelectedVariation}
            />

            <AddToCard product={product} variation={selectedVariation}>
              {({ addToCart, addToCartLoading }) => (
                <Button
                  label="Add to cart"
                  onClick={addToCart}
                  disabled={itemNotAvailable || addToCartLoading}
                  extraClasses="c-button--fill"
                />
              )}
            </AddToCard>
          </div>
        </div>
      </Section>
      {useProduct.description && (
        <Section>
          {useProduct.description && (
            <div dangerouslySetInnerHTML={{ __html: useProduct.description }} />
          )}
        </Section>
      )}
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
    product: productResult?.data?.product,
    settings: settingsResult?.data?.allSettings,
    menus: {
      topMenu: topMenuResult?.data?.menu.menuItems.nodes,
      categoriesMenu: categoriesMenuResult?.data?.menu.menuItems.nodes,
      footerMenu: footerMenuResult?.data?.menu.menuItems.nodes,
      userMenu: userMenuResult?.data?.menu.menuItems.nodes,
    },
  };
};

export default withRouter(ProductPage);
