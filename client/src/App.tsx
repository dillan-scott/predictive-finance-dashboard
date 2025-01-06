import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "@/theme.ts";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          HELLO
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
