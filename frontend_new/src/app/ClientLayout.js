"use client";
import { Container } from "@mui/material";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";

export default function ClientLayout({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="lg">
          <main>{children}</main>
        </Container>
      </ThemeProvider>
    </>
  );
}

// Purpose: Wraps and Renders all components in the client side
// Why: Material UI components require client-side interactivity
