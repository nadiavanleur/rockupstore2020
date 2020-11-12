import gql from "graphql-tag";
import CATEGORY_FRAGMENT from "../fragments/category";

// Get top level categories
const CATEGORIES_QUERY = gql`
  query CategoriesQuery($parent: Int) {
    productCategories(where: { hideEmpty: true, parent: 0 }) {
      nodes {
        ...CategoryFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export default CATEGORIES_QUERY;
