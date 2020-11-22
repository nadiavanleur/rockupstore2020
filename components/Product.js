import React from "react";
import Card from "./Card";
import Variables from "./Variables";

const Product = ({
  image,
  hoverImage,
  title,
  price,
  onSale,
  regularPrice,
  href,
  as,
  attributes,
  type,
  featured,
}) => {
  if (type === "GROUP") return null; //@TODO Group product

  const tags = [
    {
      label: price?.replaceAll?.(",00", ""),
      extraClasses: "c-tag--price",
    },
  ];

  if (onSale && regularPrice)
    tags.unshift({
      label: regularPrice.replaceAll?.(",00", ""),
      extraClasses: "c-tag--sale",
    });

  if (featured)
    tags.unshift({
      label: "✭",
      extraClasses: "c-tag--featured",
    });

  // if (type === "EXTERNAL")
  //   tags.unshift({
  //     label: "➤",
  //     extraClasses: "c-tag--external",
  //   });

  return (
    <Card
      image={image}
      hoverImage={hoverImage}
      title={title}
      tags={tags}
      cta={{ label: "View product", href, as }}
    >
      <Variables attributes={attributes} />
    </Card>
  );
};

export default Product;
