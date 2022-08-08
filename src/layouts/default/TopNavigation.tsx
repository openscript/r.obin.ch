import { css } from '@emotion/react';
import { graphql, Link, useStaticQuery } from 'gatsby';
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
  max-width: 100%;
  margin-right: 1rem;
  padding-right: 2rem;
  overflow-x: scroll;
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) calc(100% - 2rem), transparent);

  &::-webkit-scrollbar {
    height: 0;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-right: 1rem;
    flex-shrink: 0;
    white-space: nowrap;
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
                <Link to={item.path}>
                  <GatsbyImage image={icon} alt={`${item.key} brand icon`} css={iconStyle} />
                  <FormattedMessage id={`navigation.top.${item.key}`} />
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
}
