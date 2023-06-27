import { graphql, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { AsideHeading } from '../components/AsideHeading';
import { Comments } from '../components/Comments';
import { AnchorButton } from '../components/AnchorButton';
import { ShareButton } from '../components/ShareButton';
import { TableOfContents } from '../components/TableOfContents';
import { MainWithAside } from '../layouts/default/content/MainWithAside';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { CONFIGURATION } from '../configuration';

export default function Blog({ data, location, children }: PageProps<Queries.BlogPageQuery>) {
  const relativePath =
    data.mdx?.parent && 'relativePath' in data.mdx.parent ? `${CONFIGURATION.SOURCES.LOCAL_DATA}/${data.mdx?.parent.relativePath}` : undefined;

  const featured = getImage(data.mdx?.frontmatter?.featured?.childImageSharp?.gatsbyImageData || null);

  if (!data.mdx?.frontmatter?.title) {
    return null;
  }

  return (
    <DefaultLayout contentWrapper={MainWithAside}>
      <article>
        <h1>{data.mdx.frontmatter?.title}</h1>
        {featured && <GatsbyImage image={featured} alt={data.mdx.frontmatter?.title} />}
        {children}
        <Comments location={location.pathname} />
      </article>
      <aside>
        <TableOfContents items={data.mdx.tableOfContents || undefined} />
        <AsideHeading>
          <FormattedMessage id="aside.actions" />
        </AsideHeading>
        <ShareButton />
        {relativePath && (
          <React.Fragment>
            <AnchorButton href={new URL(relativePath, CONFIGURATION.REMOTE_PATHS.SHOW_IN_VCS).href}>
              <FormattedMessage id="aside.actions.show" />
            </AnchorButton>
            <AnchorButton href={new URL(relativePath, CONFIGURATION.REMOTE_PATHS.EDIT_IN_VCS).href}>
              <FormattedMessage id="aside.actions.edit" />
            </AnchorButton>
          </React.Fragment>
        )}
      </aside>
    </DefaultLayout>
  );
}

export const query = graphql`
  query BlogPage($id: String!) {
    mdx(id: { eq: $id }) {
      id
      tableOfContents
      frontmatter {
        featured {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
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

export { Head } from '../layouts/default/Document';
