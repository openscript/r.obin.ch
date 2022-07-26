import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { BlogPageQuery } from '../../graphql-types';
import { Comments } from '../components/Comments';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Blog({ data, location }: PageProps<BlogPageQuery>) {
  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title} contentWrapper={MainWithAside}>
      <aside>
        <TableOfContents items={data.mdx?.tableOfContents} />
      </aside>
      <article>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <MDXRenderer>{data.mdx?.body || ''}</MDXRenderer>
        <Comments location={location.pathname} />
      </article>
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
    }
  }
`;
