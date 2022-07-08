import React from "react";
import { UserContext } from "./userContext.js";
import { useState } from "react";
export default function UserContextProvider(props) {
  const URL = "http://localhost:5000";
  const [token, setToken] = useState();
  const [bodyCart, setBodyCart] = useState();
  return (
    <UserContext.Provider value={{ URL, token, setToken, bodyCart, setBodyCart }}>
      {props.children}
    </UserContext.Provider>
  );
}
