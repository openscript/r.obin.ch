import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';

export async function createMediaListingPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateMediaListingPagesQuery>(`
    query CreateMediaListingPages {
      allMarkdownRemark(filter: { fields: { kind: { glob: "medias/**" }, filename: { eq: "index" } } }) {
        nodes {
          id
          fields {
            kind
            path
            locale
            translations {
              locale
              path
            }
          }
        }
      }
    }
  `);

  result.data?.allMarkdownRemark.nodes.forEach(p => {
    if (p.fields?.translations && p.fields?.path) {
      createPage({
        component: resolve(`./src/templates/MediaListing.tsx`),
        context: { id: p.id, translations: p.fields.translations, kind: p.fields.kind, locale: p.fields.locale },
        path: p.fields.path,
      });
    }
  });
}
