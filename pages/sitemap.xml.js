import React from "react";
import client from "../components/ApolloClient";
import clientConfig from "../client-config";
import SITEMAP_QUERY from "../graphql/queries/get-sitemap";

const camelToDash = (str) =>
  str
    .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
    .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);

const createSitemap = (sitemapResult) => {
  if (!sitemapResult) return null;

  const DEFAULT_PAGES = ["/", "/cart", "/checkout", "/categories"];
  let paths = [...DEFAULT_PAGES];

  Object.entries(sitemapResult?.data || {}).forEach(([key, value]) => {
    console.log(key, value);
    let pathKey = camelToDash(key);

    paths = [
      ...paths,
      ...value?.nodes?.map?.((node) => `/${pathKey}/${node.slug}`),
    ];
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${paths
      .map(
        (path) => `
                <url>
                    <loc>${`${clientConfig.liveUrl}${path}`}</loc>
                </url>
            `
      )
      .join("")}
  </urlset>
`;
};

const Sitemap = () => null;

Sitemap.getInitialProps = async ({ res }) => {
  const sitemapResult = await client.query({ query: SITEMAP_QUERY });

  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(sitemapResult));
  res.end();
};

export default Sitemap;
