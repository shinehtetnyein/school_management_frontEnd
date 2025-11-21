import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  InputAdornment,
  IconButton,
  useTheme,
  Fade,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  School,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Configuration from "../services/configuration";
import DataServices from "../services/data-services";
import GoogleAuthService from "../services/google-auth-service";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const config = new Configuration();
  const dataServices = new DataServices();
  const googleAuthService = new GoogleAuthService();

  const roles = [
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
    { value: "parent", label: "Parent" },
    { value: "librarian", label: "Librarian" },
    { value: "accountant", label: "Accountant" },
    { value: "admin", label: "Admin" },
  ];

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password, role } = formData;

    if (!email || !password || !role) {
      showSnackbar("Please fill in all fields and select a role.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await dataServices.authorize(
        { email, password, role },
        config.SERVICE_NAME + config.SERVICE_ACTION_LOGIN
      );

      if (response.data?.token) {
        const { user, token } = response.data;

        // Use auth context to login
        login(user, token);

        showSnackbar("Login successful! Redirecting...", "success");

        // Navigate to intended page or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        showSnackbar(
          response?.message || "Invalid credentials or role.",
          "error"
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      let errorMsg = "Something went wrong. Please try again.";

      if (error.response?.status === 422) {
        // Handle validation errors
        const errors = error.response.data?.errors;
        if (errors) {
          errorMsg = Object.values(errors).flat().join(" ");
        } else {
          errorMsg = error.response.data?.message || "Validation failed";
        }
      } else if (error.response?.status === 401) {
        errorMsg = "Invalid email or password";
      } else if (error.response?.status === 403) {
        errorMsg = "You are not authorized for this role";
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.request) {
        errorMsg = "Network error. Please check your connection.";
      }

      showSnackbar(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      googleAuthService.initiateGoogleLogin();
    } catch (error) {
      console.error("Google login initiation error:", error);
      showSnackbar(
        "Failed to initiate Google login. Please try again.",
        "error"
      );
      setLoading(false);
    }
  };

  // Don't render if already authenticated (will redirect)
  if (isAuthenticated()) {
    return null;
  }

  return (
    <Container
      maxWidth="100%"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.custom.activeGradient,
        py: 4,
      }}
    >
      <Fade in={true} timeout={800}>
        <Card
          elevation={16}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            minHeight: "600px",
            width: "100%",
            maxWidth: "1000px",
            background: theme.palette.background.default,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Grid container sx={{ minHeight: "600px" }}>
            {/* Left Illustration */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                background: theme.palette.custom.activeGradient,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Box sx={{ textAlign: "center", color: "white", zIndex: 2 }}>
                <School sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                  Campus Portal
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.9, maxWidth: 300, mx: "auto", mb: 4 }}
                >
                  Access your academic records, course materials, and campus
                  resources
                </Typography>
              </Box>
            </Grid>

            {/* Right Login Form */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                p: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: theme.palette.background.default,
              }}
            >
              <Box sx={{ maxWidth: 400, mx: "auto", width: "100%" }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <School
                    sx={{
                      fontSize: 48,
                      color: theme.palette.primary.secondary,
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.secondary,
                      mb: 1,
                    }}
                  >
                    Login
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.secondary.gray }}
                  >
                    Sign in to your account
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <TextField
                    fullWidth
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    margin="normal"
                    required
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    select
                    label="Select Role"
                    value={formData.role}
                    onChange={handleInputChange("role")}
                    margin="normal"
                    required
                    disabled={loading}
                  >
                    {roles.map((r) => (
                      <MenuItem key={r.value} value={r.value}>
                        {r.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    margin="normal"
                    required
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            disabled={loading}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2, height: "48px" }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  {/* Divider */}
                  <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
                    <Divider sx={{ flex: 1 }} />
                    <Typography
                      variant="caption"
                      sx={{
                        mx: 1,
                        color: theme.palette.secondary.gray,
                        fontWeight: 500,
                      }}
                    >
                      OR
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                  </Box>

                  {/* Google Login Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    disabled={loading}
                    onClick={handleGoogleLogin}
                    sx={{
                      height: "48px",
                      borderColor: theme.palette.divider,
                      color: theme.palette.text.primary,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Fade>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;
