import React from "react";
import { UserContext } from "./userContext.js";
import { useState } from "react";
export default function UserContextProvider(props) {
  const URL = "link da api";
  const [token, setToken] = useState();
  return (
    <UserContext.Provider value={{ URL, token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
