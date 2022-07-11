import React from "react";
import { UserContext } from "./userContext.js";
import { useState } from "react";
export default function UserContextProvider(props) {
  const URL = "https://blaze-comics.herokuapp.com";
  const [token, setToken] = useState();
  const [bodyCart, setBodyCart] = useState();

  const [countCartItems, setCountCartItems] = useState(() => {
    if (JSON.parse(localStorage.getItem("cartItems"))) {
      return JSON.parse(localStorage.getItem("cartItems")).length;
    }
    return 0;
  });

  return (
    <UserContext.Provider
      value={{
        URL,
        token,
        setToken,
        bodyCart,
        setBodyCart,
        countCartItems,
        setCountCartItems,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
