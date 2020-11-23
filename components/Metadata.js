import React from "react";
import Head from "next/head";
import clientConfig from "../client-config";
import { withRouter } from "next/router";

const Metadata = ({ settings, children, metaData, router }) => {
  const ogSiteName = settings?.generalSettingsTitle;
  const ogTitle = metaData?.title;
  const metaTitle = `${ogTitle ? `${ogTitle} | ` : ""}${ogSiteName}`;
  const metaDescription =
    metaData?.description || settings?.generalSettingsDescription;
  const metaKeywords =
    metaData?.keywords || settings?.page?.websiteInfo?.keywords;
  const ogType = metaData?.type || "website";
  const ogImages = [...metaData?.images, settings?.logo?.sourceUrl];
  const ogUrl = `${clientConfig.liveUrl}${router.asPath}`;

  /**
   * Other possible Open Graph tags:
   * - og:audio
   * - og:determiner
   * - og:locale (default="en_US")
   * - og:locale:alternate (alternative languages)
   * - og:video
   */

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Favicon settings */}
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

      {/* Site name */}
      {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}

      {/* OpenGraph Title */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}

      {/* Title */}
      {metaTitle && <title>{metaTitle}</title>}

      {/* Description */}
      {metaDescription && (
        <>
          <meta name="description" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
        </>
      )}

      {/* Keywords */}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}

      {/* Type */}
      {ogType && <meta property="og:type" content={ogType} />}

      {/* Images */}
      {ogImages.map(
        (ogImage) =>
          ogImage && (
            <meta property="og:image" content={ogImage} key={ogImage} />
          )
      )}

      {/* Url */}
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {children}
    </Head>
  );
};

export default withRouter(Metadata);
