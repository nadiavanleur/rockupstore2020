import gql from "graphql-tag";

const SETTINGS_QUERY = gql`
  query SettingsQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
    logo: mediaItemBy(slug: "logo") {
      id
      altText
      srcSet
      sizes
      uri
      title
      sourceUrl
    }
  }
`;

export default SETTINGS_QUERY;
