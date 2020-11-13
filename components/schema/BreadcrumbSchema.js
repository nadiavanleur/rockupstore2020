import React from "react";
import { useRouter } from "next/router";
import clientConfig from "../../client-config";

const BreadcrumbSchema = ({ title, parent }) => {
  const router = useRouter();
  const url = `${clientConfig.liveUrl}${router.asPath}`;

  let breadcrumbsArray = [
    {
      "@type": "ListItem",
      position: 1,
      name: title,
      item: url,
    },
  ];

  if (parent?.title) {
    breadcrumbsArray = [
      {
        "@type": "ListItem",
        position: 1,
        name: parent.title,
        item: `${clientConfig.liveUrl}${parent.url}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: url,
      },
    ];
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbsArray,
        }),
      }}
    />
  );
};

BreadcrumbSchema.propTypes = {};

export default BreadcrumbSchema;
