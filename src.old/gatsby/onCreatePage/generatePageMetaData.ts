import { CreatePageArgs } from "gatsby";
import { createPageTitle } from "../../themes/defaultMetaData";
import { getIntl } from "../../utils/localization";

const BLACK_LIST = ["dev-404-page"];

export async function generatePageMetaData({
  actions,
  page,
  reporter,
}: CreatePageArgs<Queries.SitePageContext>) {
  const { createPage, deletePage } = actions;
  if (!page.context || !page.isCreatedByStatefulCreatePages) {
    return;
  }

  const { localePagesId } = page.context;
  if (!localePagesId || BLACK_LIST.includes(localePagesId)) {
    return;
  }

  if (!page.context.locale) {
    reporter.warn(`Page context locale is null or undefined.`);
    return;
  }

  const intl = getIntl(page.context.locale, reporter);
  if (!intl) {
    return;
  }

  const title = intl.formatMessage({ id: `page.${localePagesId}.meta.title` });

  if (!title) {
    return;
  }

  const metaData = {
    title: createPageTitle(title),
    description: intl.formatMessage({
      id: `page.${localePagesId}.meta.description`,
    }),
  };

  deletePage(page);
  createPage({ ...page, context: { ...page.context, metaData } });
}
