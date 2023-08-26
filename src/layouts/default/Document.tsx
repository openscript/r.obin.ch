import { HeadProps, Script } from 'gatsby';
import { Fragment } from 'react';
import { SitePageContextWithMetaData } from '../../types';

type DocumentProps = {
  metaData: {
    title: string;
    description?: string;
  };
};

export function Document({ metaData }: DocumentProps) {
  return (
    <Fragment>
      <title key="pageTitle">{metaData.title}</title>
      {metaData.description && <meta key="pageDescription" name="description" content={metaData.description} />}
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <Script id="analytics" defer data-domain="r.obin.ch" src="https://analytics.obin.ch/js/script.js" />
    </Fragment>
  );
}

export function Head({ pageContext }: HeadProps<Queries.BlogPageQuery, SitePageContextWithMetaData>) {
  return <Document metaData={{ title: pageContext.metaData.title }} />;
}
