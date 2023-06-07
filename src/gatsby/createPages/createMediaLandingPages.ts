import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CONFIGURATION } from '../../configuration';

export async function createMediaLandingPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateMediaLandingPagesQuery>(`
    query CreateMediaLandingPages {
      allMdx(filter: { fields: { kind: { glob: "medias/**" }, filename: { eq: "index" } } }) {
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
    const path = CONFIGURATION.PATHS.MEDIAS;
    createPage({
      component: resolve('./src/templates/MediaLanding.tsx'),
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
