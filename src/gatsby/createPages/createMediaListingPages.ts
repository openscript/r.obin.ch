import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CreateMediaListingPagesQuery } from '../../../graphql-types';

export async function createMediaListingPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<CreateMediaListingPagesQuery>(`
    query CreateMediaListingPages {
      allMdx(filter: { fields: { kind: { glob: "medias/**" }, filename: { eq: "index" } } }) {
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

  result.data?.allMdx.nodes.forEach(p => {
    if (p.fields?.translations && p.fields?.path) {
      createPage({
        component: resolve(`./src/templates/MediaListing.tsx`),
        context: { id: p.id, translations: p.fields.translations, kind: p.fields.kind, locale: p.fields.locale },
        path: p.fields.path,
      });
    }
  });
}
