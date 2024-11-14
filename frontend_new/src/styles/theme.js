import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // Dark charcoal - for primary text and important elements
      main: "#24201F",
      light: "#3b3634",
      dark: "#171414",
      contrastText: "#D5C6A1",
    },
    secondary: {
      // Rust/terracotta - for accents and calls to action
      main: "#B26E63",
      light: "#c28a81",
      dark: "#8f584e",
      contrastText: "#ffffff",
    },
    tertiary: {
      // Warm beige - for backgrounds and subtle elements
      main: "#D5C6A1",
      light: "#e2d7bb",
      dark: "#b8a77d",
      contrastText: "#24201F",
    },
    accent: {
      // Soft lavender - for highlights and special elements
      main: "#A7ACD9",
      light: "#bcc0e4",
      dark: "#8990cc",
      contrastText: "#24201F",
    },
    success: {
      // Teal - for success states and nature-themed elements
      main: "#157A6E",
      light: "#1a968c",
      dark: "#0f5951",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#24201F",
      secondary: "#B26E63",
      disabled: "#8f8f8f",
    },
    background: {
      default: "#ffffff",
      paper: "#D5C6A1",
      accent: "#157A6E",
    },
    divider: "rgba(36, 32, 31, 0.12)",
  },

  typography: {
    fontFamily: "var(--font-roboto)",
    h1: {
      fontFamily: "var(--font-federant)",
      color: "#24201F",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "var(--font-federant)",
      color: "#24201F",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "var(--font-federant)",
      color: "#24201F",
      fontWeight: "bold",
    },
    h4: {
      fontFamily: "var(--font-federant)",
      color: "#B26E63", // Using terracotta for subheadings
    },
    h5: {
      fontFamily: "var(--font-federant)",
      color: "#B26E63",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "var(--font-federant)",
      color: "#B26E63",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "var(--font-roboto)",
      color: "#24201F",
    },
    body2: {
      fontFamily: "var(--font-roboto)",
      color: "#24201F",
    },
    button: {
      textTransform: "none", // Prevents all-caps buttons
      fontWeight: 500,
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
          backgroundColor: "#ffffff",
        },
        a: {
          color: "#B26E63", // Terracotta for links
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#D5C6A1", // Warm beige for cards
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#24201F",
          color: "#D5C6A1",
        },
      },
    },
  },
});

export default theme;
