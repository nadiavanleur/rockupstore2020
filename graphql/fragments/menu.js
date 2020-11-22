import gql from "graphql-tag";

const MENU_FRAGMENT = gql`
  fragment MenuFragment on Menu {
    id
    menuItems(first: 100, where: { parentId: "0" }) {
      nodes {
        id
        parentId
        label
        target
        path
        connectedNode {
          node {
            id
            uri
            ... on ProductCategory {
              slug
            }
          }
        }
        childItems(first: 100) {
          nodes {
            id
            parentId
            label
            target
            path
            connectedNode {
              node {
                id
                uri
                ... on ProductCategory {
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default MENU_FRAGMENT;
