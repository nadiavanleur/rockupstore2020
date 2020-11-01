import gql from "graphql-tag";

const PAYMENT_METHODS_QUERY = gql`
  query PaymentMethodsQuery {
    paymentGateways {
      nodes {
        id
        title
        description
      }
    }
  }
`;

export default PAYMENT_METHODS_QUERY;
