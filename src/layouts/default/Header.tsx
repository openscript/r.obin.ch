import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
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
  font-family: ${theme.fonts.headings};
  background-color: ${theme.colors.primary};

  a {
    text-decoration: none;
    color: ${theme.colors.bright};
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;

  & > *:last-of-type a {
    border: 3px solid ${({ theme }) => theme.colors.bright};
    border-radius: 4px;
    padding: 0.4rem;
    margin-left: 1.4rem;
  }

  & > *:not(:last-of-type) a {
    ::before {
      content: '<';
      transform: translateX(20px);
    }

    ::after {
      content: '/>';
      width: 1.6rem;
      text-align: right;
      transform: translateX(-20px);
    }

    ::before,
    ::after {
      transition: opacity 0.5s, transform 0.3s;
      display: inline-block;
      opacity: 0;
    }

    &.active::before,
    &.active::after {
      opacity: 1;
      transform: translateX(0);
    }

    :hover::before,
    :hover::after {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export function Header() {
  return (
    <ReboundSection as="header" position="bottom" flip="both" rebound={20} height={30} css={headerStyle}>
      <LocalizedLink to="/">
        <Brand />
      </LocalizedLink>
      <NavigationContainer>
        <MainNavigation />
        <LanguageSelector />
      </NavigationContainer>
    </ReboundSection>
  );
}
