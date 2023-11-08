import { graphql, Link, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Markup } from 'interweave';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function MediaListing({ data }: PageProps<Queries.MediaListingPageQuery>) {
  return (
    <DefaultLayout>
      <article>
        <h1>{data.markdownRemark?.frontmatter?.title}</h1>
        <Markup content={data.markdownRemark?.html} />
        {data.allMarkdownRemark.nodes.map(media => {
          if (!media.frontmatter?.photo || !media.fields?.path) {
            return null;
          }
          const image = getImage(media.frontmatter.photo.childImageSharp?.gatsbyImageData || null);
          if (!image) {
            return null;
          }
          return (
            <Link to={media.fields?.path} key={media.frontmatter.title}>
              <GatsbyImage image={image} alt={media.frontmatter.title || ''} />
            </Link>
          );
        })}
      </article>
    </DefaultLayout>
  );
}

export const query = graphql`
  query MediaListingPage($id: String!, $kind: String!, $locale: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }

    allMarkdownRemark(filter: { fields: { kind: { eq: $kind }, filename: { ne: "index" }, locale: { eq: $locale } } }) {
      nodes {
        fields {
          path
        }
        frontmatter {
          photo {
            childImageSharp {
              gatsbyImageData(width: 256, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          title
        }
      }
    }
  }
`;

export { Head } from '../layouts/default/Document';
