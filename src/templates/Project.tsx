import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { ProjectPageQuery } from '../../graphql-types';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Project({ data }: PageProps<ProjectPageQuery>) {
  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title} contentWrapper={MainWithAside}>
      <article>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <MDXRenderer>{data.mdx?.body || ''}</MDXRenderer>
      </article>
      <aside>{data.mdx?.tableOfContents && data.mdx.tableOfContents.items && <TableOfContents items={data.mdx?.tableOfContents} />}</aside>
    </DefaultLayout>
  );
}

export const query = graphql`
  query ProjectPage($id: String!) {
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
