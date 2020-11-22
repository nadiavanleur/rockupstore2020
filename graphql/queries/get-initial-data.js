import gql from "graphql-tag";
import MENU_FRAGMENT from "../fragments/menu";

const GET_INITIAL_DATA_QUERY = gql`
  query InitialDataQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
    page(id: "website-info", idType: URI) {
      websiteInfo {
        fieldGroupName
        subtitle
        title
        logo {
          id
          altText
          srcSet
          sizes
          uri
          title
          sourceUrl
        }
      }
    }
    topMenu: menus(first: 1, where: { location: PRIMARY }) {
      nodes {
        ...MenuFragment
      }
    }
    categoriesMenu: menus(first: 1, where: { location: EXPANDED }) {
      nodes {
        ...MenuFragment
      }
    }
    footerMenu: menus(first: 1, where: { location: FOOTER }) {
      nodes {
        ...MenuFragment
      }
    }
    userMenu: menus(first: 1, where: { location: SOCIAL }) {
      nodes {
        ...MenuFragment
      }
    }
    productCategories(where: { parent: 0, hideEmpty: true }) {
      nodes {
        id
        name
        slug
        uri
        children(where: { hideEmpty: false }) {
          nodes {
            id
            name
            slug
            uri
          }
        }
      }
    }
  }
  ${MENU_FRAGMENT}
`;

export default GET_INITIAL_DATA_QUERY;
