import React from "react";
import PropTypes from "prop-types";

const Designer = ({ designer }) => {
  if (!designer?.name) return null;

  return (
    <div className="o-layout o-layout--gutter-base">
      {designer.avatar?.url && (
        <div className="o-layout__cell o-layout__cell--fit">
          <img
            src={designer.avatar.url}
            alt=""
            className="c-avatar"
            width={65}
            height={65}
          />
        </div>
      )}
      <div className="o-layout__cell o-layout__cell--fill">
        <h4>{designer.name}</h4>
        {designer.description && (
          <div dangerouslySetInnerHTML={{ __html: designer.description }} />
        )}
      </div>
    </div>
  );
};

Designer.propTypes = {};

export default Designer;
