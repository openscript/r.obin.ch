import { css } from '@emotion/react';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';

const navStyle = css`
  font-size: 1.4rem;
  margin-right: -1.6rem;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
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
