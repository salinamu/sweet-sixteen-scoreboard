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
      main: 'rgb(101, 79, 233)',
      mainGradient: 'linear-gradient(0deg, rgb(255, 255, 255), rgb(244, 230, 255))',

    },
    secondary: {
      main: 'rgb(101, 79, 233)',
      mainGradient: 'linear-gradient(90deg, #fde1f8, #f5e6ff, #edeaff, #e7efff, #e2f3ff, #e1f6ff, #e2f9ff, #e6fbfd)',

    },
   
   
  },
button: {
  borderRadius: '100px'

},
  
}
);