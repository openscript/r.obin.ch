import { css } from '@emotion/react';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';

const navStyle = css`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export default function MainNavigation() {
  return (
    <nav css={navStyle}>
      <ul>
        <li>
          <LocalizedLink to="/pages">Joho</LocalizedLink>
        </li>
      </ul>
    </nav>
  );
}
