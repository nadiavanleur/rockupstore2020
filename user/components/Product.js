import React from "react";
import Card from "./Card";
import Variables from "./Variables";

const Product = ({ image, hoverImage, title, price, url, attributes }) => {
  return (
    <Card
      image={image}
      hoverImage={hoverImage}
      title={title}
      tags={[
        { label: price.replace(".00", ".-"), extraClasses: "c-tag--price" },
      ]}
      cta={{ label: "View product", url: url }}
      extraClasses="c-card--link"
    >
      <Variables attributes={attributes} />
    </Card>
  );
};

export default Product;
