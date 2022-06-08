import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

export function Document() {
  const intl = useIntl();
  return (
    <Helmet>
      <title>{intl.formatMessage({ id: 'title' })}</title>
      <meta name="description" content={intl.formatMessage({ id: 'description' })} />
    </Helmet>
  );
}
