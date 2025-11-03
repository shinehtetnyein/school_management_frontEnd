// components/layout/DashboardLayout.jsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Sidebar from "./SideBar/SideBar";
import Header from "./Header/Header";

const drawerWidth = 280;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          mt: "64px", // Height of AppBar
          mb: "60px", // Height of Footer
          minHeight: "calc(100vh - 124px)", // 64px header + 60px footer
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default DashboardLayout;
