import client from "../../../components/ApolloClient";
import Layout from "../../../components/Layout";
import Section from "../../../components/Section";
import { withRouter } from "next/router";
import Slider from "../../../components/Slider";
import AddToCard from "../../../components/mutationButtons/AddToCart";
import VariationSelect from "../../../components/VariationSelect";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Link from "next/link";
import { defaultInitialProps } from "../../../helpers/defaultInitialProps";
import PRODUCT_QUERY from "../../../graphql/queries/get-product-by-slug";
import Upsells from "../../../components/Upsells";
import Designer from "../../../components/Designer";

/**
 * ProductPage
 */
const ProductPage = ({
  product,
  menus,
  settings,
  // authToken,
}) => {
  // Login user
  // useEffect(() => {
  //   console.log(authToken);
  //   if (authToken) {
  //     localStorage.setItem("authToken", authToken);
  //   }
  // }, []);

  if (!product)
    return (
      <Layout menus={menus} settings={settings} title="Product not found">
        <div className="o-retain o-retain--wall">
          <Section>Product not found</Section>
        </div>
      </Layout>
    );

  console.dir(product);

  if (product?.type === "GROUP") return null; //@TODO Group product

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
    ...(useProduct?.galleryImages?.nodes || []),
    ...(useProduct.image ? [useProduct.image] : []),
  ];

  return (
    <Layout menus={menus} settings={settings} title={useProduct.name}>
      <div className="o-retain o-retain--wall">
        <Section>
          <div className="o-layout o-layout--gutter-base">
            <div className="o-layout__cell o-layout__cell--fill@from-md">
              {/* Image slider */}
              <Slider extraClasses="c-slider--product">
                {sliderImages?.map((image) => {
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
              {/* Product name */}
              <h2 className="u-margin-bottom-small">{useProduct.name}</h2>

              {/* Short description */}
              {useProduct.shortDescription && (
                <div className="u-margin-bottom-small">
                  <small
                    dangerouslySetInnerHTML={{
                      __html: useProduct.shortDescription,
                    }}
                  />
                </div>
              )}

              {/* Price */}
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

              {/* Select variation */}
              <VariationSelect
                variations={product.variations}
                attributes={product.attributes}
                defaultSelectedVariation={selectedVariation}
                updateSelectedVariation={setSelectedVariation}
              />

              {/* Similar products */}
              {!!product?.upsell?.nodes?.length && (
                <Upsells
                  currentProductImage={sliderImages?.[0]}
                  products={product.upsell.nodes}
                />
              )}

              {/* Product button */}
              {product.type === "EXTERNAL" ? (
                // Go to product
                <a
                  target="_blank"
                  href={product.externalUrl}
                  disabled={!product.externalUrl}
                  className="c-button c-button--fill"
                >
                  {product.buttonText || "View on designers' website"}
                </a>
              ) : (
                // Add to cart
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
              )}
              {/* List designers */}
              {!!product.designer?.designer?.length && (
                <ul className="o-list-clean u-margin-none u-margin-top-base">
                  {product.designer.designer.map((designer) => (
                    <li className={designer.name}>
                      <Designer designer={designer} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Section>

        {useProduct.description && (
          <Section>
            {/* Product description */}
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

  const settingsProps = await defaultInitialProps();

  const productResult = await client.query({
    query: PRODUCT_QUERY,
    variables: {
      id,
    },
  });

  return {
    ...settingsProps,
    product: productResult?.data?.product,
    users: productResult?.data?.users,
    viewer: productResult?.data?.viewer,
  };
};

export default withRouter(ProductPage);
