'use client';

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
const theme = createTheme({
  //define theme for materialUI components and returns a theme object that can be used with the ThemeProvider component.
  palette: {
    primary: {
      main: '#C9C5C5',
    },
    secondary: {
      main: '#00275D',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

// define visual appearance. consistent font, color scheme, and spacing
