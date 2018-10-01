import { blue, pink } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';

export const themeColors = {
    primary: blue,
    secondary: pink,
};

export const theme = createMuiTheme({
    palette: themeColors,
  });