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
import PageNotFound from "../../../components/PageNotFound";
import ProductSchema from "../../../components/schema/ProductSchema";

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

  console.dir(product);

  if (!product || product?.type === "GROUP")
    return <PageNotFound menus={menus} settings={settings} />; //@TODO Group product

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
                    className="c-editor-content"
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
                <div className="u-margin-bottom-small">
                  <Upsells
                    currentProductImage={sliderImages?.[0]}
                    products={product.upsell.nodes}
                  />
                </div>
              )}

              <div className="o-layout o-layout--gutter-small o-layout--align-middle">
                {/* Product button */}
                <div className="o-layout__cell o-layout__cell--fill">
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
                </div>

                {/* On backorder */}
                {useProduct?.stockQuantity <= 0 && (
                  <div className="o-layout__cell o-layout__cell--fit">
                    <small>
                      {"⚠️ "}
                      {useProduct.backordersAllowed ? (
                        <Link href="/page/[slug]" as="/page/backorder">
                          <a extraClasses="u-cursor--help" target="_blank">
                            Backorder
                          </a>
                        </Link>
                      ) : (
                        <span className="u-text-error">Out of stock</span>
                      )}
                    </small>
                  </div>
                )}
              </div>

              {/* List designers */}
              {!!product.designers?.nodes?.length && (
                <ul className="o-list-clean u-margin-none u-margin-top-small">
                  {product.designers.nodes.map((designer) => (
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
                className="c-editor-content"
              />
            )}
          </Section>
        )}
      </div>

      <ProductSchema product={product} images={sliderImages} />
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
