import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import gql from "graphql-tag";
import Section from "../../components/Section";
import { withRouter } from "next/router";

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

const TOP_MENU_QUERY = gql`
  query TopMenuQuery {
    menu(idType: NAME, id: "Top menu") {
      ...MenuFragment
    }
  }
  ${MENU_FRAGMENT}
`;

const CATEGORIES_MENU_QUERY = gql`
  query CategoriesMenuQuery {
    menu(idType: NAME, id: "Categories") {
      ...MenuFragment
    }
  }
  ${MENU_FRAGMENT}
`;

const FOOTER_MENU_QUERY = gql`
  query FooterMenuQuery {
    menu(idType: NAME, id: "Footer menu") {
      ...MenuFragment
    }
  }
  ${MENU_FRAGMENT}
`;

const USER_MENU_QUERY = gql`
  query UserMenuQuery {
    menu(idType: NAME, id: "User menu") {
      ...MenuFragment
    }
  }
  ${MENU_FRAGMENT}
`;

const SETTINGS_QUERY = gql`
  query SettingsQuery {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
  }
`;

const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(id: $id, idType: SLUG) {
      ... on VariableProduct {
        name
        price
        salePrice
        galleryImages {
          edges {
            node {
              altText
              srcSet
              sizes
              id
              uri
              title
              sourceUrl
            }
          }
        }
        image {
          altText
          srcSet
          sizes
          id
          uri
          title
          sourceUrl
        }
        attributes {
          edges {
            node {
              name
              id
              options
              variation
            }
          }
        }
        featured
        id
        onSale
        productId
        slug
      }
      ... on SimpleProduct {
        name
        price
        salePrice
        galleryImages {
          edges {
            node {
              altText
              srcSet
              sizes
              id
              uri
              title
              sourceUrl
            }
          }
        }
        image {
          altText
          srcSet
          sizes
          id
          uri
          title
          sourceUrl
        }
        attributes {
          edges {
            node {
              name
              id
              options
              variation
            }
          }
        }
        featured
        id
        onSale
        productId
        slug
      }
      ... on GroupProduct {
        name
        galleryImages {
          edges {
            node {
              altText
              srcSet
              sizes
              id
              uri
              title
              sourceUrl
            }
          }
        }
        image {
          altText
          srcSet
          sizes
          id
          uri
          title
          sourceUrl
        }
        attributes {
          edges {
            node {
              name
              id
              options
              variation
            }
          }
        }
        featured
        id
        onSale
        productId
        slug
      }
      ... on ExternalProduct {
        name
        price
        salePrice
        galleryImages {
          edges {
            node {
              altText
              srcSet
              sizes
              id
              uri
              title
              sourceUrl
            }
          }
        }
        image {
          altText
          srcSet
          sizes
          id
          uri
          title
          sourceUrl
        }
        attributes {
          edges {
            node {
              name
              id
              options
              variation
            }
          }
        }
        featured
        id
        onSale
        productId
        slug
      }
    }
  }
`;

/**
 * Index
 */
const Index = ({ product, menus, settings }) => {
  console.dir(product);

  return (
    <Layout menus={menus} settings={settings}>
      Product page
    </Layout>
  );
};

Index.getInitialProps = async (router) => {
  const { slug } = router.query;

  const productResult = await client.query({
    query: PRODUCT_QUERY,
    variables: {
      id: slug,
    },
  });

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
    product: productResult && productResult.data.product,
    settings: settingsResult && settingsResult.data.allSettings,
    menus: {
      topMenu: topMenuResult && topMenuResult.data.menu.menuItems.nodes,
      categoriesMenu:
        categoriesMenuResult && categoriesMenuResult.data.menu.menuItems.nodes,
      footerMenu:
        footerMenuResult && footerMenuResult.data.menu.menuItems.nodes,
      userMenu: userMenuResult && userMenuResult.data.menu.menuItems.nodes,
    },
  };
};

export default withRouter(Index);
