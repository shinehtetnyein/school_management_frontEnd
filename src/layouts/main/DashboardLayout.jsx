import { useState, useRef } from "react";
import { Box, Toolbar, ThemeProvider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import SideBar from "./components/Leftbar/SideBar";

const LayoutContent = () => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTitle, setCurrentTitle] = useState("Dashboard");

  const drawerWidth = 251;
  const collapsedWidth = 80;

  const outletRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleContentClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Box
      sx={{
        mb: -2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: theme.palette.background.default, // Use the theme's background color
      }}
    >
      <Topbar
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedWidth}
        isSidebarOpen={isSidebarOpen}
        currentTitle={currentTitle}
        toggleSidebar={toggleSidebar}
      />

      <Box>
        <SideBar
          isSidebarOpen={isSidebarOpen}
          drawerWidth={drawerWidth}
          collapsedWidth={collapsedWidth}
          setCurrentTitle={setCurrentTitle}
          toggleSidebar={toggleSidebar}
          theme={theme}
        />
      </Box>

      <Box sx={{ display: "flex", flex: 2 }}>
        <Box
          ref={outletRef}
          onClick={handleContentClick}
          sx={{
            // Make the main content area fill height and scroll vertically when needed
            minHeight: "100vh",
            overflowY: "auto",
            position: "relative",
            flex: 1,
            py: 0.2,
            transition: "margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            marginLeft: isSidebarOpen
              ? `${drawerWidth}px`
              : `${collapsedWidth}px`,
          }}
        >
          <Toolbar />
          <Outlet context={{ isSidebarOpen }} />
        </Box>
      </Box>
    </Box>
  );
};

const DashboardLayout = () => {
  // Assuming you have a theme object to pass to ThemeProvider
  // If your theme is provided higher up in the component tree, you can remove this ThemeProvider.
  return (
    // <ThemeProvider theme={yourThemeObject}>
    <LayoutContent />
    // </ThemeProvider>
  );
};

export default DashboardLayout;
