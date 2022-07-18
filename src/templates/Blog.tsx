import { graphql, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { BlogPageQuery } from '../../graphql-types';
import { BlogItem } from '../components/BlogItem';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Blog({ data }: PageProps<BlogPageQuery>) {
  return (
    <DefaultLayout>
      <h1>
        <FormattedMessage id="page.blog.title" />
      </h1>
      {data.posts.nodes.map(post => {
        if (!post.fields?.path || !post.frontmatter?.title) {
          return null;
        }
        return <BlogItem excerpt={post.excerpt} path={post.fields.path} title={post.frontmatter.title} />;
      })}
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
