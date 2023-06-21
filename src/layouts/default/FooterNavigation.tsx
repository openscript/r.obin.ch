import { css } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { FormattedMessage } from 'react-intl';

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
  const navigation = useStaticQuery<Queries.FooterNavigationQuery>(query);
  return (
    <nav css={footerNavigationStyles}>
      <ul>
        {navigation.navigationYaml?.footer?.map(item => {
          if (item?.key && item.path) {
            return (
              <li key={item.key}>
                <LocalizedLink to={item.path}>
                  <FormattedMessage id={`navigation.footer.${item.key}`} />
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
