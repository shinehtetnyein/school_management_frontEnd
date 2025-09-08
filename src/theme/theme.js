// theme.js
import { createTheme } from "@mui/material/styles";

const commonThemeProperties = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: "16px",
    },
    h5: {
      fontWeight: 600,
      fontSize: "18px",
    },
    h4: {
      fontWeight: 600,
      fontSize: "20px",
    },
    h3: {
      fontWeight: 600,
      fontSize: "22px",
    },
    h2: {
      fontWeight: 600,
      fontSize: "24px",
    },
    h1: {
      fontWeight: 600,
      fontSize: "26px",
    },
    body1: {
      fontWeight: 500,
      fontSize: "15px",
    },
    body2: {
      fontWeight: 500,
      fontSize: "14px",
    },
    body3: {
      fontWeight: 500,
      fontSize: "13px",
    },
    caption: {
      fontWeight: 400,
      fontSize: "12px",
    },
    span: {
      fontWeight: 400,
      fontSize: "16px",
    },
  },
};

export const lightTheme = createTheme({
  ...commonThemeProperties,
  palette: {
    mode: "light",
    primary: {
      main: "#0A10C2", // Facebook-like blue
      secondary: "#0098F5", // Gray
      first: " #1CA9FF",
      error: "#F37A73", // light red
    },
    secondary: {
      main: "#65676B", // Gray
      success: "#198754", // Green
      heart: "#FF0000",
      gray: "#4E5159",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
      secondary: "#f0f2f5",
      primary: "#000", // Dark background
      main: "#E8E9EC",
      back: "#FDB812", // Yellow
    },
    text: {
      primary: "#050505", // Dark text
      secondary: "#65676B", // Gray text
      main: "#AAADBA", // Light gray
    },
    action: {
      active: "#0A10C2", // Active blue color
      hover: "#f0f2f5", // Light gray hover
      selected: "#f0f2f5", // Light gray for focused states
    },
    custom: {
      placeholderText: "rgba(148, 148, 148, 1)", // Placeholder text color
      inputText: "#000000", // Black color for actual input text
      iconColor: "rgba(148, 148, 148, 1)", // Icon color
      activeFilter:
        "brightness(0) saturate(100%) invert(12%) sepia(98%) saturate(5044%) hue-rotate(239deg) brightness(91%) contrast(119%)",
      inactiveFilterLight:
        "brightness(0) saturate(100%) invert(39%) sepia(8%) saturate(1233%) hue-rotate(177deg) brightness(93%) contrast(86%)",
      inactiveFilterDark:
        "brightness(0) saturate(100%) invert(80%) sepia(6%) saturate(350%) hue-rotate(178deg) brightness(89%) contrast(86%)",
      activeGradient: "linear-gradient(45deg, #0A10C2 30%, #0098F5 90%)",
      hoverGradient: "linear-gradient(45deg, #0098F5 30%, #0A10C2 90%)",
      newGradient: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
    },
  },
});

export const darkTheme = createTheme({
  ...commonThemeProperties,
  palette: {
    mode: "dark",
    primary: {
      main: "#0A10C2", // Facebook-like blue
      secondary: "#0098F5", // Gray
      first: " #1CA9FF",
      error: "#F37A73", // light red
    },
    secondary: {
      main: "#b0b3b8", // Lighter gray
      success: "#198754", // Green
      heart: "#FF0000",
      gray: "#4E5159",
    },
    background: {
      default: "#232323",
      paper: "#242526",
      secondary: "#4E5159",
      primary: "#000", // Dark background
      main: "#101010",
      back: "#FDB812", // Yellow
    },
    text: {
      primary: "#e4e6eb", // Light text
      secondary: "#b0b3b8", // Gray text
      main: "#AAADBA", // Light gray
    },
    action: {
      active: "#2d88ff", // Active blue color
      hover: "#4E5159", // Dark hover
      selected: "#4E5159",
    },
    custom: {
      placeholderText: "rgba(148, 148, 148, 1)", // Placeholder text color
      inputText: "#e4e6eb", // Light text for dark mode
      iconColor: "rgba(148, 148, 148, 1)", // Icon color
      activeFilter:
        "brightness(0) saturate(100%) invert(12%) sepia(98%) saturate(5044%) hue-rotate(239deg) brightness(91%) contrast(119%)",
      inactiveFilterLight:
        "brightness(0) saturate(100%) invert(39%) sepia(8%) saturate(1233%) hue-rotate(177deg) brightness(93%) contrast(86%)",
      inactiveFilterDark:
        "brightness(0) saturate(100%) invert(80%) sepia(6%) saturate(350%) hue-rotate(178deg) brightness(89%) contrast(86%)",
      activeGradient: "linear-gradient(45deg, #0A10C2 30%, #0098F5 90%)",
      hoverGradient: "linear-gradient(45deg, #0098F5 30%, #0A10C2 90%)",
      newGradient: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
    },
  },
});
