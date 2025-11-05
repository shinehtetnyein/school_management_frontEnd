import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Toolbar,
  Divider,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import logo from "../../assets/logo-school.svg";
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Class as ClassIcon,
  MenuBook as MenuBookIcon,
  CheckCircle as CheckCircleIcon,
  Grade as GradeIcon,
  Payment as PaymentIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 280;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      icon: <DashboardIcon />,
      label: "Dashboard",
      exact: true,
    },
    { path: "/dashboard/students", icon: <SchoolIcon />, label: "Students" },
    { path: "/dashboard/teachers", icon: <PersonIcon />, label: "Teachers" },
    { path: "/dashboard/classes", icon: <ClassIcon />, label: "Classes" },
    { path: "/dashboard/subjects", icon: <MenuBookIcon />, label: "Subjects" },
    {
      path: "/dashboard/attendance",
      icon: <CheckCircleIcon />,
      label: "Attendance",
    },
    { path: "/dashboard/grades", icon: <GradeIcon />, label: "Grades" },
    { path: "/dashboard/fees", icon: <PaymentIcon />, label: "Fees" },
    { path: "/dashboard/reports", icon: <AssessmentIcon />, label: "Reports" },
    { path: "/dashboard/settings", icon: <SettingsIcon />, label: "Settings" },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="School logo"
            sx={{ width: 28, height: 28 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            School MS
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={isActive(item.path, item.exact)}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.06),
                },
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.main,
                  },
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.16),
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path, item.exact)
                    ? theme.palette.primary.main
                    : "inherit",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
