import { graphql, Link, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { BlogPageQuery } from '../../graphql-types';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Blog({ data }: PageProps<BlogPageQuery>) {
  return (
    <DefaultLayout>
      <h2>
        <FormattedMessage id="page.blog.title" />
      </h2>
      {data.posts.nodes.map(post => (
        <h3>
          <Link to={post.fields?.path || ''}>{post.frontmatter?.title}</Link>
        </h3>
      ))}
    </DefaultLayout>
  );
}

export const query = graphql`
  query BlogPage($locale: String!, $limit: Int!, $skip: Int!) {
    posts: allMdx(
      filter: { fields: { kind: { glob: "blog/**" }, locale: { eq: $locale } } }
      sort: { fields: frontmatter___publishedAt, order: DESC }
      limit: $limit
      skip: $skip
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
