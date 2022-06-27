import { css, Global, Theme, ThemeProvider } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { PropsWithChildren, ReactNode } from 'react';
import { DefaultLayoutQuery } from '../../graphql-types';
import { defaultTheme } from '../themes/defaultTheme';
import { Document } from './default/Document';
import { Footer } from './default/Footer';
import { Header } from './default/Header';
import { Main } from './default/Main';

const query = graphql`
  query DefaultLayout {
    site {
      siteMetadata {
        author
        description
        siteUrl
        title
        version
        project
      }
    }
    siteBuildMetadata {
      buildTime
    }
  }
`;

const globalStyles = (theme: Theme) => css`
  html {
    height: 100%;
  }

  body,
  #___gatsby,
  #gatsby-focus-wrapper,
  main {
    margin: 0;
    font-size: 16px;
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

    @media (min-width: ${theme.breakpoints.big}) {
      padding: 0 15%;
    }

    @media (min-width: ${theme.breakpoints.huge}) {
      padding: 0 20%;
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
    font-family: ${theme.fonts.headings};
  }

  code {
    font-family: ${theme.fonts.listings};
  }
`;

type DefaultLayoutProps = PropsWithChildren<{
  theme?: Theme;
  subtitle?: string;
  contentWrapper?: ReactNode;
}>;

export function DefaultLayout({ children, theme, subtitle, contentWrapper: ContentWrapper }: DefaultLayoutProps) {
  const data = useStaticQuery<DefaultLayoutQuery>(query);

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <Document subtitle={subtitle} />
      <Global styles={globalStyles} />
      <Header />
      {ContentWrapper ?? <Main>{children}</Main>}
      <Footer
        author={data.site?.siteMetadata?.author}
        project={data.site?.siteMetadata?.project}
        version={data.site?.siteMetadata?.version}
        buildTime={data.siteBuildMetadata?.buildTime}
      />
    </ThemeProvider>
  );
}
