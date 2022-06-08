import { css, Theme } from '@emotion/react';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { useIntl } from 'react-intl';
import { ReboundSection } from 'react-section-dividers';
import LanguageSelector from './LanguageSelector';
import MainNavigation from './MainNavigation';

const headerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  font-size: 2rem;
  font-weight: bold;
  background-color: ${theme.secondaryColor};
`;

export function Header() {
  const intl = useIntl();

  return (
    <ReboundSection as="header" position="bottom" rebound={25} height={20} css={headerStyle}>
      <LocalizedLink to="/">{intl.formatMessage({ id: 'title' })}</LocalizedLink>
      <MainNavigation />
      <LanguageSelector />
    </ReboundSection>
  );
}
