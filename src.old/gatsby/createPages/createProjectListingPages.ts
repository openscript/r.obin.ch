import { resolve } from "path";
import { CreatePagesArgs } from "gatsby";
import { CONFIGURATION } from "../../configuration";
import { getIntl } from "../../utils/localization";
import { SitePageContextWithMetaData } from "../../types";
import { createPageTitle } from "../../themes/defaultMetaData";

export async function createProjectListingPages({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateProjectListingPagesQuery>(`
    query CreateProjectListingPages {
      allMdx(filter: { fields: { kind: { glob: "projects/**" } } }) {
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

  const availableLocales = result.data.allMdx.nodes.reduce<string[]>(
    (prev, curr) => {
      if (curr.fields?.locale) {
        return [...new Set([...prev, curr.fields.locale])];
      }
      return prev;
    },
    [],
  );

  availableLocales.forEach((locale) => {
    const path = CONFIGURATION.PATHS.PROJECTS;

    const intl = getIntl(locale, reporter);

    if (!intl) {
      return;
    }

    const metaData: SitePageContextWithMetaData["metaData"] = {
      title: createPageTitle(
        intl.formatMessage({ id: "content.kind.projects" }),
      ),
    };

    createPage({
      component: resolve("./src/templates/ProjectListing.tsx"),
      context: {
        metaData,
        // localization
        locale,
        basePath: path,
        referTranslations: availableLocales,
        adjustPath: true,
      },
      path: `/${locale}${path}`,
    });
  });
}
