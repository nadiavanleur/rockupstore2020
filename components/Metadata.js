import React from "react";
import Head from "next/head";

const Metadata = ({ settings, title, children }) => {
  return (
    <Head>
      <title>
        {title ? `${title} | ` : ""}
        {settings?.generalSettingsTitle}
      </title>
      <meta name="description" content={settings?.generalSettingsDescription} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      {children}
    </Head>
  );
};

export default Metadata;
