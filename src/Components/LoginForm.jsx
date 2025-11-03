// src/components/LoginForm.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Avatar, // For Logo
  useTheme,
} from "@mui/material";

// --- Icons to match the new image ---
import LockOutlined from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import Facebook from "@mui/icons-material/Facebook";
import Google from "@mui/icons-material/Google";
import Apple from "@mui/icons-material/Apple";
import ChevronRight from "@mui/icons-material/ChevronRight";
import School from "@mui/icons-material/School"; // Placeholder for 'P' logo
import SignUpForm from "./SignUpForm";

// Dummy data for the "What's New" section
const newsItems = [
  {
    title: "Summer Vacation Holiday Homework",
    subtitle: "The school will remain closed from April 20th to June...",
  },
  {
    title: "New Academic Session Admission Start(2024-25)",
    subtitle: "An academic term is a portion of an academic year, the time ...",
  },
  {
    title: "Date sheet Final Exam Nursery to Sr.Kg",
    subtitle:
      "Dear Parents, As the final examination for the session 2024-25 is ...",
  },
  {
    title: "Annual Day Function",
    subtitle:
      "Annual functions provide a platform for students to showcase their...",
  },
];

function LoginForm() {
  const theme = useTheme();
  // States from your original file (but 'role' is removed)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Simplified handleSubmit since 'role' is removed
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // ---
      // NOTE: The 'role' logic was here.
      // You will need to add your new login logic.
      // e.g., navigate("/dashboard");
      // ---
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default, // Light gray background for the page
      }}
    >
      <Grid container sx={{ width: "100%" }}>
        {/* Left Column - "What's New" */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            p: 4,
            display: { xs: "none", md: "flex" }, // Hide on small screens
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // Placeholder background image
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1661883964924-81e5c36f32ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&::before": {
              // This creates the blue tint overlay
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme.palette.custom.activeGradient, // Blue overlay
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              p: 3,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white panel
              backdropFilter: "blur(10px)", // Frosted glass effect
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "white", mb: 3 }}
            >
              What's New on Preskool !!!
            </Typography>
            <List sx={{ p: 0 }}>
              {newsItems.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)", // Solid white item background
                    borderRadius: 2,
                    mb: 1.5,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  secondaryAction={
                    <IconButton edge="end" sx={{ color: "primary.main" }}>
                      <ChevronRight />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, color: "#333" }}
                      >
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#555",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.subtitle}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Right Column - Login Form */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          {isSignUp ? (
            <SignUpForm onSwitchToLogin={() => setIsSignUp(false)} />
          ) : (
            <Box
              sx={{
                mx: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Logo Placeholder */}
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#3f51b5",
                      mx: "auto",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <School /> {/* Placeholder Icon */}
                  </Avatar>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#333", mt: 1 }}
                  >
                    PreSkool
                  </Typography>
                </Box>
                <Card
                  sx={{
                    // MODIFIED: Padding increased and shadow/border changed
                    p: { xs: 3, md: 4 }, // Increased padding
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.divider}`, // Alternative: Use border if you want
                    width: "70%",
                    mx: "auto",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      color: theme.palette.text.primary,
                      mb: 1,
                      // MODIFIED: Removed textAlign: "center"
                    }}
                  >
                    Welcome
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      // MODIFIED: Removed textAlign: "center"
                    }}
                  >
                    Please enter your details to sign in
                  </Typography>

                  {/* Social Logins */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Facebook sx={{ fontSize: "20px" }} />}
                        sx={{
                          height: "50px",
                          width: "100%",
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.button,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor:
                              theme.palette.background.buttonHover,
                          },
                        }}
                      >
                        {/* MODIFIED: Removed text "Facebook" */}
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Google sx={{ fontSize: "20px" }} />}
                        sx={{
                          height: "50px",
                          width: "100%",
                          textTransform: "none",
                          color: theme.palette.action.icon,
                          borderColor: theme.palette.action.borderColor,
                          "&:hover": {
                            borderColor: theme.palette.action.borderHover,
                          },
                        }}
                      >
                        {/* MODIFIED: Removed text "Google" */}
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Apple sx={{ fontSize: "20px" }} />}
                        sx={{
                          height: "50px",
                          width: "100%",
                          backgroundColor: theme.palette.background.primary,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: theme.palette.background.hover,
                          },
                        }}
                      >
                        {/* MODIFIED: Removed text "Apple" */}
                      </Button>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }}>Or</Divider>

                  {showSuccess && (
                    <Alert
                      severity="success"
                      sx={{ mb: 3 }}
                      onClose={() => setShowSuccess(false)}
                    >
                      Login successful! Welcome back.
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.primary }}
                    >
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="dense"
                      required
                      size="small"
                      sx={{ mb: 2 }}
                      InputProps={{
                        // MODIFIED: Icon moved from startAdornment...
                        // ...to endAdornment
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmailOutlined
                              sx={{ color: theme.palette.action.icon }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.primary }}
                    >
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      margin="dense"
                      required
                      size="small"
                      sx={{ mb: 1 }}
                      InputProps={{
                        // MODIFIED: Removed startAdornment (the lock icon)
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff
                                  sx={{ color: theme.palette.action.icon }}
                                />
                              ) : (
                                <Visibility
                                  sx={{ color: theme.palette.action.icon }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember Me"
                      />
                      <Button
                        variant="text"
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          color: theme.palette.secondary.heart, // Red color for forgot password
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        Forgot Password?
                      </Button>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.2,
                        backgroundColor: theme.palette.background.button, // Solid blue color
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: theme.palette.background.buttonHover,
                        },
                      }}
                    >
                      Sign In
                    </Button>

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                      <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Don&apos;t have an account?{" "}
                        <Button
                          variant="text"
                          onClick={() => setIsSignUp(true)}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            color: theme.palette.text.first, // Blue link
                          }}
                        >
                          Create Account
                        </Button>
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          )}
          {/* Copyright Footer */}
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mt: isSignUp ? 8 : 4 }}
          >
            Copyright © 2025 - Preskool
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
