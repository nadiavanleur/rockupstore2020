import gql from "graphql-tag";

const REMOVE_FROM_CART = gql`
  mutation($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      clientMutationId
    }
  }
`;

export default REMOVE_FROM_CART;
