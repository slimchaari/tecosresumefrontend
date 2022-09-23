import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#8FBB22',
      dark: '#515151',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8FBB22',
      main: '#71736D',
      dark: '#757ce8',
      contrastText: '#fff',
    },
    background: {
        default: "#FAFAFA"
      }
  }
});

export default theme;