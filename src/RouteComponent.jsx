import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import DashboardLayout from "./layouts/DashboardLayout";
import { Dashboard, Login } from "@mui/icons-material";
import Students from "./AdminDashboard/Pages/Students";
import Teachers from "./AdminDashboard/Pages/Teachers";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});
const RouteComponent = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default RouteComponent;
