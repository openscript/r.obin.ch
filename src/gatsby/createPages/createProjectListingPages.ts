import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CONFIGURATION } from '../../configuration';

export async function createProjectListingPages({ graphql, actions }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateProjectListingPagesQuery>(`
    query CreateProjectListingPages {
      allMdx(filter: { fields: { kind: { glob: "projects/**" } } }) {
        nodes {
          fields {
            locale
          }
        }
      }
    }
  `);

  if (!result.data) {
    return;
  }

  const availableLocales = result.data.allMdx.nodes.reduce<string[]>((prev, curr) => {
    if (curr.fields?.locale) {
      return [...new Set([...prev, curr.fields.locale])];
    }
    return prev;
  }, []);

  availableLocales.forEach(locale => {
    const path = CONFIGURATION.PATHS.PROJECTS;
    createPage({
      component: resolve('./src/templates/ProjectListing.tsx'),
      context: {
        // localization
        locale,
        basePath: path,
        referTranslations: availableLocales,
        adjustPath: true,
      },
      path: `/${locale}${path}`,
    });
  });
}
