import { resolve } from "path";
import { CreatePagesArgs } from "gatsby";
import { getIntl } from "../../utils/localization";
import { SitePageContextWithMetaData } from "../../types";
import { createPageTitle } from "../../themes/defaultMetaData";

export async function createProjectPages({
  actions,
  graphql,
  reporter,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateProjectPagesQuery>(`
    query CreateProjectPages {
      allMdx(filter: { fields: { kind: { glob: "projects/**" } } }) {
        nodes {
          id
          fields {
            path
            locale
            translations {
              locale
              path
            }
          }
          frontmatter {
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  result.data?.allMdx.nodes.forEach((p) => {
    if (
      p.fields?.translations &&
      p.fields.path &&
      p.fields.locale &&
      p.frontmatter?.title
    ) {
      const intl = getIntl(p.fields.locale, reporter);
      const metaData: SitePageContextWithMetaData["metaData"] = {
        title: createPageTitle(
          p.frontmatter?.title,
          intl?.formatMessage({ id: "content.kind.projects" }),
        ),
      };
      createPage({
        component: `${resolve("./src/templates/Project.tsx")}?__contentFilePath=${p.internal.contentFilePath}`,
        context: { id: p.id, translations: p.fields.translations, metaData },
        path: p.fields.path,
      });
    }
  });
}
