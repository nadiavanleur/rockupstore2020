import gql from "graphql-tag";

const VARIABLE_PRODUCT_FRAGMENT = gql`
  fragment VariableProductFragment on VariableProduct {
    id
    price
    onSale
    salePrice
    stockQuantity
    backordersAllowed
    variations {
      nodes {
        id
        variationId
        price
        onSale
        salePrice
        purchasable
        description
        stockQuantity
        attributes {
          nodes {
            id
            name
            value
          }
        }
      }
    }
  }
`;

export default VARIABLE_PRODUCT_FRAGMENT;
