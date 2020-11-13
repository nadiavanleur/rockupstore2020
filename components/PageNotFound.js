import React from "react";
import PropTypes from "prop-types";
import Layout from "./Layout";
import Section from "./Section";
import Link from "next/link";

const PageNotFound = ({ menus, settings }) => (
  <Layout menus={menus} settings={settings}>
    <div className="o-retain o-retain--wall u-margin-top-base">
      <Section title="Page not found">
        <p>
          {`This page does not exist. :(`}
          <br />
          <br />
          Click <Link href="/">here</Link> to go back to the homepage.
        </p>
      </Section>
    </div>
  </Layout>
);

PageNotFound.propTypes = {};

export default PageNotFound;
