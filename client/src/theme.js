import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// We can customize theme here
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Inter'],
  },
  palette: {
    primary: {
      main: '#8390FA',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F9E9EC',
      contrastText: '#000',
    },
  },
});

// add responsive font sizes to typography
const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
