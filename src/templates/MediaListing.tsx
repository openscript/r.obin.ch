import { graphql, Link, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MediaListingPageQuery } from '../../graphql-types';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function MediaListing({ data }: PageProps<MediaListingPageQuery>) {
  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title}>
      <article>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <MDXRenderer>{data.mdx?.body || ''}</MDXRenderer>
        {data.allMdx.nodes.map(media => {
          if (!media.frontmatter?.photo || !media.fields?.path) {
            return null;
          }
          const image = getImage(media.frontmatter.photo.childImageSharp?.gatsbyImageData);
          if (!image) {
            return null;
          }
          return (
            <Link to={media.fields?.path}>
              <GatsbyImage image={image} alt={media.frontmatter.title} />
            </Link>
          );
        })}
      </article>
    </DefaultLayout>
  );
}

export const query = graphql`
  query MediaListingPage($id: String!, $kind: String!, $locale: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }

    allMdx(filter: { fields: { kind: { eq: $kind }, filename: { ne: "index" }, locale: { eq: $locale } } }) {
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
