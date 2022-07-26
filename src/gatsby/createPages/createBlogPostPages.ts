import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CreateBlogPagesQuery } from '../../../graphql-types';

export async function createBlogPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<CreateBlogPagesQuery>(`
    query CreateBlogPages {
      allMdx(filter: { fields: { kind: { glob: "blog/**" } } }) {
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
        component: resolve(`./src/templates/Blog.tsx`),
        context: { id: p.id, translations: p.fields.translations },
        path: p.fields.path,
      });
    }
  });
}
