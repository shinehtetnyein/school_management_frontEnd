import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Students from "./AdminDashboard/Pages/Students";
import Teachers from "./AdminDashboard/Pages/Teachers";
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
                <Route index element={<Dashboard />} />
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
