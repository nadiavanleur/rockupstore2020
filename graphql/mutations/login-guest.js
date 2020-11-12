import gql from "graphql-tag";

const LOGIN_GUEST = gql`
  mutation {
    login(
      input: {
        clientMutationId: "login-guest"
        username: "guest"
        password: "guest"
      }
    ) {
      authToken
      refreshToken
    }
  }
`;

export default LOGIN_GUEST;
