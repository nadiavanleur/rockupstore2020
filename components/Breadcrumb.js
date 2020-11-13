import React from "react";
import PropTypes from "prop-types";
import BreadcrumbSchema from "./schema/BreadcrumbSchema";
import Link from "next/link";

const Breadcrumb = ({ title, parent }) => {
  if (!title) return null;

  return (
    <>
      {parent?.title && parent?.url && (
        <>
          <Link href={parent.url}>
            <a>{parent.title}</a>
          </Link>
        </>
      )}
      {" > "}
      <b>{title}</b>
      <BreadcrumbSchema title={title} parent={parent} />
    </>
  );
};

Breadcrumb.propTypes = {};

export default Breadcrumb;
