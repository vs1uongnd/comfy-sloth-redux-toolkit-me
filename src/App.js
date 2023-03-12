import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  HomePage,
  AboutPage,
  CartPage,
  ProductsPage,
  SingleProductPage,
  CheckoutPage,
  ErrorPage,
  AuthWrapper,
  PrivateRoute,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<SingleProductPage />} />
          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
