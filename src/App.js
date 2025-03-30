import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/ui/DashboardLayout .jsx";
import { LoginForm } from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Auth Protection

const App = () => {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

      
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        
      
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
