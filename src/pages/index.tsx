import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FormattedMessage } from 'react-intl';
import { IndexPageQuery, SitePageContext } from '../../graphql-types';
import { BlogItem } from '../components/BlogItem';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function IndexPage({ data }: PageProps<IndexPageQuery, SitePageContext>) {
  return (
    <DefaultLayout>
      <MDXRenderer>{data.slogans?.body || ''}</MDXRenderer>
      <h2>
        <FormattedMessage id="page.index.recentBlogs" />
      </h2>
      {data.recentPosts.nodes.map(p => {
        if (!p.fields?.path || !p.frontmatter) {
          return null;
        }

        return (
          <BlogItem excerpt={p.excerpt} path={p.fields?.path} publishedAt={p.frontmatter?.publishedAt} title={p.frontmatter?.title} titleAs="h3" />
        );
      })}
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
      limit: 5
      sort: { fields: frontmatter___publishedAt, order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          path
        }
        frontmatter {
          title
          publishedAt
        }
      }
    }
  }
`;
