import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Login } from "./components/Login";
import { Users } from "./pages/Users";
import { Products } from "./pages/Products";
import { AddUser } from "./pages/AddUser";
import { EditUser } from "./pages/EditUser";
import { AddProduct } from "./pages/AddProduct";
import { EditProduct } from "./pages/EditProduct";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/add" element={<AddUser />}></Route>
          <Route path="/users/edit/:id" element={<EditUser />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/add" element={<AddProduct />}></Route>
          <Route path="/products/edit/:id" element={<EditProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
