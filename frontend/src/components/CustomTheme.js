import { pink, red } from '@mui/material/colors';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import '../App.css'

export const theme = createTheme ( {
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#654FE9',
      mainGradient: 'linear-gradient(0deg, rgb(255, 255, 255), rgb(244, 230, 255))',

    },
    secondary: {
      main: '#654FE9',
      mainGradient: 'linear-gradient(90deg, rgb(255, 230, 253, 100%), rgb(231, 253, 253, 100%))',

    },
   
   
  },
button: {
  borderRadius: '100px'

},
  
}
);