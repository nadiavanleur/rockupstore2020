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
    productTags(first: 100) {
      nodes {
        name
      }
    }
    galleryImages(first: 100) {
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
    attributes(first: 100) {
      nodes {
        name
        id
        options
        variation
      }
    }
    upsell(first: 100) {
      nodes {
        id
        productId
        sku
        slug
        name
        galleryImages(first: 100) {
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
    designers: productCategories(first: 100, where: { parent: 44 }) {
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
    extraProductInfo {
      estimateddeliverytime
      googlecategory
    }
    ...VariableProductFragment
    ... on SimpleProduct {
      id
      price
      onSale
      salePrice
      regularPrice
      stockQuantity
      backordersAllowed
    }
    ... on ExternalProduct {
      id
      price
      onSale
      salePrice
      regularPrice
      externalUrl
      buttonText
    }
    ... on GroupProduct {
      id
      products(first: 100, where: { minPrice: 0.01 }) {
        nodes {
          ...VariableProductFragment
          ... on SimpleProduct {
            id
            price
            onSale
            salePrice
            regularPrice
            stockQuantity
            backordersAllowed
          }
          ... on ExternalProduct {
            id
            price
            onSale
            salePrice
            regularPrice
            externalUrl
          }
        }
      }
    }
  }
  ${VARIABLE_PRODUCT_FRAGMENT}
`;

export default PRODUCT_FRAGMENT;
