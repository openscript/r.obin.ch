import { Theme, css } from '@emotion/react';

type ReboundDividerProps = {
  flipVertically?: boolean;
  flipHorizontally?: boolean;
};

export function ReboundDivider({ flipVertically, flipHorizontally }: ReboundDividerProps) {
  return (
    <svg
      width="1e3"
      height="24"
      version="1.1"
      viewBox="0 0 264.58 6.35"
      xmlns="http://www.w3.org/2000/svg"
      css={(theme: Theme) => css`
        width: 100%;
        height: auto;
        fill: ${theme.colors.primary};
        transform: scaleY(${flipVertically ? '-1' : '1'}) scaleX(${flipHorizontally ? '-1' : '1'});
      `}
    >
      <path d="m0 0v5.069l59.08-4.883 205.5 6.164v-6.35z" />
    </svg>
  );
}
