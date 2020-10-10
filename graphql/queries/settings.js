import gql from "graphql-tag";

const SETTINGS_QUERY = gql`
  query SettingsQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
  }
`;

export default SETTINGS_QUERY;
