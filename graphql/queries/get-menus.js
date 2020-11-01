import gql from "graphql-tag";
import MENU_FRAGMENT from "../fragments/menu";

export const TOP_MENU_QUERY = gql`
  query TopMenuQuery {
    menus(where: { location: PRIMARY }) {
      nodes {
        ...MenuFragment
      }
    }
  }
  ${MENU_FRAGMENT}
`;

export const CATEGORIES_MENU_QUERY = gql`
  query CategoriesMenuQuery {
    menus(where: { location: EXPANDED }) {
      nodes {
        ...MenuFragment
      }
    }
  }
  ${MENU_FRAGMENT}
`;

export const FOOTER_MENU_QUERY = gql`
  query FooterMenuQuery {
    menus(where: { location: FOOTER }) {
      nodes {
        ...MenuFragment
      }
    }
  }
  ${MENU_FRAGMENT}
`;

export const USER_MENU_QUERY = gql`
  query UserMenuQuery {
    menus(where: { location: SOCIAL }) {
      nodes {
        ...MenuFragment
      }
    }
  }
  ${MENU_FRAGMENT}
`;
