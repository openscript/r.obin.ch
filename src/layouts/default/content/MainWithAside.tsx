import { css, Theme } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { Main } from './Main';

const mainWithAsideStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: row-reverse;

  @media (max-width: ${theme.breakpoints.tiny}) {
    flex-direction: column;
  }
`;

type MainWithAsideProps = PropsWithChildren<{}>;

export function MainWithAside({ children }: MainWithAsideProps) {
  return <Main css={mainWithAsideStyle}>{children}</Main>;
}
