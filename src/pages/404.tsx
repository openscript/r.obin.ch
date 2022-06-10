import { FormattedMessage, useIntl } from 'react-intl';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function NotFound() {
  const intl = useIntl();

  return (
    <DefaultLayout subtitle={intl.formatMessage({ id: 'pages.notFound.title' })}>
      <h1>
        <FormattedMessage id="pages.notFound.title" />
      </h1>
      <FormattedMessage id="pages.notFound.content" />
    </DefaultLayout>
  );
}
