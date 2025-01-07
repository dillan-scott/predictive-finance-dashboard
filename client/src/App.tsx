import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "@/theme.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/scenes/Dashboard";
import NavBar from "@/components/NavBar";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 2rem 2rem">
            <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>{" "}
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
