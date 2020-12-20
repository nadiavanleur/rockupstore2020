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
  const ogImages = [settings?.logo?.sourceUrl, ...(metaData?.images || [])];
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

      {/* Link Pinterest */}
      <meta name="p:domain_verify" content="31affec53c53c8809f82db788f4e421c" />

      {/* Cookiebot */}
      {clientConfig.cookiebotCode && (
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={clientConfig.cookiebotCode}
          data-blockingmode="auto"
          type="text/javascript"
        />
      )}

      {/* Global site tag (gtag.js) - Google Analytics */}
      {clientConfig.gtagCode && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${clientConfig.gtagCode}`}
        />
      )}
      {clientConfig.gtagCode && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${clientConfig.gtagCode}');
            `,
          }}
        />
      )}

      {/* Pinterest tag */}
      {clientConfig.pinterestCode && (
        <script
          dangerouslySetInnerHTML={{
            _html: `!function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
              n=window.pintrk;n.queue=[],n.version="3.0";var
              t=document.createElement("script");t.async=!0,t.src=e;var
              r=document.getElementsByTagName("script")[0];
              r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '${clientConfig.pinterestCode}');
            pintrk('page');`,
          }}
        />
      )}
      {clientConfig.pinterestCode && (
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none;"
            alt=""
            src={`https://ct.pinterest.com/v3/?event=init&tid=${clientConfig.pinterestCode}&noscript=1`}
          />
        </noscript>
      )}

      {children}
    </Head>
  );
};

export default withRouter(Metadata);
