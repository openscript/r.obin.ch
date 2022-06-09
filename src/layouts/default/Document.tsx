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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,500;1,400;1,500&family=Rajdhani:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
      <title>{titleMessage}</title>
      <meta name="description" content={descriptionMessage} />
    </Helmet>
  );
}
