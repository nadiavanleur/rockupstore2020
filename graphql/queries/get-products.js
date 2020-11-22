import gql from "graphql-tag";
import PRODUCT_FRAGMENT from "../fragments/product";

// where: {
//   status: "publish"
// }
/**
 * $first: Int
 * $after: String
 * $orderby: PRICE / RATING / TOTAL_SALES / DATE
 * $orderbyDirection: ASC / DESC
 * $featured: Boolean
 */
const PRODUCTS_QUERY = gql`
  query ProductsQuery(
    $first: Int = 100
    $after: String
    $orderby: ProductsOrderByEnum!
    $orderbyDirection: OrderEnum
    $category: String
    $featured: Boolean
    $onSale: Boolean
  ) {
    products(
      first: $first
      after: $after
      where: {
        orderby: { field: $orderby, order: $orderbyDirection }
        category: $category
        featured: $featured
        onSale: $onSale
      }
    ) {
      nodes {
        ...ProductFragment
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export default PRODUCTS_QUERY;
