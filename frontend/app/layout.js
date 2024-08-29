'use client';

import { Inter } from "next/font/google"; //font
import { ThemeProvider } from '@mui/material/styles';   //makes the theme available to all Material-UI components
import CssBaseline from '@mui/material/CssBaseline';  // consistent baseline of styles across different browsers
import theme from './theme';  // custom theme object from theme.js

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

