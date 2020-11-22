import gql from "graphql-tag";

const VARIABLE_PRODUCT_FRAGMENT = gql`
  fragment VariableProductFragment on VariableProduct {
    id
    price
    onSale
    salePrice
    regularPrice
    stockQuantity
    backordersAllowed
    variations(first: 100) {
      nodes {
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
    }
  }
`;

export default VARIABLE_PRODUCT_FRAGMENT;
