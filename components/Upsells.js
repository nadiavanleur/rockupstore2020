import Link from "next/link";
import React from "react";

const Upsells = ({ currentProductImage, products }) => {
  return (
    <ul className="o-layout o-layout--gutter-tiny">
      {currentProductImage && (
        <li
          className="o-layout__cell o-layout__cell--fit"
          key={currentProductImage.sourceUrl}
        >
          <img
            src={currentProductImage.sourceUrl}
            srcSet={currentProductImage.srcSet}
            alt={currentProductImage.altText || currentProductImage.title || ""}
            width="50"
            height="50"
            className="u-border-small"
          />
        </li>
      )}

      {products.map((product) => {
        const image = product.galleryImages?.nodes?.[0] || product.image;

        return (
          <li className="o-layout__cell o-layout__cell--fit" key={product.slug}>
            <Link href="/product/[id]" as={`/product/${product.slug}`}>
              <a>
                <img
                  src={image.sourceUrl}
                  srcSet={image.srcSet}
                  alt={image.altText || image.title || ""}
                  width="50"
                  height="50"
                  className="u-border-small-white"
                />
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Upsells;
