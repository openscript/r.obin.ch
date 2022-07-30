import { css, Theme } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { Main } from './Main';

const mainWithAsideStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: row-reverse;

  @media (max-width: ${theme.breakpoints.tiny}) {
    flex-direction: column;
  }

  article {
    width: calc(100% - 15rem);

    @media (max-width: ${theme.breakpoints.tiny}) {
      width: auto;
    }
  }

  aside {
    min-width: 15rem;
    width: 15rem;
    padding-top: 3.2rem;

    @media (max-width: ${theme.breakpoints.tiny}) {
      width: auto;
      padding-top: 0;
    }

    nav {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
`;

type MainWithAsideProps = PropsWithChildren<{}>;

export function MainWithAside({ children }: MainWithAsideProps) {
  return <Main css={mainWithAsideStyle}>{children}</Main>;
}
