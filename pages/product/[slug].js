import client from "../../components/ApolloClient";
import Layout from "../../components/Layout";
import Section from "../../components/Section";
import gql from "graphql-tag";
import { withRouter } from "next/router";
import Slider from "../../components/Slider";
import AddToCard from "../../components/AddToCart";

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
  const attributes =
    product.attributes &&
    product.attributes.edges &&
    product.attributes.edges.filter(
      ({ node: attribute }) => attribute.variation
    );
  console.log(attributes);

  return (
    <Layout menus={menus} settings={settings}>
      <Section title={product.name}>
        <div className="o-layout o-layout--gutter-base">
          <div className="o-layout__cell o-layout__cell--fill@from-md">
            <Slider>
              {product.image && product.image.sourceUrl && (
                <div>
                  <img
                    src={product.image.sourceUrl}
                    srcSet={product.image.srcSet}
                    alt={product.image.altText || product.image.title || ""}
                  />
                </div>
              )}
              {product.galleryImages &&
                product.galleryImages.edges &&
                product.galleryImages.edges.length &&
                product.galleryImages.edges.map(({ node: image }) => {
                  if (image && image.sourceUrl)
                    return (
                      <div>
                        <img
                          src={image.sourceUrl}
                          srcSet={image.srcSet}
                          alt={image.altText || image.title || ""}
                        />
                      </div>
                    );
                })}
            </Slider>
          </div>
          <div className="o-layout__cell o-layout__cell--fill@from-md">
            <div
              className={`c-price${
                product.onSale ? " c-price--on-sale" : ""
              } u-margin-bottom-small`}
            >
              {product.salePrice && (
                <div className="c-price__old">{product.salePrice}</div>
              )}
              {product.price && <div className="c-price">{product.price}</div>}
            </div>

            {attributes &&
              attributes.map(({ node: attribute }) => (
                <div className="o-layout o-layout--gutter-base o-layout--align-middle u-margin-bottom-small">
                  {attribute.name && (
                    <div className="o-layout__cell u-fraction--2of12">
                      <label htmlFor={attribute.id}>{attribute.name}</label>
                    </div>
                  )}
                  <div className="o-layout__cell u-fraction--10of12">
                    <select id={attribute.id}>
                      {attribute.options.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

            <AddToCard product={product} />
          </div>
        </div>
      </Section>
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
