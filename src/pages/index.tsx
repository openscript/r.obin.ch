import { css, Theme } from '@emotion/react';
import { graphql, PageProps } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FormattedMessage } from 'react-intl';
import { IndexPageQuery, SitePageContext } from '../../graphql-types';
import { BlogItem } from '../components/BlogItem';
import { DefaultLayout } from '../layouts/DefaultLayout';

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

export default function IndexPage({ data }: PageProps<IndexPageQuery, SitePageContext>) {
  return (
    <DefaultLayout>
      <MDXRenderer>{data.slogans?.body || ''}</MDXRenderer>
      <section css={recentBlogSectionStyles}>
        <h2>
          <FormattedMessage id="page.index.recentBlogs" />
        </h2>
        {data.recentPosts.nodes.map(p => {
          if (!p.fields?.path || !p.frontmatter) {
            return null;
          }

          const featured = getImage(p.frontmatter.featured?.childImageSharp?.gatsbyImageData);

          return (
            <BlogItem
              key={p.fields.path}
              excerpt={p.excerpt}
              path={p.fields?.path}
              publishedAt={p.frontmatter?.publishedAt}
              title={p.frontmatter?.title}
              featured={featured}
              titleAs="h3"
            />
          );
        })}
      </section>
    </DefaultLayout>
  );
}

export const query = graphql`
  query IndexPage($locale: String) {
    slogans: mdx(fields: { locale: { eq: $locale }, kind: { eq: "sections" }, filename: { glob: "*slogan*" } }) {
      body
    }
    recentPosts: allMdx(
      filter: { fields: { locale: { eq: $locale }, kind: { glob: "blog/**" } }, frontmatter: { draft: { ne: true } } }
      limit: 4
      sort: { fields: frontmatter___publishedAt, order: DESC }
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
