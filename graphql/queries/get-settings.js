import gql from "graphql-tag";

const SETTINGS_QUERY = gql`
  query SettingsQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
    page(id: "website-info", idType: URI) {
      websiteInfo {
        fieldGroupName
        subtitle
        title
        keywords
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
  }
`;

export default SETTINGS_QUERY;
