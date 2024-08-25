import { resolve } from "path";
import { CreatePagesArgs } from "gatsby";
import { CONFIGURATION } from "../../configuration";
import { getIntl } from "../../utils/localization";
import { SitePageContextWithMetaData } from "../../types";
import { createPageTitle } from "../../themes/defaultMetaData";

export async function createBlogListingPages({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateBlogListingPagesQuery>(`
    query CreateBlogListingPages {
      allMdx(
        filter: {
          fields: { kind: { glob: "blog/**" } }
          frontmatter: { draft: { ne: false } }
        }
      ) {
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

  const postCountPerLocale = result.data.allMdx.nodes.reduce<
    Record<string, number>
  >((prev, curr) => {
    if (curr.fields?.locale) {
      const newCount = prev[curr.fields.locale] + 1 || 1;
      return { ...prev, [curr.fields.locale]: newCount };
    }
    return prev;
  }, {});

  Object.keys(postCountPerLocale).forEach((locale) => {
    const pageCount = Math.ceil(
      postCountPerLocale[locale] / CONFIGURATION.PAGINATION.ITEMS_PER_PAGE,
    );
    const locales = Object.keys(postCountPerLocale);
    const intl = getIntl(locale, reporter);

    if (!intl) {
      return;
    }

    Array.from({ length: pageCount }).forEach((_, i) => {
      const path =
        i === 0 ? CONFIGURATION.PATHS.BLOG : `${CONFIGURATION.PATHS.BLOG}/${i}`;
      const currentPage = i + 1;

      const metaData: SitePageContextWithMetaData["metaData"] = {
        title: createPageTitle(
          intl.formatMessage({ id: "pagination.page" }, { page: currentPage }),
          intl.formatMessage({ id: "content.kind.blog" }),
        ),
      };

      createPage({
        component: resolve("./src/templates/BlogListing.tsx"),
        context: {
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
