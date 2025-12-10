import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Badge,
  InputBase,
  alpha,
  Switch,
  FormControlLabel,
  Chip,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications,
  LightMode,
  DarkMode,
  Search,
  Person,
  School,
  CalendarMonth,
  Email,
  Apps,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import useThemeMode from "../../../../hooks/useThemeMode";

// Styled components
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "300px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: 300,
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "8px",
  },
}));

const Topbar = ({
  drawerWidth,
  collapsedWidth,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [appsAnchorEl, setAppsAnchorEl] = useState(null);

  const sidebarWidth = isSidebarOpen ? drawerWidth : collapsedWidth;

  // Mock data
  const notifications = [
    {
      id: 1,
      text: "New assignment submitted by John Doe",
      time: "5 min ago",
      type: "assignment",
    },
    {
      id: 2,
      text: "Parent meeting scheduled for tomorrow",
      time: "1 hour ago",
      type: "meeting",
    },
    {
      id: 3,
      text: "Grade report is ready for review",
      time: "2 hours ago",
      type: "report",
    },
  ];

  const quickApps = [
    { name: "Gradebook", icon: "📊", description: "Manage student grades" },
    { name: "Attendance", icon: "✅", description: "Track student attendance" },
    { name: "Timetable", icon: "⏰", description: "View class schedule" },
    { name: "Messages", icon: "💬", description: "Communicate with students" },
  ];

  const user = {
    name: "Dr. Sarah Johnson",
    role: "Mathematics Teacher",
    avatar: "/static/images/avatar/1.jpg",
    status: "online",
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleAppsMenuOpen = (event) => {
    setAppsAnchorEl(event.currentTarget);
  };

  const handleAppsMenuClose = () => {
    setAppsAnchorEl(null);
  };

  const isNotificationMenuOpen = Boolean(notificationAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isAppsMenuOpen = Boolean(appsAnchorEl);

  return (
    <AppBar
      position="fixed"
      sx={{
        left: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        background: theme.palette.background.default,
        // background: "red",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        transition: theme.transitions.create(["left", "width"]),
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            onClick={toggleSidebar}
            edge="start"
            sx={{ mr: 1, color: theme.palette.text.primary }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Center Section - Search */}
        {!isMobile && (
          <SearchContainer>
            <SearchIconWrapper>
              <Search sx={{ color: theme.palette.text.primary }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search students, classes, or assignments..."
              inputProps={{ "aria-label": "search" }}
            />
          </SearchContainer>
        )}

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Quick Stats */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
              <Tooltip title="Active Students">
                <Chip
                  icon={<Person />}
                  label="247"
                  size="medium"
                  sx={{
                    border: `2px solid ${theme.palette.divider}`,
                    borderRadius: "8px",
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                  }}
                />
              </Tooltip>
              <Tooltip title="Today's Classes">
                <Chip
                  icon={<School />}
                  label="8"
                  size="medium"
                  sx={{
                    border: `2px solid ${theme.palette.divider}`,
                    borderRadius: "8px",
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                  }}
                />
              </Tooltip>
            </Box>
          )}

          {/* Quick Apps Menu */}
          <Tooltip title="Quick Apps">
            <IconButton onClick={handleAppsMenuOpen}>
              <Apps sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={appsAnchorEl}
            open={isAppsMenuOpen}
            onClose={handleAppsMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
              },
            }}
          >
            <MenuItem disabled>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{ color: theme.palette.text.primary }}
              >
                Quick Access
              </Typography>
            </MenuItem>
            {quickApps.map((app) => (
              <MenuItem key={app.name} onClick={handleAppsMenuClose}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography variant="h6">{app.icon}</Typography>
                  <Box>
                    <Typography variant="body2">{app.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {app.description}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Theme Toggle */}
          <Tooltip
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <IconButton color="inherit" onClick={toggleTheme}>
              {isDarkMode ? (
                <LightMode sx={{ color: theme.palette.text.primary }} />
              ) : (
                <DarkMode sx={{ color: theme.palette.text.primary }} />
              )}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
              <Badge badgeContent={3} color="error">
                <Notifications sx={{ color: theme.palette.text.primary }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={notificationAnchorEl}
            open={isNotificationMenuOpen}
            onClose={handleNotificationMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 300,
                maxHeight: 400,
              },
            }}
          >
            <MenuItem disabled>
              <Typography variant="subtitle2" fontWeight="bold">
                Notifications
              </Typography>
            </MenuItem>
            {notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={handleNotificationMenuClose}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    {notification.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={handleNotificationMenuClose}>
              <Typography variant="caption" textAlign="center" width="100%">
                Mark all as read
              </Typography>
            </MenuItem>
          </Menu>

          {/* User Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={500}
                sx={{ color: theme.palette.text.primary }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.primary }}
              >
                {user.role}
              </Typography>
            </Box>
            <Tooltip title="User profile">
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: alpha(theme.palette.common.white, 0.2),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.common.white, 0.3),
                  },
                }}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{
                    width: 32,
                    height: 32,
                    border: "2px solid",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={profileAnchorEl}
              open={isProfileMenuOpen}
              onClose={handleProfileMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                },
              }}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleProfileMenuClose}>
                <Person sx={{ mr: 1.5 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <Email sx={{ mr: 1.5 }} />
                Messages
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <CalendarMonth sx={{ mr: 1.5 }} />
                Schedule
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleProfileMenuClose}
                sx={{ color: "error.main" }}
              >
                <LogoutIcon sx={{ mr: 1.5 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
