import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

const mainStyle = () => css`
  padding-top: 2rem;
  padding-bottom: 2rem;

  *:first-child {
    margin-top: 0;
  }
`;

type MainProps = PropsWithChildren<{}>;

export function Main({ children }: MainProps) {
  return <main css={mainStyle}>{children}</main>;
}
