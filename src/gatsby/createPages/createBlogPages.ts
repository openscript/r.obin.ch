import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';

export async function createBlogPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateBlogPagesQuery>(`
    query CreateBlogPages {
      allMdx(filter: { fields: { kind: { glob: "blog/**" } }, frontmatter: { draft: { ne: true } } }) {
        nodes {
          id
          fields {
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
  `);

  result.data?.allMdx.nodes.forEach(p => {
    if (p.fields?.translations && p.fields?.path) {
      createPage({
        component: `${resolve('./src/templates/Blog.tsx')}?__contentFilePath=${p.internal.contentFilePath}`,
        context: { id: p.id, translations: p.fields.translations },
        path: p.fields.path,
      });
    }
  });
}
