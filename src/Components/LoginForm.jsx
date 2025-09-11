// src/components/LoginForm.jsx
import React, { useState } from "react";
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
  Alert,
} from "@mui/material";
import Lock from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Email from "@mui/icons-material/Email";
import Person from "@mui/icons-material/Person";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && role) {
      if (role === "admin") {
        navigate("/admin");
        return;
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        height: "97vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        elevation={24}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          minHeight: "600px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Grid container sx={{ minHeight: "600px" }}>
          {/* Left Column - Login Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {isSignUp ? (
              <SignUpForm onSwitchToLogin={() => setIsSignUp(false)} />
            ) : (
              <Box sx={{ maxWidth: 400, mx: "auto", width: "100%" }}>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: "#2c3e50",
                    mb: 1,
                  }}
                >
                  Welcome Back
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#7f8c8d",
                    mb: 4,
                  }}
                >
                  Please sign in to your account
                </Typography>

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
                  <TextField
                    select
                    fullWidth
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    margin="normal"
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    sx={{ mb: 4 }}
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
                    size="large"
                    sx={{
                      py: 1.5,
                      background:
                        "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                        boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                      },
                    }}
                  >
                    Sign In
                  </Button>

                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                      Don&apos;t have an account?{" "}
                      <Button
                        variant="text"
                        onClick={() => setIsSignUp(true)}
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          color: "#667eea",
                        }}
                      >
                        Sign up here
                      </Button>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>

          {/* Right Column - Illustration */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background:
                "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ textAlign: "center", color: "white", zIndex: 2 }}>
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                style={{ marginBottom: "2rem" }}
              >
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="rgba(255,255,255,0.1)"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="80"
                  fill="rgba(255,255,255,0.15)"
                />
                <circle cx="150" cy="120" r="25" fill="white" />
                <path
                  d="M125 160 L175 160 L175 200 Q175 210 165 210 L135 210 Q125 210 125 200 Z"
                  fill="white"
                />
                <path
                  d="M150 80 L130 90 L130 110 Q130 125 150 135 Q170 125 170 110 L170 90 Z"
                  fill="rgba(255,255,255,0.9)"
                />
                <path
                  d="M150 85 L135 92 L135 108 Q135 118 150 125 Q165 118 165 108 L165 92 Z"
                  fill="#667eea"
                />
                <path
                  d="M145 105 L148 108 L155 98"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Secure Access
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, maxWidth: 250, mx: "auto" }}
              >
                Your data is protected with enterprise-grade security and
                encryption
              </Typography>
            </Box>

            {/* Floating elements */}
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "10%",
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                animation: "float 6s ease-in-out infinite",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "20%",
                right: "15%",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                animation: "float 4s ease-in-out infinite reverse",
              }}
            />

            <style>
              {`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-20px); }
                }
              `}
            </style>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default LoginForm;
