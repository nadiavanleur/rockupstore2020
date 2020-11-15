import React from "react";

const ProductSchema = ({ product, images }) => {
  if (!product) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          image: images,
          description: product.description,
          sku: product.sku,
          brand: (product?.designers?.nodes || []).map((brand) => ({
            "@type": "Brand",
            name: brand.name,
          })),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.averageRating || 5,
            reviewCount: product.reviewCount || 1,
            worstRating: 0,
            bestRating: 5,
          },
          offers: {
            "@type": "Offer",
            url: `https://www.subflow.nl/product/${product.slug}`,
            priceCurrency: "EUR",
            price: product.price,
          },
        }),
      }}
    />
  );
};

ProductSchema.propTypes = {};

export default ProductSchema;
