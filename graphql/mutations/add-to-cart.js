import gql from "graphql-tag";

const ADD_TO_CART = gql`
  mutation($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItem {
        key
        product {
          id
          productId
          name
          description
          type
          onSale
          slug
          averageRating
          reviewCount
          image {
            id
            sourceUrl
            altText
          }
          galleryImages(first: 100) {
            nodes {
              id
              sourceUrl
              altText
            }
          }
        }
        variation {
          id
          variationId
          name
          description
          type
          price
          onSale
          salePrice
          regularPrice
          image {
            id
            sourceUrl
            altText
          }
          attributes(first: 100) {
            nodes {
              id
              attributeId
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
  }
`;

export default ADD_TO_CART;
