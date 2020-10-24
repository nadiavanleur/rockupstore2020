import gql from "graphql-tag";

const UPDATE_ITEM_QUANTITY = gql`
  mutation($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      clientMutationId
    }
  }
`;

export default UPDATE_ITEM_QUANTITY;
