import { resolve } from "path";
import { CreatePagesArgs } from "gatsby";
import { getIntl } from "../../utils/localization";
import { SitePageContextWithMetaData } from "../../types";
import { createPageTitle } from "../../themes/defaultMetaData";

export async function createMediaListingPages({
  actions,
  graphql,
  reporter,
}: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateMediaListingPagesQuery>(`
    query CreateMediaListingPages {
      allMarkdownRemark(
        filter: {
          fields: { kind: { glob: "medias/**" }, filename: { eq: "index" } }
        }
      ) {
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
          frontmatter {
            title
          }
        }
      }
    }
  `);

  result.data?.allMarkdownRemark.nodes.forEach((p) => {
    if (
      p.fields?.translations &&
      p.fields.path &&
      p.fields.locale &&
      p.frontmatter?.title
    ) {
      const intl = getIntl(p.fields.locale, reporter);

      if (!intl) {
        return;
      }

      const metaData: SitePageContextWithMetaData["metaData"] = {
        title: createPageTitle(
          p.frontmatter.title,
          intl.formatMessage({ id: "content.kind.media" }),
        ),
      };

      createPage({
        component: resolve(`./src/templates/MediaListing.tsx`),
        context: {
          id: p.id,
          translations: p.fields.translations,
          kind: p.fields.kind,
          locale: p.fields.locale,
          metaData,
        },
        path: p.fields.path,
      });
    }
  });
}
