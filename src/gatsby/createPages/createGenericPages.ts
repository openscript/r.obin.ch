import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';

export async function createGenericPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<Queries.AllGenericPagesQuery>(`
    query AllGenericPages {
      allMdx(filter: { fields: { kind: { eq: "pages" } } }) {
        edges {
          node {
            id
            frontmatter {
              template
            }
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
    }
  `);

  result.data?.allMdx.edges.forEach(p => {
    if (p.node.fields && p.node.fields.path) {
      createPage({
        component: resolve(`./src/templates/${p.node.frontmatter?.template || 'GenericPage'}.tsx`),
        context: { id: p.node.id, translations: p.node.fields.translations },
        path: p.node.fields.path,
      });
    }
  });
}
