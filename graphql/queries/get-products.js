import gql from "graphql-tag";
import PRODUCT_FRAGMENT from "../fragments/product";

const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products {
      nodes {
        ...ProductFragment
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export default PRODUCTS_QUERY;
