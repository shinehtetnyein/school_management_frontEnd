import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";

const GoogleCallbackHandler = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const hasRun = useRef(false); // <- prevents infinite loops

  console.log("GoogleCallbackHandler rendered");

  useEffect(() => {
    // Prevent multiple runs
    if (hasRun.current) return;
    hasRun.current = true;

    console.log("useEffect triggered");

    const handleCallback = async () => {
      try {
        const token = searchParams.get("token");
        const userJson = searchParams.get("user");
        const errorMsg = searchParams.get("error");

        console.log(
          "Callback received - Token:",
          token ? "Yes" : "No",
          "User:",
          userJson ? "Yes" : "No"
        );

        if (errorMsg) {
          setError(decodeURIComponent(errorMsg));
          setTimeout(() => navigate("/login", { replace: true }), 2000);
          return;
        }

        if (!token || !userJson) {
          setError("Missing authentication data. Please try again.");
          setTimeout(() => navigate("/login", { replace: true }), 2000);
          return;
        }

        const user = JSON.parse(decodeURIComponent(userJson));
        console.log("Parsed user:", user);

        // Login once
        login(user, token);

        console.log("Login called, redirecting to dashboard...");

        setTimeout(() => {
          console.log("Attempting redirect to dashboard...");
          navigate("/dashboard", { replace: true });
        }, 300);
      } catch (err) {
        console.error("Google callback error:", err);
        setError("An error occurred during authentication: " + err.message);
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    };

    handleCallback();
  }, []); // <- runs ONCE only

  if (error) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Typography color="textSecondary">
            Redirecting to login page...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography color="textSecondary">
          Processing your Google login...
        </Typography>
      </Box>
    </Container>
  );
};

export default GoogleCallbackHandler;
