import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CreateBlogPagesQuery } from '../../../graphql-types';
import { CONFIGURATION } from '../../configuration';

export async function CreateBlogPages({ graphql, actions }: CreatePagesArgs) {
  const { createPage } = actions;

  const pages = await graphql<CreateBlogPagesQuery>(`
    query CreateBlogPages {
      allMdx(filter: { fields: { kind: { glob: "blog/**" } } }) {
        nodes {
          fields {
            locale
          }
        }
      }
    }
  `);

  if (!pages.data) {
    return;
  }

  const postCountPerLocale = pages.data.allMdx.nodes.reduce<Record<string, number>>((prev, curr) => {
    if (curr.fields?.locale && curr.fields.pathPrefix) {
      const newCount = prev[curr.fields.locale] + 1 || 1;
      return { ...prev, [curr.fields.locale]: newCount };
    }
    return prev;
  }, {});

  Object.keys(postCountPerLocale).forEach(locale => {
    const pageCount = Math.ceil(postCountPerLocale[locale] / CONFIGURATION.PAGINATION.ITEMS_PER_PAGE);
    const locales = Object.keys(postCountPerLocale);

    Array.from({ length: pageCount + 1 }).forEach((_, i) => {
      const path = i === 0 ? `${CONFIGURATION.PATHS.BLOG}/${i}` : CONFIGURATION.PATHS.BLOG;

      createPage({
        component: resolve('./src/templates/Blog.tsx'),
        context: {
          locale,
          referTranslations: locales,
          adjustPath: true,
        },
        path,
      });
    });
  });
}
