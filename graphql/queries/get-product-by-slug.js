import gql from "graphql-tag";
import PRODUCT_FRAGMENT from "../fragments/product";

const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(id: $id, idType: SLUG) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export default PRODUCT_QUERY;
