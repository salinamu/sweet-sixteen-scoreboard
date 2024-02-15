import { pink, red } from '@mui/material/colors';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import '../App.css'

export const themeOptions = createTheme ( {
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#E92299',
    },
    secondary: {
      main: '#f50057',
    },

   
   
  },

  
});