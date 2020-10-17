import gql from "graphql-tag";
import VARIABLE_PRODUCT_FRAGMENT from "./variable-product";

const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    productId
    slug
    type
    name
    featured
    onSale
    averageRating
    purchasable
    description
    shortDescription
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
    ...VariableProductFragment
    ... on SimpleProduct {
      id
      price
      salePrice
      stockQuantity
    }
    ... on ExternalProduct {
      id
      price
      salePrice
      externalUrl
    }
    ... on GroupProduct {
      id
      products {
        nodes {
          ...VariableProductFragment
          ... on SimpleProduct {
            id
            price
            salePrice
            stockQuantity
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
