import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products(first: 24) {
      nodes {
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
        ... on GroupProduct {
          id
          products {
            nodes {
              ... on VariableProduct {
                id
                price
                salePrice
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
  }
`;

export default PRODUCTS_QUERY;
