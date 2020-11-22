import React from "react";
import Product from "./Product";

const ProductsList = ({ products }) => {
  if (products?.length) {
    return (
      <>
        <ul className="o-layout o-layout--gutter-base o-layout--equalheight">
          {products.map(
            ({
              name,
              galleryImages,
              image,
              price,
              onSale,
              regularPrice,
              id,
              slug,
              attributes,
              type,
              featured,
              external,
            }) => (
              <li
                className="o-layout__cell u-fraction--6of12@from-md u-fraction--4of12@from-lg u-margin-bottom-base"
                key={`${id}-${name}`}
              >
                {
                  <Product
                    title={name}
                    image={image}
                    hoverImage={galleryImages?.nodes?.[0]}
                    price={price}
                    onSale={onSale}
                    regularPrice={regularPrice}
                    href="/product/[id]"
                    as={slug && `/product/${slug}`}
                    attributes={attributes}
                    type={type}
                    featured={featured}
                  />
                }
              </li>
            )
          )}
        </ul>
      </>
    );
  } else {
    return <p>No products found</p>;
  }
};

ProductsList.getInitialProps = async () => {
  const result = await client.query({
    query: PRODUCTS_QUERY,
  });

  return { products: result.data.products.nodes };
};

export default ProductsList;
