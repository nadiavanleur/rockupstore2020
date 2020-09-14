import React from "react";
import Head from "next/head";

const Metadata = ({ children }) => {
  return <Head>{children}</Head>;
};

export default Metadata;
