import React, { useState, useEffect } from "react";

export const FlashMessageContext = React.createContext([{}, () => {}]);

export const FlashMessageProvider = ({ children }) => {
  const [flashMessages, setFlashMessages] = useState(null);

  // @TODO: fade flashmessage after couple of seconds
  const addFlashMessage = ({ type, message, children }) => {
    setFlashMessages([
      {
        type,
        message,
        children,
      },
      ...flashMessages,
    ]);
  };

  useEffect(() => {
    if (!flashMessages) setFlashMessages([]);
  }, []);

  return (
    <FlashMessageContext.Provider value={[flashMessages, addFlashMessage]}>
      {children}
    </FlashMessageContext.Provider>
  );
};
