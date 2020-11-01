import gql from "graphql-tag";
import PRODUCT_FRAGMENT from "./product";

const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on ProductCategory {
    id
    name
    slug
    uri
    description
    count
    products {
      nodes {
        ...ProductFragment
      }
    }
    children {
      nodes {
        id
        name
        slug
        uri
        description
        count
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
