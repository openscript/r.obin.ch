import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FormattedMessage } from 'react-intl';
import { BlogPageQuery } from '../../graphql-types';
import { AsideHeading } from '../components/AsideHeading';
import { Comments } from '../components/Comments';
import { AnchorButton } from '../components/AnchorButton';
import { ShareButton } from '../components/ShareButton';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { CONFIGURATION } from '../configuration';

export default function Blog({ data, location }: PageProps<BlogPageQuery>) {
  const relativePath =
    data.mdx?.parent && 'relativePath' in data.mdx.parent ? `${CONFIGURATION.SOURCES.LOCAL_DATA}/${data.mdx?.parent.relativePath}` : undefined;

  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title} contentWrapper={MainWithAside}>
      <article>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <MDXRenderer>{data.mdx?.body || ''}</MDXRenderer>
        <Comments location={location.pathname} />
      </article>
      <aside>
        {data.mdx?.tableOfContents && data.mdx.tableOfContents.items && <TableOfContents items={data.mdx?.tableOfContents} />}
        <AsideHeading>
          <FormattedMessage id="aside.actions" />
        </AsideHeading>
        <ShareButton />
        {relativePath && (
          <AnchorButton href={new URL(relativePath, CONFIGURATION.REMOTE_PATHS.EDIT_IN_VCS).href}>
            <FormattedMessage id="aside.actions.edit" />
          </AnchorButton>
        )}
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
