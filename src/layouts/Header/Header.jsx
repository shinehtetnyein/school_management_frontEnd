// components/layout/Header.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Divider,
  ListItemIcon,
  TextField,
  InputAdornment,
  Button,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  CalendarToday as CalendarTodayIcon,
  Flag as FlagIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  Fullscreen as FullscreenIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import { useNavigate } from "react-router-dom";

const drawerWidth = 280;

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    handleProfileMenuClose();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0)",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              sx={{
                width: { xs: 180, md: 300 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "40px",
                  backgroundColor: theme.palette.background.default,
                  "& fieldset": {
                    border: `1px solid ${theme.palette.divider}`,
                  },
                },
                // CHANGED: Style the placeholder
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "14px",
                  color: "text.secondary",
                  opacity: 1,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end">
                      <FilterListIcon
                        sx={{ color: theme.palette.action.icon }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                // CHANGED: Style the actual input text
                style: { fontSize: "14px" },
              }}
            />
          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0, md: 1.5 },
            }}
          >
            {/* Academic Year Button */}
            <Button
              variant="outlined"
              size="small"
              startIcon={
                <CalendarTodayIcon
                  fontSize="small"
                  sx={{ color: theme.palette.action.icon }}
                />
              }
              sx={{
                height: "40px",
                display: { xs: "none", md: "flex" },
                textTransform: "none",
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                borderRadius: "8px",
                mr: 1,
                fontSize: "16px", // CHANGED: Set explicit font size
              }}
            >
              Academic Year : 2024 / 2025
            </Button>

            {/* Icon Buttons */}
            <IconButton
              sx={{
                display: { xs: "none", md: "flex" },
                color: theme.palette.action.icon,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
              }}
            >
              <FlagIcon />
            </IconButton>
            <IconButton
              sx={{
                display: { xs: "none", md: "flex" },
                color: theme.palette.action.icon,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
              }}
            >
              <DarkModeOutlinedIcon />
            </IconButton>

            {/* Notifications */}
            <IconButton
              onClick={handleNotificationOpen}
              aria-label="notifications"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
              }}
            >
              <Badge variant="dot" color="error">
                <NotificationsIcon
                  sx={{
                    color: theme.palette.action.icon,
                  }}
                />
              </Badge>
            </IconButton>

            <IconButton
              sx={{
                display: { xs: "none", md: "flex" },
                color: theme.palette.action.icon,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
              }}
            >
              <MessageIcon />
            </IconButton>

            <IconButton
              sx={{
                display: { xs: "none", md: "flex" },
                color: theme.palette.action.icon,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
              }}
            >
              <FullscreenIcon />
            </IconButton>

            {/* User Profile */}
            <IconButton
              onClick={handleProfileMenuOpen}
              color="inherit"
              aria-label="account"
              sx={{ ml: { xs: 0, md: 1 } }}
            >
              <Avatar
                variant="rounded"
                sx={{ width: 40, height: 40 }}
                alt="User"
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        // CHANGED: Apply styles to all MenuItems within this Menu
        slotProps={{
          paper: {
            sx: {
              "& .MuiMenuItem-root": {
                fontSize: "16px",
              },
            },
          },
        }}
      >
        <MenuItem onClick={() => navigate("/dashboard/profile")}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/dashboard/settings")}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notification Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        // CHANGED: Apply styles to all MenuItems within this Menu
        slotProps={{
          paper: {
            sx: {
              "& .MuiMenuItem-root": {
                fontSize: "0.95rem",
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleNotificationClose}>
          <Typography variant="body2" sx={{ fontSize: "inherit" }}>
            New student registration
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationClose}>
          <Typography variant="body2" sx={{ fontSize: "inherit" }}>
            Fee payment received
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationClose}>
          <Typography variant="body2" sx={{ fontSize: "inherit" }}>
            Attendance report ready
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
