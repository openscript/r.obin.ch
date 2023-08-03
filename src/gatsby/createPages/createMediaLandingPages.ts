import { resolve } from 'path';
import { CreatePagesArgs } from 'gatsby';
import { CONFIGURATION } from '../../configuration';
import { getIntl } from '../../utils/localization';
import { SitePageContextWithMetaData } from '../../types';
import { createPageTitle } from '../../themes/defaultMetaData';

export async function createMediaLandingPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateMediaLandingPagesQuery>(`
    query CreateMediaLandingPages {
      allMarkdownRemark(filter: { fields: { kind: { glob: "medias/**" }, filename: { eq: "index" } } }) {
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

  const availableLocales = result.data.allMarkdownRemark.nodes.reduce<string[]>((prev, curr) => {
    if (curr.fields?.locale) {
      return [...new Set([...prev, curr.fields.locale])];
    }
    return prev;
  }, []);

  availableLocales.forEach(locale => {
    const path = CONFIGURATION.PATHS.MEDIAS;
    const intl = getIntl(locale, reporter);

    if (!intl) {
      return;
    }

    const metaData: SitePageContextWithMetaData['metaData'] = {
      title: createPageTitle(intl.formatMessage({ id: 'content.kind.media' })),
    };

    createPage({
      component: resolve('./src/templates/MediaLanding.tsx'),
      context: {
        metaData,
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
