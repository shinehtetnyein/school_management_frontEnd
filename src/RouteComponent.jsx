import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import DashboardLayout from "./layouts/DashboardLayout";
import Students from "./AdminDashboard/Pages/Students";
import Teachers from "./AdminDashboard/Pages/Teachers";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import Dashboard from "./AdminDashboard/Pages/Dashboard";
import { ThemeProvider } from "./theme/context/ThemeContext";

const RouteComponent = () => {
  return (
    <>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default RouteComponent;
