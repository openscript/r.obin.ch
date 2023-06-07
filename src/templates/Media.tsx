import { useHotkeys } from '@mantine/hooks';
import { graphql, Link, navigate, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Markup } from 'interweave';
import { FormattedMessage } from 'react-intl';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function Media({ data }: PageProps<Queries.MediaPageQuery>) {
  let imageComponent: JSX.Element | null = null;
  if (data.current?.frontmatter?.photo) {
    const image = getImage(data.current.frontmatter.photo.childImageSharp?.gatsbyImageData || null);
    if (image) {
      imageComponent = <GatsbyImage image={image} alt={data.current.frontmatter.title || ''} />;
    }
  }

  const previousPath = data.previous?.fields?.path ?? '../';
  const nextPath = data.next?.fields?.path ?? '../';
  useHotkeys([
    ['ArrowLeft', () => navigate(previousPath)],
    ['ArrowRight', () => navigate(nextPath)],
  ]);

  return (
    <DefaultLayout subtitle={data.current?.frontmatter?.title || ''}>
      <article>
        <h1>{data.current?.frontmatter?.title}</h1>
        <Markup content={data.current?.html} />
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
    current: markdownRemark(id: { eq: $id }) {
      html
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
