import { graphql, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { Markup } from 'interweave';
import { MediaItem } from '../components/MediaItem';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { PaginationContext } from '../types';

export default function MediaLanding({ data }: PageProps<Queries.MediaLandingPageQuery, PaginationContext>) {
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
            <Markup content={media.html} />
          </MediaItem>
        );
      })}
    </DefaultLayout>
  );
}

export const query = graphql`
  query MediaLandingPage($locale: String!) {
    medias: allMarkdownRemark(
      filter: { fields: { kind: { glob: "medias/**" }, filename: { eq: "index" }, locale: { eq: $locale } } }
      sort: { frontmatter: { title: DESC } }
    ) {
      nodes {
        html
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
