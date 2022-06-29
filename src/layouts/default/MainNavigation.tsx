import { css } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { FormattedMessage } from 'react-intl';
import { MainNavigationQuery } from '../../../graphql-types';

const query = graphql`
  query MainNavigation {
    navigationYaml {
      main {
        path
        key
      }
    }
  }
`;

const navStyle = css`
  font-size: 1.4rem;
  margin-right: -1.6rem;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-left: 0.5rem;
  }

  a {
    &.active {
      font-weight: bold;
    }

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
      font-weight: normal;
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
  const navigation = useStaticQuery<MainNavigationQuery>(query);
  return (
    <nav css={navStyle}>
      <ul>
        {navigation.navigationYaml?.main?.map(item => {
          if (item.key && item.path) {
            return (
              <li key={item.key}>
                <LocalizedLink to={item.path}>
                  <FormattedMessage id={`navigation.main.${item.key}`} />
                </LocalizedLink>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
}
