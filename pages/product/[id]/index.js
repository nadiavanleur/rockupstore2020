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

  if (!product || product?.type === "GROUP")
    return <PageNotFound menus={menus} settings={settings} />; //@TODO Group product

  const defaultVariation =
    product?.variations?.nodes?.[product?.variations?.nodes?.length - 1];
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

  const firstDesigner = product.designers?.nodes?.[0];

  const isBackorder =
    useProduct?.stockQuantity <= 0 && useProduct.backordersAllowed;

  const metaKeywords =
    useProduct.productTags?.nodes?.length &&
    useProduct.productTags.nodes.map((tag) => tag.name)?.join(", ");

  const metaDescription =
    useProduct?.shortDescription || firstDesigner?.description;

  const metaImages = sliderImages?.map((image) => image.sourceUrl);

  return (
    <Layout
      menus={menus}
      settings={settings}
      metaData={{
        title: useProduct.name,
        description: metaDescription,
        keywords: metaKeywords,
        images: metaImages,
      }}
      parent={
        firstDesigner && {
          title: firstDesigner.name,
          url: `/product-category/${firstDesigner.slug}`,
        }
      }
    >
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

              {/* Price */}
              <div
                className={`c-price${
                  useProduct.onSale ? " c-price--on-sale" : ""
                } u-margin-bottom-small`}
              >
                {useProduct.onSale && useProduct.regularPrice && (
                  <>
                    <small>
                      <strike>{useProduct.regularPrice}</strike>
                    </small>
                    &emsp;
                  </>
                )}
                {useProduct.price && <b>{useProduct.price}</b>}
              </div>

              {/* Short description */}
              {useProduct.shortDescription && (
                <div className="u-margin-bottom-small">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: useProduct.shortDescription,
                    }}
                    className="c-editor-content"
                  />
                </div>
              )}

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

              {/* On backorder */}
              {isBackorder && (
                <div className="u-margin-bottom-small">
                  <small>
                    This product is available for{" "}
                    <Link href="/page/[slug]" as="/page/backorder">
                      <a extraClasses="u-cursor--help" target="_blank">
                        backorder
                      </a>
                    </Link>
                    .
                  </small>
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

                {/* Out of stock */}
                {useProduct?.stockQuantity <= 0 && !isBackorder && (
                  <div className="o-layout__cell o-layout__cell--fit">
                    <small>⚠️ Out of stock</small>
                  </div>
                )}
              </div>

              {/* List designers */}
              {firstDesigner && (
                <ul className="o-list-clean u-margin-none u-margin-top-small">
                  {product.designers.nodes.map((designer) => (
                    <li key={designer.name}>
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

      <ProductSchema product={product} images={metaImages} />
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
