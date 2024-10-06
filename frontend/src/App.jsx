import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/home/index.jsx";
import Login from "./views/login/index.jsx";
import Register from "./views/register/index.jsx";

export default function App() {
  return <>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
  </Routes>
  </>
}