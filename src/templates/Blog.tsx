import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FormattedMessage } from 'react-intl';
import { BlogPageQuery } from '../../graphql-types';
import { AsideHeading } from '../components/AsideHeading';
import { Comments } from '../components/Comments';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Blog({ data, location }: PageProps<BlogPageQuery>) {
  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title} contentWrapper={MainWithAside}>
      <article>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <MDXRenderer>{data.mdx?.body || ''}</MDXRenderer>
        <Comments location={location.pathname} />
      </article>
      <aside>
        <AsideHeading>
          <FormattedMessage id="component.tableOfContents.title" />
        </AsideHeading>
        <TableOfContents items={data.mdx?.tableOfContents} />
        <AsideHeading>
          <FormattedMessage id="component.tableOfContents.title" />
        </AsideHeading>
      </aside>
    </DefaultLayout>
  );
}

export const query = graphql`
  query BlogPage($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents
      frontmatter {
        title
      }
      parent {
        ... on File {
          relativePath
        }
      }
    }
  }
`;
