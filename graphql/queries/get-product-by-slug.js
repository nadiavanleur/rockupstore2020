import gql from "graphql-tag";

const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(id: $id, idType: SLUG) {
      id
      productId
      slug
      type
      name
      featured
      onSale
      averageRating
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
      ... on VariableProduct {
        id
        price
        salePrice
        stockQuantity
        variations {
          nodes {
            variationId
            id
            attributes {
              nodes {
                id
                name
                value
              }
            }
          }
        }
      }
      ... on SimpleProduct {
        id
        price
        salePrice
        stockQuantity
      }
      ... on ExternalProduct {
        id
        price
        salePrice
        externalUrl
      }
      ... on GroupProduct {
        id
        products {
          nodes {
            ... on VariableProduct {
              id
              price
              salePrice
              stockQuantity
              variations {
                nodes {
                  variationId
                  id
                  attributes {
                    nodes {
                      id
                      name
                      value
                    }
                  }
                }
              }
            }
            ... on SimpleProduct {
              id
              price
              salePrice
            }
            ... on ExternalProduct {
              id
              price
              salePrice
              externalUrl
            }
          }
        }
      }
    }
  }
`;

export default PRODUCT_QUERY;
