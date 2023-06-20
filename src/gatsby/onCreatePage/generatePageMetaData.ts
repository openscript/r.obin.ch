import { CreatePageArgs } from 'gatsby';
import { createPageTitle } from '../../themes/defaultMetaData';
import { getMessage } from '../../utils/localization';

const BLACK_LIST = ['dev-404-page'];

export async function generatePageMetaData({ actions, page, reporter }: CreatePageArgs<Queries.SitePageContext>) {
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

  const title = getMessage(page.context.locale, `page.${localePagesId}.meta.title`, reporter);

  if (!title) {
    return;
  }

  const metaData = {
    title: createPageTitle(title),
    description: getMessage(page.context.locale, `page.${localePagesId}.meta.description`, reporter),
  };

  deletePage(page);
  createPage({ ...page, context: { ...page.context, metaData } });
}
