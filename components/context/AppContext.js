import React, { useState, useEffect } from "react";

export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem("cart");
      cartData = cartData !== null ? JSON.parse(cartData) : "";
      setCart(cartData);
    }
  }, []);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {children}
    </AppContext.Provider>
  );
};
