import { Theme } from '@emotion/react';

export const defaultTheme: Theme = {
  colors: {
    primary: '#6a4a3c',
    secondary: '#eb6841',
    white: '#ffffff',
    bright: '#eeeeee',
    dark: '#333333',
  },
  fonts: {
    headings: "'Rajdhani', sans-serif",
    paragraph: "'Poppins','Roboto', sans-serif",
    listings: "'IBM Plex Mono', monospace",
  },
  breakpoints: {
    minimum: '480px',
    compact: '800px',
    tiny: '1280px',
    small: '1440px',
    medium: '1600px',
    big: '1920px',
    huge: '2560px',
  },
};
