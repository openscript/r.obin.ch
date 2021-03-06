import { Global, Theme, ThemeProvider } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { ElementType, PropsWithChildren } from 'react';
import { DefaultLayoutQuery } from '../../graphql-types';
import { defaultTheme } from '../themes/defaultTheme';
import { Document } from './default/Document';
import { Footer } from './default/Footer';
import { Header } from './default/Header';
import { Main } from './default/content/Main';
import { defaultSyntaxHighlighting } from '../themes/defaultSyntaxHighlighting';
import { defaultStyles } from '../themes/defaultStyles';

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

type DefaultLayoutProps = PropsWithChildren<{
  theme?: Theme;
  subtitle?: string;
  contentWrapper?: ElementType;
}>;

export function DefaultLayout({ children, theme, subtitle, contentWrapper: ContentWrapper }: DefaultLayoutProps) {
  const data = useStaticQuery<DefaultLayoutQuery>(query);

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <Document subtitle={subtitle} />
      <Global styles={[defaultStyles, defaultSyntaxHighlighting]} />
      <Header />
      {ContentWrapper ? <ContentWrapper>{children}</ContentWrapper> : <Main>{children}</Main>}
      <Footer
        author={data.site?.siteMetadata?.author}
        project={data.site?.siteMetadata?.project}
        version={data.site?.siteMetadata?.version}
        buildTime={data.siteBuildMetadata?.buildTime}
      />
    </ThemeProvider>
  );
}
