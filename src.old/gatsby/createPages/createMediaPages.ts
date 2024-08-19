import { resolve } from 'path';
import { CreatePagesArgs } from 'gatsby';
import { getIntl } from '../../utils/localization';
import { SitePageContextWithMetaData } from '../../types';
import { createPageTitle } from '../../themes/defaultMetaData';

export async function createMediaPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateMediaPagesQuery>(`
    query CreateMediaPages {
      allMarkdownRemark(filter: { fields: { filename: { ne: "index" }, kind: { glob: "medias/**" } } }) {
        group(field: { fields: { locale: SELECT } }) {
          edges {
            node {
              id
              fields {
                locale
                translations {
                  locale
                  path
                }
                path
              }
              frontmatter {
                title
              }
            }
            next {
              id
            }
            previous {
              id
            }
          }
        }
      }
    }
  `);

  result.data?.allMarkdownRemark.group.forEach(g => {
    g.edges.forEach(p => {
      if (p.node.fields?.translations && p.node.fields?.path && p.node.fields.locale && p.node.frontmatter?.title) {
        const intl = getIntl(p.node.fields.locale, reporter);
        const metaData: SitePageContextWithMetaData['metaData'] = {
          title: createPageTitle(p.node.frontmatter?.title, intl?.formatMessage({ id: 'content.kind.media' })),
        };
        createPage({
          component: resolve(`./src/templates/Media.tsx`),
          context: {
            id: p.node.id,
            translations: p.node.fields.translations,
            nextId: p.next?.id || null,
            previousId: p.previous?.id || null,
            metaData,
          },
          path: p.node.fields.path,
        });
      }
    });
  });
}
