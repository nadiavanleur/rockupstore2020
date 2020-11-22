import gql from "graphql-tag";

// For reference -> No nesting allowed
const VARIATION_FRAGMENT = gql`
  fragment VariationFragment on Variation {
    id
    variationId
    price
    onSale
    salePrice
    regularPrice
    purchasable
    description
    stockQuantity
    backordersAllowed
    attributes(first: 100) {
      nodes {
        id
        name
        value
      }
    }
  }
`;

export default VARIATION_FRAGMENT;
