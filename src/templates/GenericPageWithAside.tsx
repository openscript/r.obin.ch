import { graphql, PageProps } from 'gatsby';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function GenericPageWithAside({ data, children }: PageProps<Queries.GenericPageWithAsideQuery>) {
  return (
    <DefaultLayout contentWrapper={MainWithAside}>
      <article data-pagefind-body>{children}</article>
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

export { Head } from '../layouts/default/Document';
