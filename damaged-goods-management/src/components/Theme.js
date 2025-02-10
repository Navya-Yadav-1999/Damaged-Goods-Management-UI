import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004080',
    },
    secondary: {
      main: '#f39c12',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

export default theme;
