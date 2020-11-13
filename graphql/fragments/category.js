import gql from "graphql-tag";
import PRODUCT_FRAGMENT from "./product";

const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on ProductCategory {
    id
    databaseId
    name
    slug
    uri
    description
    count
    parentDatabaseId
    parent {
      node {
        name
        slug
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
    products(where: { minPrice: 0.01 }) {
      nodes {
        ...ProductFragment
      }
    }
    children(where: { hideEmpty: true, parent: $parent }) {
      nodes {
        id
        name
        slug
        uri
        description
        count
        image {
          altText
          srcSet
          sizes
          id
          uri
          title
          sourceUrl
        }
        products(first: 1) {
          nodes {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export default CATEGORY_FRAGMENT;
