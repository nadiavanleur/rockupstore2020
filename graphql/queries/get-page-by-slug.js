import gql from "graphql-tag";

const PAGE_QUERY = gql`
  query PageQuery($id: ID!) {
    page(id: $id, idType: URI) {
      title
      content(format: RENDERED)
    }
  }
`;

export default PAGE_QUERY;
