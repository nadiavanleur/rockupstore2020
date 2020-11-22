import gql from "graphql-tag";

const CHECKOUT = gql`
  mutation CHECKOUT($input: CheckoutInput!) {
    checkout(input: $input) {
      clientMutationId
      order {
        id
        orderId
        status
        orderNumber
        date
        total
        paymentMethod
        paymentMethodTitle
        billing {
          email
          firstName
          lastName
        }
        refunds(first: 100) {
          nodes {
            amount
          }
        }
      }
      result
      redirect
    }
  }
`;

export default CHECKOUT;
