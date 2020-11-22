import gql from "graphql-tag";

const PAYMENT_METHODS_QUERY = gql`
  query PaymentMethodsQuery {
    paymentGateways(first: 100) {
      nodes {
        id
        title
        description
      }
    }
  }
`;

export default PAYMENT_METHODS_QUERY;
