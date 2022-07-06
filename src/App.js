import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import UserContextProvider from "./userContext/UserContextProvider.js";

export default function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart/" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}
