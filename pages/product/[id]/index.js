import client from "../../../components/ApolloClient";
import Layout from "../../../components/Layout";
import Section from "../../../components/Section";
import { withRouter } from "next/router";
import Slider from "../../../components/Slider";
import AddToCard from "../../../components/mutationButtons/AddToCart";
import VariationSelect from "../../../components/VariationSelect";
import { useState } from "react";
import Button from "../../../components/Button";
import Link from "next/link";
import { defaultInitialProps } from "../../../helpers/defaultInitialProps";
import PRODUCT_QUERY from "../../../graphql/queries/get-product-by-sku";
import Upsells from "../../../components/Upsells";

/**
 * ProductPage
 */
const ProductPage = ({ product, menus, settings }) => {
  if (product.type === "GROUP") return null; //@TODO Group product
  console.log(product);

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
      !!useProduct.galleryImages.nodes.length &&
      useProduct.galleryImages.nodes),
    ...(useProduct.image ? [useProduct.image] : []),
  ];

  return (
    <Layout menus={menus} settings={settings} title={useProduct.name}>
      <div className="o-retain o-retain--wall">
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

              {!!product?.upsell?.nodes?.length && (
                <Upsells
                  currentProductImage={sliderImages?.[0]}
                  products={product.upsell.nodes}
                />
              )}

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
              <div
                dangerouslySetInnerHTML={{ __html: useProduct.description }}
              />
            )}
          </Section>
        )}
      </div>
    </Layout>
  );
};

ProductPage.getInitialProps = async (router) => {
  const { id } = router.query;

  const productResult = await client.query({
    query: PRODUCT_QUERY,
    variables: {
      id,
    },
  });

  const settingsProps = await defaultInitialProps();

  return {
    ...settingsProps,
    product: productResult?.data?.product,
  };
};

export default withRouter(ProductPage);
