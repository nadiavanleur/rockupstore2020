import React from "react";
import { gtagImpressions } from "../helpers/gtag";
import Product from "./Product";

const ProductsList = ({ products, listName }) => {
  if (products?.length) {
    gtagImpressions({ products, listName });

    return (
      <>
        <ul className="o-layout o-layout--gutter-base o-layout--equalheight">
          {products.map((product, index) => (
            <li
              className="o-layout__cell u-fraction--6of12@from-md u-fraction--4of12@from-lg u-margin-bottom-base"
              key={`${product.id}-${product.name}`}
            >
              {
                <Product
                  product={product}
                  productIndex={index}
                  listName={listName}
                />
              }
            </li>
          ))}
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
