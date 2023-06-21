import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CONFIGURATION } from '../../configuration';
import { SitePageContextWithMetaData } from '../../types';
import { createPageTitle } from '../../themes/defaultMetaData';
import { getIntl } from '../../utils/localization';

export async function createBlogTagPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<Queries.CreateBlogTagPagesQuery>(`
    query CreateBlogTagPages {
      allMdx(filter: { fields: { kind: { glob: "blog/**" } } }) {
        group(field: { fields: { tags: { slug: SELECT } } }) {
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
        const intl = getIntl(locale, reporter);

        if (!intl) {
          return;
        }

        Array.from({ length: pageCount }).forEach((_, i) => {
          const pathWithoutPagination = `${CONFIGURATION.PATHS.TAG}/${tag}`;
          const path = i === 0 ? pathWithoutPagination : `${pathWithoutPagination}/${i}`;
          const currentPage = i + 1;

          const metaData: SitePageContextWithMetaData['metaData'] = {
            title: createPageTitle(tag, intl.formatMessage({ id: 'content.kind.blog' })),
          };

          createPage({
            component: resolve('./src/templates/BlogTag.tsx'),
            context: {
              tag,
              metaData,
              // pagination
              limit: CONFIGURATION.PAGINATION.ITEMS_PER_PAGE,
              skip: i * CONFIGURATION.PAGINATION.ITEMS_PER_PAGE,
              pageCount,
              currentPage,
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
