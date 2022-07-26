import { graphql, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { ProjectPageQuery } from '../../graphql-types';
import { ProjectItem } from '../components/ProjectItem';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { PaginationContext } from '../types';

export default function Project({ data }: PageProps<ProjectPageQuery, PaginationContext>) {
  return (
    <DefaultLayout>
      <h1>
        <FormattedMessage id="page.projects.title" />
      </h1>
      {data.projects.nodes.map(post => {
        if (!post.fields?.path || !post.frontmatter?.title) {
          return null;
        }
        return <ProjectItem path={post.fields.path} title={post.frontmatter.title} />;
      })}
    </DefaultLayout>
  );
}

export const query = graphql`
  query ProjectPage($locale: String!) {
    projects: allMdx(
      filter: { fields: { kind: { glob: "projects/**" }, locale: { eq: $locale } } }
      sort: { fields: frontmatter___title, order: DESC }
    ) {
      nodes {
        fields {
          locale
          path
          tags {
            slug
            title
          }
        }
        frontmatter {
          title
        }
      }
    }
  }
`;
