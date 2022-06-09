import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

type DocumentProps = {
  subtitle?: string;
};

export function Document({ subtitle }: DocumentProps) {
  const intl = useIntl();
  const defaultSubtitleMessage = intl.formatMessage({ id: 'defaultSubtitle' });
  const titleMessage = intl.formatMessage(
    { id: 'titlePattern' },
    { title: intl.formatMessage({ id: 'title' }), subtitle: subtitle || defaultSubtitleMessage }
  );
  const descriptionMessage = intl.formatMessage({ id: 'description' });
  return (
    <Helmet>
      <title>{titleMessage}</title>
      <meta name="description" content={descriptionMessage} />
    </Helmet>
  );
}
