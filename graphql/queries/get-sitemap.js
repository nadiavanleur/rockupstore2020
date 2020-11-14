import gql from "graphql-tag";

const SITEMAP_QUERY = gql`
  query SitemapQuery {
    pages {
      nodes {
        slug
      }
    }
    product: products {
      nodes {
        slug
      }
    }
    productCategory: productCategories {
      nodes {
        slug
      }
    }
  }
`;

export default SITEMAP_QUERY;
