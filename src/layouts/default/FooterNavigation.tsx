import { css } from '@emotion/react';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';

const footerNavigationStyles = css`
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export default function FooterNavigation() {
  return (
    <nav css={footerNavigationStyles}>
      <ul>
        <li>
          <LocalizedLink to="/imprint">Imprint</LocalizedLink>
        </li>
      </ul>
    </nav>
  );
}
