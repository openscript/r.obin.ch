import { css, Theme } from '@emotion/react';
import { useDisclosure } from '@mantine/hooks';
import { graphql, useStaticQuery } from 'gatsby';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { FormattedMessage } from 'react-intl';
import { BurgerButton } from '../../components/BurgerButton';

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

const navStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: -1.6rem;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-left: 0.5rem;
    white-space: nowrap;
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
      transition:
        opacity 0.5s,
        transform 0.3s;
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

  @media (max-width: ${theme.breakpoints.compact}) {
    margin-right: 0;
    display: flex;
    flex-direction: column;
    align-items: end;

    ul {
      display: none;
    }

    ul.open {
      display: block;
      background-color: ${theme.colors.primary};

      li {
        padding: 0 2.5rem;

        &:last-of-type {
          padding-bottom: 2rem;
        }
      }
    }
  }
`;

const burgerButtonStyle = (theme: Theme) => css`
  display: none;

  @media (max-width: ${theme.breakpoints.compact}) {
    display: block;
  }
`;

export default function MainNavigation() {
  const navigation = useStaticQuery<Queries.MainNavigationQuery>(query);
  const [open, { toggle }] = useDisclosure(false);

  return (
    <nav css={navStyle}>
      <BurgerButton onClick={toggle} isActive={open} css={burgerButtonStyle} />
      <ul className={open ? 'open' : ''}>
        {navigation.navigationYaml?.main?.map(item => {
          if (item?.key && item.path) {
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
