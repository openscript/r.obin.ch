import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';

const template = resolve('./src/templates/GenericPage.tsx');

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
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  result.data?.allMdx.edges.forEach(p => {
    if (p.node.fields && p.node.fields.path) {
      createPage({
        component: `${template}?__contentFilePath=${p.node.internal.contentFilePath}`,
        context: { id: p.node.id, translations: p.node.fields.translations },
        path: p.node.fields.path,
      });
    }
  });
}
