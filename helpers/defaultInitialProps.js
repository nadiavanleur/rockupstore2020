import client from "../components/ApolloClient";
import {
  TOP_MENU_QUERY,
  CATEGORIES_MENU_QUERY,
  FOOTER_MENU_QUERY,
  USER_MENU_QUERY,
} from "../graphql/queries/get-menus";
import SETTINGS_QUERY from "../graphql/queries/get-settings";
// import LOGIN_GUEST from "../graphql/mutations/login-guest";

export const defaultInitialProps = async () => {
  // const loginGuestResult = await client.mutate({
  //   mutation: LOGIN_GUEST,
  // });

  const settingsResult = await client.query({
    query: SETTINGS_QUERY,
  });

  const topMenuResult = await client.query({
    query: TOP_MENU_QUERY,
  });

  const categoriesMenuResult = await client.query({
    query: CATEGORIES_MENU_QUERY,
  });

  const footerMenuResult = await client.query({
    query: FOOTER_MENU_QUERY,
  });

  const userMenuResult = await client.query({
    query: USER_MENU_QUERY,
  });

  return {
    // authToken: loginGuestResult?.data?.login.authToken,
    // refreshToken: loginGuestResult?.data?.login.refreshToken,
    settings: {
      ...settingsResult?.data?.allSettings,
      ...settingsResult?.data?.page?.websiteInfo,
    },
    menus: {
      topMenu: topMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      categoriesMenu:
        categoriesMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      footerMenu: footerMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
      userMenu: userMenuResult?.data?.menus?.nodes?.[0]?.menuItems?.nodes,
    },
  };
};
