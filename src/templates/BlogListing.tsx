import { graphql, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { SitePageContext } from 'gatsby-plugin-i18n-l10n/types';
import { BlogItem } from '../components/BlogItem';
import { Pagination } from '../components/Pagination';
import { TagList } from '../components/TagList';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { PaginationContext } from '../types';

export default function BlogListing({ data, pageContext }: PageProps<Queries.BlogListingPageQuery, SitePageContext & PaginationContext>) {
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
          (post.fields.locale !== pageContext.locale && post.fields.translations?.length !== 0) ||
          typeof post.frontmatter.publishedAt !== 'string'
        ) {
          return null;
        }
        const tagList = <TagList locale={post.fields.locale} tags={post.fields.tags as any} />;
        const nonDefaultLanguage = post.fields.locale !== pageContext.locale ? post.fields.locale : undefined;
        return (
          <BlogItem
            excerpt={post.excerpt}
            path={post.fields.path}
            title={post.frontmatter.title}
            publishedAt={post.frontmatter.publishedAt}
            nonDefaultLanguage={nonDefaultLanguage}
            tagList={tagList}
          />
        );
      })}
      <Pagination currentPage={pageContext.currentPage} pageCount={pageContext.pageCount} />
    </DefaultLayout>
  );
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
      translations {
        locale
        path
      }
    }
    frontmatter {
      title
      publishedAt
    }
  }

  query BlogListingPage($limit: Int!, $skip: Int!) {
    posts: allMdx(
      filter: { fields: { kind: { glob: "blog/**" } }, frontmatter: { draft: { ne: true } } }
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

export { Head } from '../layouts/default/Document';
