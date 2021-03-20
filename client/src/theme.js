import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// We can customize theme here
const theme = createMuiTheme({
  palette: {},
});

// add responsive font sizes to typography
const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
