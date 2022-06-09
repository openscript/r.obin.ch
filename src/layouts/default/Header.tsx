import { css, Theme } from '@emotion/react';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { ReboundSection } from 'react-section-dividers';
import Brand from './Brand';
import LanguageSelector from './LanguageSelector';
import MainNavigation from './MainNavigation';

const headerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  font-size: 2rem;
  font-weight: bold;
  font-family: ${theme.fonts.headings};
  background-color: ${theme.colors.primary};

  a {
    text-decoration: none;
    color: ${theme.colors.white};
  }
`;

export function Header() {
  return (
    <ReboundSection as="header" position="bottom" flip="both" rebound={20} height={30} css={headerStyle}>
      <LocalizedLink to="/">
        <Brand />
      </LocalizedLink>
      <MainNavigation />
      <LanguageSelector />
    </ReboundSection>
  );
}
