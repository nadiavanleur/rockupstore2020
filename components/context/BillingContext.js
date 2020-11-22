import React, { useState, useEffect } from "react";

export const BillingContext = React.createContext([{}, () => {}]);

export const BillingProvider = ({ children }) => {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    company: "",
    country: "NL",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    createAccount: false,
    orderNotes: "",
    paymentMethod: "bacs",
    errors: null,
    order: null,
  };
  // Test data
  // const INITIAL_STATE = {
  //   firstName: "Nadia",
  //   lastName: "van Leur",
  //   company: "Nadia van Leur",
  //   country: "NL",
  //   address1: "Ginnekenweg 127A",
  //   address2: "",
  //   city: "Breda",
  //   state: "Noord-Brabant",
  //   postcode: "4818JD",
  //   phone: "0031683145934",
  //   email: "nadiavl@hotmail.com",
  //   createAccount: false,
  //   orderNotes: "",
  //   paymentMethod: "bacs",
  //   errors: null,
  //   order: null,
  // };

  const [billingInfo, setBillingInfoState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!process.browser) return;
    let existingBillingInfo = localStorage.getItem("billing-info");
    existingBillingInfo =
      existingBillingInfo !== null
        ? JSON.parse(existingBillingInfo)
        : INITIAL_STATE;
    setBillingInfo(existingBillingInfo);
  }, []);

  const setBillingInfo = (updatedBillingInfo) => {
    setBillingInfoState(updatedBillingInfo);

    if (!process.browser) return;
    // Update billing-info in the localStorage.
    localStorage.setItem("billing-info", JSON.stringify(updatedBillingInfo));
  };

  return (
    <BillingContext.Provider value={[billingInfo, setBillingInfo]}>
      {children}
    </BillingContext.Provider>
  );
};
