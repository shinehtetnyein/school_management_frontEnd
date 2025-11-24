import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    // Keep cookie in sync so DataServices (which reads cookies) can find the token
    try {
      Cookies.set("access_token", token, { path: "/" });
    } catch (e) {
      console.warn("Failed to set access_token cookie:", e);
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    try {
      localStorage.removeItem("refresh_token");
    } catch (e) {
      console.warn("Failed to remove refresh_token from localStorage:", e);
    }
    try {
      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
    } catch (e) {
      console.warn("Failed to remove auth cookies:", e);
    }
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!(localStorage.getItem("token") || Cookies.get("access_token"));
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
