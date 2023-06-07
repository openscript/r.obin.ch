import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';

export async function createMediaPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateMediaPagesQuery>(`
    query CreateMediaPages {
      allMdx(filter: { fields: { filename: { ne: "index" }, kind: { glob: "medias/**" } } }) {
        group(field: { fields: { locale: SELECT } }) {
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
          context: { id: p.node.id, translations: p.node.fields.translations, nextId: p.next?.id || null, previousId: p.previous?.id || null },
          path: p.node.fields.path,
        });
      }
    });
  });
}
