import { graphql, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { BlogListingPageQuery } from '../../graphql-types';
import { BlogItem } from '../components/BlogItem';
import { Pagination } from '../components/Pagination';
import { TagList } from '../components/TagList';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { PaginationContext } from '../types';

export default function BlogListing({ data, pageContext }: PageProps<BlogListingPageQuery, PaginationContext>) {
  return (
    <DefaultLayout>
      <h1>
        <FormattedMessage id="page.blog.title" />
      </h1>
      {data.posts.nodes.map(post => {
        if (!post.fields?.path || !post.frontmatter?.title || typeof post.frontmatter.publishedAt !== 'string') {
          return null;
        }
        const tagList = <TagList locale={post.fields.locale} tags={post.fields.tags} />;
        return (
          <BlogItem
            excerpt={post.excerpt}
            path={post.fields.path}
            title={post.frontmatter.title}
            publishedAt={post.frontmatter.publishedAt}
            tagList={tagList}
          />
        );
      })}
      <Pagination currentPage={pageContext.currentPage} pageCount={pageContext.pageCount} />
    </DefaultLayout>
  );
}

export const query = graphql`
  query BlogListingPage($locale: String!, $limit: Int!, $skip: Int!) {
    posts: allMdx(
      filter: { fields: { kind: { glob: "blog/**" }, locale: { eq: $locale } }, frontmatter: { draft: { ne: true } } }
      sort: { fields: frontmatter___publishedAt, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt
        fields {
          locale
          path
          tags {
            slug
            title
          }
        }
        frontmatter {
          title
          publishedAt
        }
      }
    }
  }
`;