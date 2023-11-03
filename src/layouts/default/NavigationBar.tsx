import { css, Theme } from '@emotion/react';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import Brand from './Brand';
import MainNavigation from './MainNavigation';
import { Search } from './Search';

const headerStyle = (theme: Theme) => css`
  display: flex;
  position: relative;
  justify-content: space-between;
  padding-top: 2.2rem;
  padding-bottom: 2.2rem;
  font-size: 2.2rem;
  gap: 4rem;
  background-color: ${theme.colors.primary};

  @media (max-width: ${theme.breakpoints.medium}) {
    gap: 1rem;
  }
`;

export default function NavigationBar() {
  return (
    <header css={headerStyle}>
      <LocalizedLink to="/">
        <Brand />
      </LocalizedLink>
      <Search />
      <MainNavigation />
    </header>
  );
}
