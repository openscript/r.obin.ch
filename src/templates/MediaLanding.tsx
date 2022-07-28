import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FormattedMessage } from 'react-intl';
import { MediaLandingPageQuery } from '../../graphql-types';
import { MediaItem } from '../components/MediaItem';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { PaginationContext } from '../types';

export default function MediaLanding({ data }: PageProps<MediaLandingPageQuery, PaginationContext>) {
  return (
    <DefaultLayout>
      <h1>
        <FormattedMessage id="page.medias.title" />
      </h1>
      {data.medias.nodes.map(media => {
        if (!media.fields?.path || !media.frontmatter?.title) {
          return null;
        }
        return (
          <MediaItem path={media.fields.path} title={media.frontmatter.title}>
            <MDXRenderer>{media.body || ''}</MDXRenderer>
          </MediaItem>
        );
      })}
    </DefaultLayout>
  );
}

export const query = graphql`
  query MediaLandingPage($locale: String!) {
    medias: allMdx(
      filter: { fields: { kind: { glob: "medias/**" }, filename: { eq: "index" }, locale: { eq: $locale } } }
      sort: { fields: frontmatter___title, order: DESC }
    ) {
      nodes {
        id
        body
        fields {
          path
        }
        frontmatter {
          title
        }
      }
    }
  }
`;
