import { css } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { FormattedMessage } from 'react-intl';
import { TopNavigationQuery } from '../../../graphql-types';

const query = graphql`
  query TopNavigation {
    navigationYaml {
      top {
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
`;

export default function TopNavigation() {
  const navigation = useStaticQuery<TopNavigationQuery>(query);
  return (
    <nav css={navStyle}>
      <ul>
        {navigation.navigationYaml?.top?.map(item => {
          if (item.key && item.path) {
            return (
              <li key={item.key}>
                <LocalizedLink to={item.path}>
                  <FormattedMessage id={`navigation.top.${item.key}`} />
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
