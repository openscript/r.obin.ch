import { graphql, PageProps } from 'gatsby';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function GenericPageWithAside({ data, children }: PageProps<Queries.GenericPageWithAsideQuery>) {
  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title || ''} contentWrapper={MainWithAside}>
      <article>{children}</article>
      <aside>
        <TableOfContents items={data.mdx?.tableOfContents || undefined} />
      </aside>
    </DefaultLayout>
  );
}

export const query = graphql`
  query GenericPageWithAside($id: String!) {
    mdx(id: { eq: $id }) {
      id
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`;
