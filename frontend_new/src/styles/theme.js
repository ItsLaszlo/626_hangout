import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#24201F",
      light: "#3b3634",
      dark: "#0d0b0b",
      contrastText: "#D4C6A1",
    },
    secondary: {
      // For accents/highlights
      main: "#D4C6A1",
      light: "#dcd1b4",
      dark: "#bfad7e",
      contrastText: "#24201F",
    },
    text: {
      primary: "#24201F",
      secondary: "#24201F",
    },
    background: {
      default: "#157a6e",
      paper: "#e8e0c9",
    },
  },

  typography: {
    fontFamily: "var(--font-roboto)",
    h1: {
      fontFamily: "var(--font-federant)",
    },
    h2: {
      fontFamily: "var(--font-federant)",
    },
    h3: {
      fontFamily: "var(--font-federant)",
      fontWeight: "bold",
    },
    h4: {
      fontFamily: "var(--font-federant)",
    },
    h5: {
      fontFamily: "var(--font-federant)",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "var(--font-federant)",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "var(--font-roboto)",
    },
    body2: {
      fontFamily: "var(--font-roboto)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          maxWidth: "100vw",
          overflowX: "hidden",
          backgroundColor: "#157a6e", // Explicitly set background
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
// Purpose: Customizes Material UI component default styles
