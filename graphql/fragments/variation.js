import gql from "graphql-tag";

// For reference -> No nesting allowed
const VARIATION_FRAGMENT = gql`
  fragment VariationFragment on Variation {
    id
    variationId
    price
    onSale
    salePrice
    purchasable
    description
    stockQuantity
    backordersAllowed
    attributes {
      nodes {
        id
        name
        value
      }
    }
  }
`;

export default VARIATION_FRAGMENT;
