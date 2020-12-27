import React from "react";
import { gtagProductClick } from "../helpers/gtag";
import Card from "./Card";
import Variables from "./Variables";

const Product = ({ product, productIndex, listName }) => {
  if (product.type === "GROUP") return null; //@TODO Group product

  const tags = [
    {
      label: product.price?.replaceAll?.(",00", ""),
      extraClasses: "c-tag--price",
    },
  ];

  if (product.onSale && product.regularPrice)
    tags.unshift({
      label: product.regularPrice.replaceAll?.(",00", ""),
      extraClasses: "c-tag--sale",
    });

  if (product.featured)
    tags.unshift({
      label: "✭",
      extraClasses: "c-tag--featured",
    });

  // if (product.type === "EXTERNAL")
  //   tags.unshift({
  //     label: "➤",
  //     extraClasses: "c-tag--external",
  //   });

  return (
    <Card
      image={product.image}
      hoverImage={product.galleryImages?.nodes?.[0]}
      title={product.name}
      tags={tags}
      cta={{
        label: "View product",
        href: "/product/[id]",
        as: product.slug && `/product/${product.slug}`,
        onClick: () =>
          gtagProductClick({ product, index: productIndex, listName }),
      }}
    >
      <Variables attributes={product.attributes} />
    </Card>
  );
};

export default Product;
