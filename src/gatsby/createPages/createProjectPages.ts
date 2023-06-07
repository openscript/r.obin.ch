import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';

export async function createProjectPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateProjectPagesQuery>(`
    query CreateProjectPages {
      allMdx(filter: { fields: { kind: { glob: "projects/**" } } }) {
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
        component: resolve(`./src/templates/Project.tsx`),
        context: { id: p.id, translations: p.fields.translations },
        path: p.fields.path,
      });
    }
  });
}
