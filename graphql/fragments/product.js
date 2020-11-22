import gql from "graphql-tag";
import VARIABLE_PRODUCT_FRAGMENT from "./variable-product";

const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    productId
    sku
    slug
    type
    name
    featured
    onSale
    averageRating
    reviewCount
    purchasable
    description
    shortDescription
    productTags {
      nodes {
        name
      }
    }
    galleryImages {
      nodes {
        altText
        srcSet
        sizes
        id
        uri
        title
        sourceUrl
      }
    }
    image {
      altText
      srcSet
      sizes
      id
      uri
      title
      sourceUrl
    }
    attributes {
      nodes {
        name
        id
        options
        variation
      }
    }
    upsell {
      nodes {
        id
        productId
        sku
        slug
        name
        galleryImages {
          nodes {
            altText
            srcSet
            sizes
            id
            uri
            title
            sourceUrl
          }
        }
        image {
          altText
          srcSet
          sizes
          id
          uri
          title
          sourceUrl
        }
      }
    }
    designers: productCategories(where: { parent: 44 }) {
      nodes {
        name
        description
        slug
        image {
          altText
          srcSet
          sizes
          id
          uri
          title
          sourceUrl
        }
      }
    }
    ...VariableProductFragment
    ... on SimpleProduct {
      id
      price
      salePrice
      stockQuantity
      backordersAllowed
    }
    ... on ExternalProduct {
      id
      price
      salePrice
      externalUrl
      buttonText
    }
    ... on GroupProduct {
      id
      products(where: { minPrice: 0.01 }) {
        nodes {
          ...VariableProductFragment
          ... on SimpleProduct {
            id
            price
            salePrice
            stockQuantity
            backordersAllowed
          }
          ... on ExternalProduct {
            id
            price
            salePrice
            externalUrl
          }
        }
      }
    }
  }
  ${VARIABLE_PRODUCT_FRAGMENT}
`;

export default PRODUCT_FRAGMENT;
