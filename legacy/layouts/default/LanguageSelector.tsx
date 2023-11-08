import { css } from '@emotion/react';
import { LanguageSwitcher } from 'gatsby-plugin-i18n-l10n';
import { useIntl } from 'react-intl';

const languageSelectorStyles = css`
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export default function LanguageSelector() {
  const intl = useIntl();

  return <LanguageSwitcher css={languageSelectorStyles} resolveLanguageName={locale => intl.formatMessage({ id: `languages.${locale}` })} />;
}
