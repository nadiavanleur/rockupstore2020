import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const Designer = ({ designer }) => {
  if (!designer?.name) return null;

  return (
    <div className="o-layout o-layout--gutter-small o-layout--align-middle u-umbrella__container">
      {designer.image?.sourceUrl && (
        <div className="o-layout__cell o-layout__cell--fit">
          <img
            src={designer.image.sourceUrl}
            srcSet={designer.image.srcSet}
            alt={designer.image.altText || designer.image.title || ""}
            className="c-avatar"
            width={65}
            height={65}
          />
        </div>
      )}
      <div className="o-layout__cell o-layout__cell--fill u-line-height-base">
        <Link
          href="/product-category/[slug]"
          as={`/product-category/${designer.slug}`}
        >
          <a className="u-umbrella">
            <h4>{designer.name}</h4>
          </a>
        </Link>
        {designer.description && (
          <div
            dangerouslySetInnerHTML={{
              __html: designer.description
                .replace(/\r\n/gi, "<br>")
                .replace(
                  /\<a/gi,
                  '<a target="_blank" class="u-umbrella__overlay"'
                ),
            }}
            className="c-editor-content"
          />
        )}
      </div>
    </div>
  );
};

Designer.propTypes = {};

export default Designer;
