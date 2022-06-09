import { css } from '@emotion/react';

const brandStyle = css`
  transition: 0.5s;

  span {
    display: inline-block;
    opacity: 0;
  }

  &:hover span {
    transition: 0.5s;
    opacity: 1;
  }
`;

export default function Brand() {
  return (
    <div css={brandStyle}>
      r.obin<span>.ch</span>
    </div>
  );
}
