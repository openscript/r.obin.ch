import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { getIntl } from '../../utils/localization';
import { SitePageContextWithMetaData } from '../../types';
import { createPageTitle } from '../../themes/defaultMetaData';

const template = resolve('./src/templates/GenericPage.tsx');

export async function createGenericPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<Queries.AllGenericPagesQuery>(`
    query AllGenericPages {
      allMdx(filter: { fields: { kind: { eq: "pages" } } }) {
        edges {
          node {
            id
            frontmatter {
              title
              template
            }
            fields {
              locale
              path
              translations {
                locale
                path
              }
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  result.data?.allMdx.edges.forEach(p => {
    if (p.node.fields && p.node.fields.path && p.node.fields.locale && p.node.frontmatter?.title) {
      const intl = getIntl(p.node.fields.locale, reporter);

      const metaData: SitePageContextWithMetaData['metaData'] = {
        title: createPageTitle(p.node.frontmatter.title, intl?.formatMessage({ id: 'content.kind.page' })),
      };
      createPage({
        component: `${template}?__contentFilePath=${p.node.internal.contentFilePath}`,
        context: { id: p.node.id, translations: p.node.fields.translations, metaData },
        path: p.node.fields.path,
      });
    }
  });
}
