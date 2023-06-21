import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { createPageTitle } from '../../themes/defaultMetaData';
import { getIntl } from '../../utils/localization';
import { SitePageContextWithMetaData } from '../../types';

export async function createBlogPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const { createPage } = actions;

  const result = await graphql<Queries.CreateBlogPagesQuery>(`
    query CreateBlogPages {
      allMdx(filter: { fields: { kind: { glob: "blog/**" } }, frontmatter: { draft: { ne: true } } }) {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            path
            locale
            translations {
              locale
              path
            }
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  result.data?.allMdx.nodes.forEach(p => {
    if (p.fields?.translations && p.fields.locale && p.fields?.path && p.frontmatter?.title) {
      const intl = getIntl(p.fields.locale, reporter);
      const metaData: SitePageContextWithMetaData['metaData'] = {
        title: createPageTitle(p.frontmatter.title, intl?.formatMessage({ id: 'content.kind.blog' })),
      };

      createPage({
        component: `${resolve('./src/templates/Blog.tsx')}?__contentFilePath=${p.internal.contentFilePath}`,
        context: { id: p.id, translations: p.fields.translations, metaData },
        path: p.fields.path,
      });
    } else {
      reporter.warn(`Skipped blog page: ${p.id}`);
    }
  });
}
