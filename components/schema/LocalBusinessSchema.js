import React from "react";
import clientConfig from "../../client-config";

const LocalBusinessSchema = ({ settings }) => {
  console.log(settings);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          image: settings.logo.sourceUrl,
          "@id": clientConfig.liveUrl,
          name: settings.title,
          address: {
            "@type": "PostalAddress",
            streetAddress: clientConfig.address?.street,
            addressLocality: clientConfig.address?.city,
            addressRegion: clientConfig.address?.province,
            postalCode: clientConfig.address?.postalCode,
            addressCountry: clientConfig.address?.country,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 51.5752416,
            longitude: 4.7824186,
          },
          url: clientConfig.liveUrl,
          email: clientConfig.email,
          priceRange: "$$",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          ],
        }),
      }}
    />
  );
};

LocalBusinessSchema.propTypes = {};

export default LocalBusinessSchema;
