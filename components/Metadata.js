import React from "react";
import Head from "next/head";

const Metadata = ({
  settings,
  title,
  children,
  metaKeywords,
  metaDescription,
}) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#ffffff" />

      {/* Title */}
      <title>
        {title ? `${title} | ` : ""}
        {settings?.generalSettingsTitle}
      </title>

      {/* Description */}
      {(metaDescription || settings?.generalSettingsDescription) && (
        <meta
          name="description"
          content={metaDescription || settings.generalSettingsDescription}
        />
      )}

      {/* Keywords */}
      {(metaKeywords || settings?.page?.websiteInfo?.keywords) && (
        <meta
          name="keywords"
          content={metaKeywords || settings.page.websiteInfo.keywords}
        />
      )}

      {children}
    </Head>
  );
};

export default Metadata;
