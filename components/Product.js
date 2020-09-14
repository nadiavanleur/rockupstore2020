import React from "react";
import Card from "./Card";
import Variants from "./Variants";

const Product = ({ image, hoverImage, title, price, url, attributes }) => {
  //   console.dir({ image, hoverImage, title, price, url, attributes });
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
      <Variants attributes={attributes} />
    </Card>
  );
};

export default Product;
