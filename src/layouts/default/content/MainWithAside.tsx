import { css, Theme } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { Main } from './Main';

const mainWithAsideStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: row-reverse;

  @media (max-width: ${theme.breakpoints.compact}) {
    flex-direction: column;
  }

  article {
    width: calc(100% - 15rem);

    @media (max-width: ${theme.breakpoints.compact}) {
      width: auto;
    }
  }

  aside {
    min-width: 15rem;
    width: 15rem;
    padding-top: 3.4rem;
    padding-left: 1rem;

    @media (max-width: ${theme.breakpoints.compact}) {
      width: auto;
      padding-top: 0;
      padding-left: 0;
      margin-bottom: 2rem;
    }

    .component-title {
      border-bottom: 1px solid ${theme.colors.primary};
      margin-bottom: 1rem;
    }

    nav {
      ul {
        margin: 0;
        list-style: decimal-leading-zero;
      }
    }
  }
`;

type MainWithAsideProps = PropsWithChildren<{}>;

export function MainWithAside({ children }: MainWithAsideProps) {
  return <Main css={mainWithAsideStyle}>{children}</Main>;
}
