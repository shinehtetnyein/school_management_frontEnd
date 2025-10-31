import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Students from "./AdminDashboard/Pages/Students";
import Teachers from "./AdminDashboard/Pages/Teachers";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import Dashboard from "./AdminDashboard/Pages/Dashboard";

const RouteComponent = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default RouteComponent;
