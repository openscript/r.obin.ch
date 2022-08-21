import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CreateBlogListingPagesQuery } from '../../../graphql-types';
import { CONFIGURATION } from '../../configuration';

export async function createBlogListingPages({ graphql, actions }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<CreateBlogListingPagesQuery>(`
    query CreateBlogListingPages {
      allMdx(filter: { fields: { kind: { glob: "blog/**" } }, frontmatter: { draft: { eq: false } } }) {
        nodes {
          fields {
            locale
          }
        }
      }
    }
  `);

  if (!result.data) {
    return;
  }

  const postCountPerLocale = result.data.allMdx.nodes.reduce<Record<string, number>>((prev, curr) => {
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
      const path = i === 0 ? CONFIGURATION.PATHS.BLOG : `${CONFIGURATION.PATHS.BLOG}/${i}`;

      createPage({
        component: resolve('./src/templates/BlogListing.tsx'),
        context: {
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
