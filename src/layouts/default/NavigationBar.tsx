import { css, Theme } from '@emotion/react';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { ReboundSection } from 'react-section-dividers';
import Brand from './Brand';
import MainNavigation from './MainNavigation';

const headerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  font-size: 2rem;
  background-color: ${theme.colors.primary};
`;

export default function NavigationBar() {
  return (
    <ReboundSection as="header" position="bottom" flip="both" rebound={20} height={30} css={headerStyle}>
      <LocalizedLink to="/">
        <Brand />
      </LocalizedLink>
      <MainNavigation />
    </ReboundSection>
  );
}
