import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CreateBlogTagPagesQuery } from '../../../graphql-types';
import { CONFIGURATION } from '../../configuration';

export async function createBlogTagPages({ graphql, actions }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<CreateBlogTagPagesQuery>(`
    query CreateBlogTagPages {
      allMdx(filter: { fields: { kind: { glob: "blog/**" } } }) {
        group(field: fields___tags___slug) {
          tag: fieldValue
          nodes {
            fields {
              locale
            }
          }
        }
      }
    }
  `);

  result.data?.allMdx.group.forEach(g => {
    const { tag } = g;
    if (tag) {
      const postCountPerLocale = g.nodes.reduce<Record<string, number>>((prev, curr) => {
        if (curr.fields?.locale) {
          const newCount = prev[curr.fields.locale] + 1 || 1;
          return { ...prev, [curr.fields.locale]: newCount };
        }
        return prev;
      }, {});

      Object.keys(postCountPerLocale).forEach(locale => {
        const pageCount = Math.ceil(postCountPerLocale[locale] / CONFIGURATION.PAGINATION.ITEMS_PER_PAGE);
        const locales = Object.keys(postCountPerLocale);

        Array.from({ length: pageCount }).forEach((_, i) => {
          const pathWithoutPagination = `${CONFIGURATION.PATHS.TAG}/${tag}`;
          const path = i === 0 ? pathWithoutPagination : `${pathWithoutPagination}/${i}`;

          createPage({
            component: resolve('./src/templates/BlogTag.tsx'),
            context: {
              tag,
              // pagination
              limit: CONFIGURATION.PAGINATION.ITEMS_PER_PAGE,
              skip: i * CONFIGURATION.PAGINATION.ITEMS_PER_PAGE,
              pageCount,
              currentPage: i + 1,
              // localization
              locale,
              basePath: path,
              referTranslations: locales,
              adjustPath: true,
            },
            path: `/${locale}${path}`,
          });
        });
      });
    }
  });
}
