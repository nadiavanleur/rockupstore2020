import gql from "graphql-tag";
import PRODUCT_FRAGMENT from "../fragments/product";

const GET_CART = gql`
  query GET_CART {
    cart {
      contents(first: 100) {
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
          quantity
          total
          subtotal
          subtotalTax
        }
      }
      appliedCoupons(first: 100) {
        nodes {
          id
          couponId
          discountType
          amount
          dateExpiry
          products(first: 100) {
            nodes {
              id
            }
          }
          productCategories(first: 100) {
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
