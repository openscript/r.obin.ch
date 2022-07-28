import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CreateMediaPagesQuery } from '../../../graphql-types';

export async function createMediaPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<CreateMediaPagesQuery>(`
    query CreateMediaPages {
      allMdx(filter: { fields: { filename: { ne: "index" }, kind: { glob: "medias/**" } } }) {
        nodes {
          id
          fields {
            path
            translations {
              locale
              path
            }
          }
        }
      }
    }
  `);

  result.data?.allMdx.nodes.forEach(p => {
    if (p.fields?.translations && p.fields?.path) {
      createPage({
        component: resolve(`./src/templates/Media.tsx`),
        context: { id: p.id, translations: p.fields.translations },
        path: p.fields.path,
      });
    }
  });
}
