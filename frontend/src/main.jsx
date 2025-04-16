import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import LoginSignupPage from "./components/LoginPage.jsx";
import SignupPage from "./components/RegisterPage.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import RegisterPage from "./components/RegisterPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<LoginSignupPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
