import gql from "graphql-tag";
import CATEGORY_FRAGMENT from "../fragments/category";

const CATEGORY_QUERY = gql`
  query CategoryQuery($id: ID!, $parent: Int) {
    productCategory(id: $id, idType: SLUG) {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export default CATEGORY_QUERY;
