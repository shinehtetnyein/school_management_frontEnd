import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import { ThemeProvider } from "./Theme/Context/ThemeContext";
import Main from "./layouts/Main/Main";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

const RouteComponent = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" index element={<LoginForm />}></Route>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/"
                element={
                  <Main
                    toggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                }
              >
                <Route element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default RouteComponent;
