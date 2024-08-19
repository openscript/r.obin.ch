import { css } from '@emotion/react';
import { HTMLProps, PropsWithChildren } from 'react';

const mainStyle = css`
  padding-top: 2rem;
  padding-bottom: 2rem;

  *:first-child {
    margin-top: 0;
  }
`;

type MainProps = PropsWithChildren<{}> & HTMLProps<HTMLElement>;

export function Main({ children, ...props }: MainProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <main css={mainStyle} {...props}>
      {children}
    </main>
  );
}
