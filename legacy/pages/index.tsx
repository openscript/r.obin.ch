import { css, Theme } from '@emotion/react';
import { graphql, HeadProps, PageProps } from 'gatsby';
import { Markup } from 'interweave';
import { getImage } from 'gatsby-plugin-image';
import { FormattedMessage } from 'react-intl';
import { BlogItem } from '../components/BlogItem';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { SitePageContextWithMetaData } from '../types';
import { Document } from '../layouts/default/Document';

const recentBlogSectionStyles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;

  h2 {
    grid-column: 1 / 3;
  }

  @media (max-width: ${theme.breakpoints.compact}) {
    grid-template-columns: 1fr;

    h2 {
      grid-column: auto;
    }
  }
`;

export default function IndexPage({ data }: PageProps<Queries.IndexPageQuery, Queries.SitePageContext>) {
  return (
    <DefaultLayout>
      <Markup content={data.slogans?.html} />
      <section css={recentBlogSectionStyles}>
        <h2>
          <FormattedMessage id="page.index.recentBlogs" />
        </h2>
        {data.recentPosts.nodes.map(p => {
          if (!p.fields?.path || !p.frontmatter) {
            return null;
          }

          const featured = getImage(p.frontmatter.featured?.childImageSharp?.gatsbyImageData || null);

          return (
            <BlogItem
              key={p.fields.path}
              excerpt={p.excerpt || ''}
              path={p.fields?.path}
              publishedAt={p.frontmatter?.publishedAt || ''}
              title={p.frontmatter?.title || ''}
              featured={featured}
              titleAs="h3"
            />
          );
        })}
      </section>
    </DefaultLayout>
  );
}

export function Head({ pageContext }: HeadProps<Queries.BlogPageQuery, SitePageContextWithMetaData>) {
  return <Document metaData={{ title: pageContext.metaData.title }} />;
}

export const query = graphql`
  query IndexPage($locale: String) {
    slogans: markdownRemark(fields: { locale: { eq: $locale }, kind: { eq: "sections" }, filename: { glob: "*slogan*" } }) {
      html
    }
    recentPosts: allMdx(
      filter: { fields: { locale: { eq: $locale }, kind: { glob: "blog/**" } }, frontmatter: { draft: { ne: true } } }
      limit: 4
      sort: { frontmatter: { publishedAt: DESC } }
    ) {
      nodes {
        excerpt
        fields {
          path
        }
        frontmatter {
          featured {
            childImageSharp {
              gatsbyImageData(width: 1024, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF], transformOptions: { cropFocus: CENTER })
            }
          }
          title
          publishedAt
        }
      }
    }
  }
`;
