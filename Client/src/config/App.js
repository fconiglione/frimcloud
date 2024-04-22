import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// import Header from "../components/Header";
import Home from "../pages/index";
// import Error404 from "../pages/error";
import Login from "../pages/login";
import Register from "../pages/register";
import Header from "../components/Header";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  const displaySelectItems = () => {
    return !location.pathname.startsWith("/login") && !location.pathname.startsWith("/register");
  };

  return (
    <div>
      {displaySelectItems() && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </div>
  );
}

export default App;