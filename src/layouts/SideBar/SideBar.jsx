// components/layout/Sidebar.jsx
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
  ListSubheader, // Import ListSubheader
} from "@mui/material";
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
  ChevronRight as ChevronRightIcon, // Import ChevronRight
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 280;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
  const theme = useTheme();
  const location = useLocation();

  // 1. Restructured data to support groups
  const menuGroups = [
    {
      title: "Main",
      items: [
        {
          path: "/dashboard",
          icon: <DashboardIcon />,
          label: "Dashboard",
          exact: true,
        },
        {
          path: "/dashboard/students",
          icon: <SchoolIcon />,
          label: "Students",
          chevron: true,
        },
        {
          path: "/dashboard/teachers",
          icon: <PersonIcon />,
          label: "Teachers",
          chevron: true,
        },
        { path: "/dashboard/classes", icon: <ClassIcon />, label: "Classes" },
        {
          path: "/dashboard/subjects",
          icon: <MenuBookIcon />,
          label: "Subjects",
        },
      ],
    },
    {
      title: "Activities",
      items: [
        {
          path: "/dashboard/attendance",
          icon: <CheckCircleIcon />,
          label: "Attendance",
          chevron: true,
        },
        { path: "/dashboard/grades", icon: <GradeIcon />, label: "Grades" },
        {
          path: "/dashboard/fees",
          icon: <PaymentIcon />,
          label: "Fees",
          chevron: true,
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          path: "/dashboard/reports",
          icon: <AssessmentIcon />,
          label: "Reports",
        },
        {
          path: "/dashboard/settings",
          icon: <SettingsIcon />,
          label: "Settings",
        },
      ],
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box>
      {/* 2. Updated Toolbar to match image header */}
      <Toolbar sx={{ py: 1.5, display: "flex", alignItems: "center" }}>
        <SchoolIcon
          sx={{
            color: "primary.first",
            fontSize: "2.2rem",
            mr: 1.5,
            p: 0.5,
            borderRadius: "4px",
          }}
        />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ color: theme.palette.text.primary }}
        >
          PreSkool
        </Typography>
      </Toolbar>
      <Divider />

      {/* 3. Updated List rendering logic */}
      <List sx={{ pt: 1.5, px: 1 }}>
        {menuGroups.map((group) => (
          // Use React.Fragment for each group
          <React.Fragment key={group.title}>
            {/* 4. Render ListSubheader for the group title */}
            <ListSubheader
              component="div"
              sx={{
                textTransform: "uppercase",
                color: "text.primary",
                fontSize: "0.75rem",
                fontWeight: 700,
                lineHeight: "normal",
                mb: 1,
                mt: 1,
                pl: 1.5,
                backgroundColor: "transparent", // Ensure it has no background
              }}
            >
              {group.title}
            </ListSubheader>

            {/* Render items for the group */}
            {group.items.map((item) => {
              const active = isActive(item.path, item.exact);
              return (
                <ListItem
                  key={item.path}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={active}
                    // 5. Updated styling (sx) for items
                    sx={{
                      py: 0.75, // Adjust padding
                      px: 1.5,
                      mb: 0.5,
                      borderRadius: "4px", // Add slight rounding

                      // Style for selected items
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.action.selected, // Use a subtle gray
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 2, // Margin between icon and text
                        justifyContent: "center",
                        color: active ? "primary.secondary" : "text.secondary", // Active color
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "15px",
                        fontWeight: active ? 600 : 500,
                        color: active ? "primary.secondary" : "text.primary", // Active color
                      }}
                    />
                    {/* 6. Conditionally render Chevron icon */}
                    {item.chevron && (
                      <ChevronRightIcon
                        sx={{ color: "text.secondary", fontSize: "1.2rem" }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer (no changes) */}
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

      {/* Desktop drawer (no changes) */}
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
