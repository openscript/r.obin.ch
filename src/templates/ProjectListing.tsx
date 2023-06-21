import { graphql, PageProps } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { ProjectItem } from '../components/ProjectItem';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { PaginationContext } from '../types';

export default function ProjectListing({ data }: PageProps<Queries.ProjectListingPageQuery, PaginationContext>) {
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
    projects: allMdx(filter: { fields: { kind: { glob: "projects/**" }, locale: { eq: $locale } } }, sort: { frontmatter: { title: DESC } }) {
      nodes {
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

export { Head } from '../layouts/default/Document';
