import gql from "graphql-tag";

const MENU_FRAGMENT = gql`
  fragment MenuFragment on Menu {
    id
    menuItems {
      nodes {
        id
        parentId
        label
        target
        connectedNode {
          node {
            id
            uri
          }
        }
        childItems {
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
              }
            }
          }
        }
      }
    }
  }
`;

export default MENU_FRAGMENT;
