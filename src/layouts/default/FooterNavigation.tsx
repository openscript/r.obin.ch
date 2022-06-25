import { css } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { FormattedMessage } from 'react-intl';
import { FooterNavigationQuery } from '../../../graphql-types';

const query = graphql`
  query FooterNavigation {
    navigationYaml {
      footer {
        path
        key
      }
    }
  }
`;

const footerNavigationStyles = css`
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export default function FooterNavigation() {
  const navigation = useStaticQuery<FooterNavigationQuery>(query);
  return (
    <nav css={footerNavigationStyles}>
      <ul>
        <li>
          {navigation.navigationYaml?.footer?.map(item => {
            if (item.key && item.path) {
              return (
                <LocalizedLink to={item.path}>
                  <FormattedMessage id={`navigation.footer.${item.key}`} />
                </LocalizedLink>
              );
            }
            return null;
          })}
        </li>
      </ul>
    </nav>
  );
}
