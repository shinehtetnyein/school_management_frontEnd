// theme.js
import { createTheme } from "@mui/material/styles";

const commonThemeProperties = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
      fontSize: "18px",
    },
    h5: {
      fontWeight: 700,
      fontSize: "20px",
    },
    h4: {
      fontWeight: 700,
      fontSize: "22px",
    },
    h3: {
      fontWeight: 700,
      fontSize: "24px",
    },
    h2: {
      fontWeight: 700,
      fontSize: "28px",
    },
    h1: {
      fontWeight: 700,
      fontSize: "32px",
    },
    body1: {
      fontWeight: 500,
      fontSize: "16px",
    },
    body2: {
      fontWeight: 500,
      fontSize: "15px",
    },
    body3: {
      fontWeight: 500,
      fontSize: "14px",
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
    common: {
      black: "#000",
      white: "#fff",
    },
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
      hover: "#333",
      default: "#ffffff",
      paper: "#ffffff",
      secondary: "#f5f7fa",
      primary: "#000", // Dark background
      main: "#E8E9EC",
      back: "#FDB812", // Yellow
      button: "#3f51b5",
      buttonHover: "#303f9f",
    },
    text: {
      primary: "#050505", // Dark text
      secondary: "#65676B", // Gray text
      main: "#AAADBA", // Light gray
      first: "#3f51b5",
    },
    divider: "#e0e0e0",
    action: {
      borderColor: "#ccc",
      borderHover: "#888",
      active: "#0A10C2", // Active blue color
      hover: "#f0f2f5", // Light gray hover
      selected: "#f0f2f5", // Light gray for focused states
      icon: "#555",
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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#999",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#e0e0e0",
          "&:hover": {
            borderColor: "#999",
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...commonThemeProperties,
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
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
      default: "#1a1a1a",
      paper: "#242526",
      secondary: "#2a2a2a",
      primary: "#000", // Dark background
      main: "#161616",
      back: "#FDB812", // Yellow
      button: "#3f51b5",
      buttonHover: "#303f9f",
    },
    text: {
      primary: "#e4e6eb", // Light text
      secondary: "#b0b3b8", // Gray text
      main: "#AAADBA", // Light gray
      first: "#3f51b5",
    },
    divider: "#404040",
    action: {
      active: "#2d88ff", // Active blue color
      hover: "#3a3a3a", // Dark hover
      selected: "#404040",
      icon: "#b0b3b8",
      borderColor: "#404040",
      borderHover: "#606060",
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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#242526",
          borderBottom: "1px solid #404040",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a1a1a",
          borderRight: "1px solid #404040",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#242526",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#242526",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #404040",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#3a3a3a",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#242526",
            "& fieldset": {
              borderColor: "#404040",
            },
            "&:hover fieldset": {
              borderColor: "#606060",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#404040",
          "&:hover": {
            borderColor: "#606060",
            backgroundColor: "#303030",
          },
        },
      },
    },
  },
});
