# Dark Mode & Light Mode Implementation Guide

## Overview

Your application now has full dark mode and light mode support with automatic theme switching and persistence.

## Architecture

### 1. **Theme Files**

- `src/theme/theme.js` - Defines light and dark themes with all Material-UI component overrides
- `src/theme/context/ThemeContext.jsx` - React Context for managing theme state

### 2. **Hooks**

- `src/hooks/useThemeMode.js` - Custom hook to access theme state and toggle function

### 3. **Components**

- `src/Components/ThemeToggle.jsx` - Reusable theme toggle button component

## Features

✅ **Automatic Persistence** - Theme preference is saved to localStorage
✅ **System Preference Detection** - Automatically detects system dark mode preference on first load
✅ **Comprehensive Styling** - All Material-UI components styled for both modes
✅ **Custom Color Palette** - Extended palette with custom colors
✅ **Smooth Transitions** - All components support smooth theme switching

## Theme Colors

### Light Mode

- Background: `#ffffff`
- Paper: `#ffffff`
- Secondary Background: `#f5f7fa`
- Text Primary: `#050505`
- Text Secondary: `#65676B`

### Dark Mode

- Background: `#1a1a1a`
- Paper: `#242526`
- Secondary Background: `#2a2a2a`
- Text Primary: `#e4e6eb`
- Text Secondary: `#b0b3b8`

## How to Use

### 1. **In Your Main App (Already Done)**

```jsx
import { ThemeProvider } from "./theme/context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouteComponent />
    </ThemeProvider>
  );
}
```

### 2. **Add Theme Toggle to Any Component**

**Option A: Use the ThemeToggle Component**

```jsx
import ThemeToggle from "./Components/ThemeToggle";

export default function MyComponent() {
  return (
    <Box>
      <ThemeToggle size="medium" />
    </Box>
  );
}
```

**Option B: Use the Hook Directly**

```jsx
import useThemeMode from "./hooks/useThemeMode";
import { IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function MyComponent() {
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme}>
      {isDarkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
```

### 3. **Access Theme Values in Components**

```jsx
import { useTheme } from "@mui/material";

export default function MyComponent() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      Content
    </Box>
  );
}
```

## Styled Components Already Updated

✅ AppBar
✅ Drawer/Sidebar
✅ Cards
✅ Paper
✅ Tables
✅ TextFields
✅ Buttons
✅ Menu Items
✅ All Text Elements

## Persistence

- Theme preference is automatically saved to `localStorage` with key `"theme"`
- On page reload, the previously selected theme is restored
- First-time users get the system preference (if available)

## Browser Support

Works in all modern browsers that support:

- localStorage API
- CSS Variables
- `prefers-color-scheme` media query

## Customization

To modify colors, edit:

1. Light theme palette in `src/theme/theme.js` (lines 45-120)
2. Dark theme palette in `src/theme/theme.js` (lines 122-195)
3. Component overrides in respective theme sections

## Currently Integrated

- ✅ Topbar - has theme toggle button
- ✅ All dashboard pages - use theme colors
- ✅ Students component - uses theme
- ✅ StudentList component - uses theme
- ✅ All modals and dialogs - support theme
- ✅ LoginForm - supports theme
