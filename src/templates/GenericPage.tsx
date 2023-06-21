import { graphql, PageProps } from 'gatsby';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function GenericPage({ children }: PageProps<Queries.GenericPageQuery>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}

export const query = graphql`
  query GenericPage($id: String!) {
    mdx(id: { eq: $id }) {
      id
    }
  }
`;

export { Head } from '../layouts/default/Document';
