import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import { ThemeProvider } from "./theme/context/ThemeContext";
import Main from "./layouts/main/Main";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import StudentList from "./Components/Student/StudentList";

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
              <Route path="/" element={<LoginForm />}></Route>
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
                <Route index element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/students" element={<StudentList />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default RouteComponent;
