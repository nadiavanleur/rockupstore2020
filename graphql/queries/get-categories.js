import gql from "graphql-tag";
import CATEGORY_FRAGMENT from "../fragments/category";

const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    productCategories(where: { hideEmpty: true }) {
      nodes {
        ...CategoryFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export default CATEGORIES_QUERY;
