import { CssBaseline } from "@mui/material";
import RouteComponent from "./RouteComponent";
import { ThemeProvider } from "./theme/context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouteComponent />
    </ThemeProvider>
  );
}

export default App;
