import client from "../components/ApolloClient";
import GET_INITIAL_DATA_QUERY from "../graphql/queries/get-initial-data";
// import LOGIN_GUEST from "../graphql/mutations/login-guest";

export const defaultInitialProps = async () => {
  // const loginGuestResult = await client.mutate({
  //   mutation: LOGIN_GUEST,
  // });

  const initialDataResult = await client.query({
    query: GET_INITIAL_DATA_QUERY,
  });

  return {
    // authToken: loginGuestResult?.data?.login.authToken,
    // refreshToken: loginGuestResult?.data?.login.refreshToken,
    settings: {
      ...(initialDataResult?.data?.allSettings || []),
      ...(initialDataResult?.data?.page?.websiteInfo || []),
    },
    menus: {
      topMenu: initialDataResult?.data?.topMenu?.nodes?.[0]?.menuItems?.nodes,
      categoriesMenu:
        initialDataResult?.data?.categoriesMenu?.nodes?.[0]?.menuItems?.nodes,
      footerMenu:
        initialDataResult?.data?.footerMenu?.nodes?.[0]?.menuItems?.nodes,
      userMenu: initialDataResult?.data?.userMenu?.nodes?.[0]?.menuItems?.nodes,
      categories: initialDataResult?.data?.productCategories?.nodes?.reverse(),
    },
  };
};
