import React from "react";
import clientConfig from "../../client-config";

const LogoSchema = ({ logo }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          url: clientConfig.liveUrl,
          logo: logo,
        }),
      }}
    />
  );
};

LogoSchema.propTypes = {};

export default LogoSchema;
