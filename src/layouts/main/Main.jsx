import { Box, useTheme, useMediaQuery, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Leftbar from "./components/Leftbar/Leftbar";

const Main = ({ toggleSidebar, isSidebarCollapsed }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "lg"));
  const topbarHeight = "64px";
  const mobileTopbarMargin = 9;

  const mainContainerStyles = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    backgroundColor: "background.main",
    overflow: "hidden",
  };

  const contentGridStyles = {
    mt: topbarHeight,
    display: "flex",
    flex: 1,
    overflow: "auto",
    flexDirection: isMobile ? "column" : "row",
  };

  const outletContainerStyles = {
    flex: 1,
    overflow: "auto",
    position: "sticky",
    top: topbarHeight,
    mt: isMobile ? mobileTopbarMargin : 0,
    ml: isMobile ? -1.7 : 0.4,
  };

  return (
    <t theme={theme}>
      <Box sx={mainContainerStyles}>
        <Topbar toggleSidebar={toggleSidebar} />

        <Grid sx={contentGridStyles}>
          {!isMobile && (
            <Leftbar
              isCollapsed={isSidebarCollapsed}
              onToggle={toggleSidebar}
            />
          )}

          <Box sx={{ display: "flex", flex: 1, overflow: "auto" }}>
            <Box className="scrollbar-hide" sx={outletContainerStyles}>
              <Outlet />
            </Box>
          </Box>
        </Grid>
      </Box>
    </t>
  );
};

export default Main;
