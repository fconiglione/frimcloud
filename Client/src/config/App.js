import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// import Header from "../components/Header";
import Home from "../pages/index";
// import Error404 from "../pages/error";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {

  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </div>
  );
}

export default App;