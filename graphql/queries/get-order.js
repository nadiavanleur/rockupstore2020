import gql from "graphql-tag";

const ORDER_QUERY = gql`
  query OrderQuery($id: ID!) {
    order(id: $id, idType: DATABASE_ID) {
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
    }
  }
`;

export default ORDER_QUERY;
