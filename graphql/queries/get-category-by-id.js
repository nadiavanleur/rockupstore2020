import gql from "graphql-tag";
import CATEGORY_FRAGMENT from "../fragments/category";

const CATEGORY_QUERY_BY_ID = gql`
  query CategoryQuery($id: ID!) {
    productCategory(id: $id, idType: DATABASE_ID) {
      ...CategoryFragment
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export default CATEGORY_QUERY_BY_ID;
