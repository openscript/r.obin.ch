import { graphql, HeadProps, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { BlogItem } from '../components/BlogItem';
import { Pagination } from '../components/Pagination';
import { TagList } from '../components/TagList';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { PaginationContext, SitePageContextWithMetaData } from '../types';
import { Document } from '../layouts/default/Document';

export default function BlogListing({ data, pageContext }: PageProps<Queries.BlogListingPageQuery, PaginationContext>) {
  return (
    <DefaultLayout>
      <h1>
        <FormattedMessage id="page.blog.title" />
      </h1>
      {data.posts.nodes.map(post => {
        if (
          !post.fields?.path ||
          !post.fields.locale ||
          !post.frontmatter?.title ||
          !post.excerpt ||
          typeof post.frontmatter.publishedAt !== 'string'
        ) {
          return null;
        }
        const tagList = <TagList locale={post.fields.locale} tags={post.fields.tags as any} />;
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

export function Head({ pageContext }: HeadProps<Queries.BlogPageQuery, SitePageContextWithMetaData>) {
  return <Document metaData={{ title: pageContext.metaData.title }} />;
}

export const query = graphql`
  fragment BlogListingPageNodes on Mdx {
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

  query BlogListingPage($locale: String!, $limit: Int!, $skip: Int!) {
    posts: allMdx(
      filter: { fields: { kind: { glob: "blog/**" }, locale: { eq: $locale } }, frontmatter: { draft: { ne: true } } }
      sort: { frontmatter: { publishedAt: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...BlogListingPageNodes
      }
    }
  }
`;
