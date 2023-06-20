import { Fragment } from 'react';

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
    </Fragment>
  );
}
