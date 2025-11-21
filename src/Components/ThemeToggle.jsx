import { IconButton, Tooltip, useTheme } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import useThemeMode from "../hooks/useThemeMode";

const ThemeToggle = ({ size = "medium" }) => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <Tooltip
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <IconButton
        color="inherit"
        onClick={toggleTheme}
        size={size}
        sx={{
          color: theme.palette.text.primary,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
