import { graphql, PageProps } from 'gatsby';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Project({ data, children }: PageProps<Queries.ProjectPageQuery>) {
  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title || ''} contentWrapper={MainWithAside}>
      <article>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        {children}
      </article>
      <aside>
        <TableOfContents items={data.mdx?.tableOfContents || undefined} />
      </aside>
    </DefaultLayout>
  );
}

export const query = graphql`
  query ProjectPage($id: String!) {
    mdx(id: { eq: $id }) {
      id
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`;
