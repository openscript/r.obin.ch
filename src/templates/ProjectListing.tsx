import { graphql, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { ProjectListingPageQuery } from '../../graphql-types';
import { ProjectItem } from '../components/ProjectItem';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { PaginationContext } from '../types';

export default function ProjectListing({ data }: PageProps<ProjectListingPageQuery, PaginationContext>) {
  return (
    <DefaultLayout>
      <h1>
        <FormattedMessage id="page.projects.title" />
      </h1>
      {data.projects.nodes.map(project => {
        if (!project.fields?.path || !project.frontmatter?.title) {
          return null;
        }
        return <ProjectItem path={project.fields.path} title={project.frontmatter.title} />;
      })}
    </DefaultLayout>
  );
}

export const query = graphql`
  query ProjectListingPage($locale: String!) {
    projects: allMdx(
      filter: { fields: { kind: { glob: "projects/**" }, locale: { eq: $locale } } }
      sort: { fields: frontmatter___title, order: DESC }
    ) {
      nodes {
        fields {
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
