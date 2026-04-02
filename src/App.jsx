import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductDetails } from "./components/ProductDetails";
import { ProductListContainer } from "./container/ProductListContainer";
import { Navbar } from "./layouts/Navbar";
import { Sidebar } from "./layouts/Sidebar";
import { CartList } from "./container/CartList";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Checkout } from "./pages/Checkout";


export const App = () => {
  return(
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/list" element={<ProductListContainer />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartList />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}