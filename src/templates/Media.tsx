import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MediaPageQuery } from '../../graphql-types';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Media({ data }: PageProps<MediaPageQuery>) {
  return (
    <DefaultLayout subtitle={data.mdx?.frontmatter?.title}>
      <article>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <MDXRenderer>{data.mdx?.body || ''}</MDXRenderer>
      </article>
    </DefaultLayout>
  );
}

export const query = graphql`
  query MediaPage($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        photo {
          childImageSharp {
            gatsbyImageData(width: 256, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
