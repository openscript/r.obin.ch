import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CreateMediaPagesQuery } from '../../../graphql-types';

export async function createMediaPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<CreateMediaPagesQuery>(`
    query CreateMediaPages {
      allMdx(filter: { fields: { filename: { ne: "index" }, kind: { glob: "medias/**" } } }) {
        group(field: fields___locale) {
          edges {
            node {
              id
              fields {
                translations {
                  locale
                  path
                }
                path
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

  result.data?.allMdx.group.forEach(g => {
    g.edges.forEach(p => {
      if (p.node.fields?.translations && p.node.fields?.path) {
        createPage({
          component: resolve(`./src/templates/Media.tsx`),
          context: { id: p.node.id, translations: p.node.fields.translations, nextId: p.next?.id, previousId: p.previous?.id },
          path: p.node.fields.path,
        });
      }
    });
  });
}
