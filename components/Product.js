import React from "react";
import Card from "./Card";
import Variables from "./Variables";

const Product = ({ image, hoverImage, title, price, href, as, attributes }) => {
  return (
    <Card
      image={image}
      hoverImage={hoverImage}
      title={title}
      tags={[
        { label: price.replace(".00", ".-"), extraClasses: "c-tag--price" },
      ]}
      cta={{ label: "View product", href, as }}
      extraClasses="c-card--link"
    >
      <Variables attributes={attributes} />
    </Card>
  );
};

export default Product;
