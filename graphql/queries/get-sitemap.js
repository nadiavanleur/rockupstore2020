import gql from "graphql-tag";

const SITEMAP_QUERY = gql`
  query SitemapQuery {
    page: pages(first: 100) {
      nodes {
        slug
      }
    }
    product: products(first: 1000) {
      nodes {
        slug
      }
    }
    productCategory: productCategories(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export default SITEMAP_QUERY;
