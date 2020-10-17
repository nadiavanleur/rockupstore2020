import React, { useState, useEffect } from "react";

export const FlashMessageContext = React.createContext([{}, () => {}]);

export const FlashMessageProvider = ({ children }) => {
  const [flashMessages, setFlashMessages] = useState(null);

  useEffect(() => {
    if (!flashMessages) setFlashMessages([]);
  }, []);

  return (
    <FlashMessageContext.Provider value={[flashMessages, setFlashMessages]}>
      {children}
    </FlashMessageContext.Provider>
  );
};
