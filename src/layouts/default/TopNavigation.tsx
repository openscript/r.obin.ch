import { css } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FormattedMessage } from 'react-intl';
import { TopNavigationQuery } from '../../../graphql-types';

const query = graphql`
  query TopNavigation {
    navigationYaml {
      top {
        key
        path
        icon {
          childImageSharp {
            gatsbyImageData(width: 16, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;

const navStyle = css`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-right: 1rem;
  }

  a {
    transition: 0.5s;
    filter: grayscale(1);

    &:hover {
      filter: none;
    }
  }
`;

const iconStyle = css`
  vertical-align: middle;
  margin-right: 0.2rem;
`;

export default function TopNavigation() {
  const navigation = useStaticQuery<TopNavigationQuery>(query);
  return (
    <nav css={navStyle}>
      <ul>
        {navigation.navigationYaml?.top?.map(item => {
          const icon = getImage(item.icon?.childImageSharp?.gatsbyImageData);
          if (item.key && item.path && icon) {
            return (
              <li key={item.key}>
                <LocalizedLink to={item.path}>
                  <GatsbyImage image={icon} alt="joho" css={iconStyle} />
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
