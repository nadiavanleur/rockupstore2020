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
    topMenu: menus(where: { location: PRIMARY }) {
      nodes {
        ...MenuFragment
      }
    }
    categoriesMenu: menus(where: { location: EXPANDED }) {
      nodes {
        ...MenuFragment
      }
    }
    footerMenu: menus(where: { location: FOOTER }) {
      nodes {
        ...MenuFragment
      }
    }
    userMenu: menus(where: { location: SOCIAL }) {
      nodes {
        ...MenuFragment
      }
    }
  }
  ${MENU_FRAGMENT}
`;

export default GET_INITIAL_DATA_QUERY;
