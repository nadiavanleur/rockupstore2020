import gql from "graphql-tag";
import PRODUCT_FRAGMENT from "../fragments/product";

const GET_CART = gql`
  query GET_CART {
    cart {
      contents {
        itemCount
        nodes {
          key
          product {
            ...ProductFragment
          }
          variation {
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
          quantity
          total
          subtotal
          subtotalTax
        }
      }
      appliedCoupons {
        nodes {
          id
          couponId
          discountType
          amount
          dateExpiry
          products {
            nodes {
              id
            }
          }
          productCategories {
            nodes {
              id
            }
          }
        }
      }
      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export default GET_CART;
