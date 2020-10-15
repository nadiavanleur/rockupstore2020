import gql from "graphql-tag";

const EMPTY_CART = gql`
  mutation($input: EmptyCartInput!) {
    emptyCart(input: $input) {
      clientMutationId
    }
  }
`;

export default EMPTY_CART;
