import { useHotkeys } from '@mantine/hooks';
import { graphql, Link, navigate, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FormattedMessage } from 'react-intl';
import { MediaPageQuery } from '../../graphql-types';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Media({ data }: PageProps<MediaPageQuery>) {
  let imageComponent: JSX.Element | null = null;
  if (data.current?.frontmatter?.photo) {
    const image = getImage(data.current.frontmatter.photo.childImageSharp?.gatsbyImageData);
    if (image) {
      imageComponent = <GatsbyImage image={image} alt={data.current.frontmatter.title} />;
    }
  }

  const previousPath = data.previous?.fields?.path ?? '../';
  const nextPath = data.next?.fields?.path ?? '../';
  useHotkeys([
    ['ArrowLeft', () => navigate(previousPath)],
    ['ArrowRight', () => navigate(nextPath)],
  ]);

  return (
    <DefaultLayout subtitle={data.current?.frontmatter?.title}>
      <article>
        {previousPath}
        <h1>{data.current?.frontmatter?.title}</h1>
        <MDXRenderer>{data.current?.body || ''}</MDXRenderer>
        {imageComponent}
        <Link to={previousPath}>
          <FormattedMessage id="navigation.pagination.previous" />
        </Link>
        <Link to={nextPath}>
          <FormattedMessage id="navigation.pagination.next" />
        </Link>
      </article>
    </DefaultLayout>
  );
}

export const query = graphql`
  query MediaPage($id: String!, $nextId: String, $previousId: String) {
    previous: mdx(id: { eq: $previousId }) {
      fields {
        path
      }
    }
    current: mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        photo {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
    next: mdx(id: { eq: $nextId }) {
      fields {
        path
      }
    }
  }
`;
