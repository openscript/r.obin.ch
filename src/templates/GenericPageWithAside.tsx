import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FormattedMessage } from 'react-intl';
import { GenericPageWithAsideQuery } from '../../graphql-types';
import { AsideHeading } from '../components/AsideHeading';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function GenericPageWithAside({ data }: PageProps<GenericPageWithAsideQuery>) {
  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title} contentWrapper={MainWithAside}>
      <aside>
        <AsideHeading>
          <FormattedMessage id="component.tableOfContents.title" />
        </AsideHeading>
        <TableOfContents items={data.mdx?.tableOfContents} />
      </aside>
      <article>
        <MDXRenderer>{data.mdx?.body || ''}</MDXRenderer>
      </article>
    </DefaultLayout>
  );
}

export const query = graphql`
  query GenericPageWithAside($id: String!) {
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
