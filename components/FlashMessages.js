import React, { useContext } from "react";
import { FlashMessageContext } from "./context/FlashMessageContext";
import FlashMessage from "./FlashMessage";

const FlashMessages = () => {
  const [flashMessages, addFlashMessage] = useContext(FlashMessageContext);

  if (!flashMessages) return null;

  return (
    <div className="c-flashmessages">
      <ul className="o-retain o-retain--wall o-list-clean">
        {flashMessages.map((flashMessage) => (
          <li>
            <FlashMessage
              type={flashMessage.type}
              message={flashMessage.message}
              cta={flashMessage.cta}
            >
              {flashMessage.children}
            </FlashMessage>
          </li>
        ))}
      </ul>
    </div>
  );
};

FlashMessages.propTypes = {};

export default FlashMessages;
