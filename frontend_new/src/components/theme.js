import { createTheme } from '@mui/material/styles';
// import { blue, pink } from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: {
      main: '#24201F',
    },
    text: {
      primary: '#D4C6A1',
    },
  },
  typography: {
    fontFamily: 'var(--font-fauna-one)',
    h1: {
      fontFamily: 'var(--font-federant)',
    },
    h2: {
      fontFamily: 'var(--font-federant)',
    },
    h3: {
      fontFamily: 'var(--font-federant)',
    },
    h4: {
      fontFamily: 'var(--font-federant)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
      `,
    },
  },
});

export default theme;
