import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from "../pages/index";
// import Error404 from "../pages/error";
import Login from "../components/login";
import Header from "../components/Header";
import Settings from "../pages/settings";
import Apps from "../pages/apps";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

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

  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {displaySelectItems() && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </div>
  );
}

export default App;