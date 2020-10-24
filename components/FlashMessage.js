import React, { Component, useRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const FlashMessage = ({ type, message, cta, children }) => {
  const messageEl = useRef(null);

  const handleClick = () => {
    props.cta.onClick();
    closeMessage();
  };

  const closeMessage = () => {
    if (!messageEl || !messageEl.current) return;
    messageEl.current.classList.add("c-flashmessage--hidden");
  };

  return (
    <div
      className={`c-flashmessage ${type ? `c-flashmessage--${type}` : ""}`}
      ref={messageEl}
    >
      <div className="o-layout o-layout--gutter-base o-layout--align-middle">
        <div className="o-layout__cell o-layout__cell--fill">
          {message && <p className="c-flashmessage__message">{message}</p>}
        </div>
        <div className="o-layout__cell o-layout__cell--fit">
          {cta?.onClick && (
            <Button
              label={cta.label}
              onClick={handleClick}
              disabled={cta.disabled}
              extraClasses="c-flashmessage__button c-button--link"
            />
          )}
          <div onClick={closeMessage}>{children}</div>
        </div>
        <div className="o-layout__cell o-layout__cell--fit">
          <button onClick={closeMessage}>&times;</button>
        </div>
      </div>
    </div>
  );
};

FlashMessage.propTypes = {};

export default FlashMessage;
