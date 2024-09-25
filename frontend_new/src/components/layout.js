'use client';
import { Container } from '@mui/material';
import NavBar from './NavBar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
export default function Layout({ children }) {
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
