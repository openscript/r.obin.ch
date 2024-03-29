import { css, Theme } from '@emotion/react';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/700.css';
import '@fontsource/rajdhani/400.css';
import '@fontsource/rajdhani/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/700-italic.css';

export const defaultStyles = (theme: Theme) => css`
  html {
    height: 100%;
    min-width: 320px;
    font-size: 16px;

    @media (max-width: ${theme.breakpoints.compact}) {
      font-size: 14px;
    }

    @media (max-width: ${theme.breakpoints.minimum}) {
      font-size: 12px;
    }
  }

  body,
  #___gatsby,
  #gatsby-focus-wrapper,
  main {
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 100%;
    font-family: ${theme.fonts.paragraph};
  }

  header,
  main,
  footer,
  #top-bar {
    padding: 0 10%;

    @media (max-width: ${theme.breakpoints.tiny}) {
      padding: 0 2.5rem;
    }

    @media (max-width: ${theme.breakpoints.compact}) {
      padding: 0 2rem;
    }

    @media (max-width: ${theme.breakpoints.minimum}) {
      padding: 0 1.5rem;
    }

    @media (min-width: ${theme.breakpoints.big}) {
      padding: 0 15%;
    }

    @media (min-width: ${theme.breakpoints.huge}) {
      padding: 0 20%;
    }
  }

  main {
    background-color: ${theme.colors.white};

    a {
      color: ${theme.colors.primary};
      text-decoration: none;
    }
  }

  header,
  #top-bar,
  footer {
    font-family: ${theme.fonts.headings};

    a {
      text-decoration: none;
      color: ${theme.colors.bright};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1em;
    font-family: ${theme.fonts.headings};
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
  }

  h2 {
    font-size: 1.6rem;
    margin-top: 2.5rem;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }

  code {
    font-family: ${theme.fonts.listings};
  }

  article {
    table {
      border-collapse: collapse;
      width: 100%;

      th,
      td {
        padding: 0.3rem;
        border: 1px solid ${theme.colors.primary};
      }

      tr:hover {
        background-color: ${theme.colors.bright};
      }
    }
  }

  button,
  .button {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.bright};
    padding: 0.4rem;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`;
