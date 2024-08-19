import { graphql, Link, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function BlogTag({ data }: PageProps<Queries.TagPageQuery>) {
  return (
    <DefaultLayout>
      <h1>
        <FormattedMessage id="page.blog.title" />
      </h1>
      {data.posts.nodes.map(post => (
        <h3>
          <Link to={post.fields?.path || ''}>{post.frontmatter?.title}</Link>
        </h3>
      ))}
    </DefaultLayout>
  );
}

export const query = graphql`
  query TagPage($tag: String!, $locale: String!, $limit: Int!, $skip: Int!) {
    posts: allMdx(
      filter: {
        fields: { kind: { glob: "blog/**" }, locale: { eq: $locale }, tags: { elemMatch: { slug: { glob: $tag } } } }
        frontmatter: { draft: { ne: true } }
      }
      sort: { frontmatter: { publishedAt: DESC } }
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

export { Head } from '../layouts/default/Document';
