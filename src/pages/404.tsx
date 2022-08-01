import { FormattedMessage, useIntl } from 'react-intl';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function NotFound() {
  const intl = useIntl();

  return (
    <DefaultLayout subtitle={intl.formatMessage({ id: 'page.notFound.title' })}>
      <h1>
        <FormattedMessage id="page.notFound.title" />
      </h1>
      <FormattedMessage id="page.notFound.content" />
    </DefaultLayout>
  );
}
