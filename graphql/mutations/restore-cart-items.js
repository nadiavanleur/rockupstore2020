import gql from "graphql-tag";

const RESTORE_CART_ITEMS = gql`
  mutation($input: RestoreCartItemsInput!) {
    restoreCartItems(input: $input) {
      clientMutationId
    }
  }
`;

export default RESTORE_CART_ITEMS;
