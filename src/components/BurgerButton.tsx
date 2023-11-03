import { css, Theme } from '@emotion/react';

const BurgerButtonStyle = (theme: Theme) => css`
  display: block;
  background: transparent;
  width: 2.5rem;
  height: 3.2rem;
  cursor: pointer;
  border: none;

  &:before,
  div,
  &:after {
    content: '';
    display: block;
    height: 4px;
    background-color: ${theme.colors.bright};
    margin: 4px 0;
    transition: 0.2s;
  }

  &:hover:before,
  &:hover div,
  &:hover:after {
    background-color: ${theme.colors.secondary};
  }

  &.active:before {
    transform: translateY(8px) rotate(135deg);
  }

  &.active div {
    transform: scale(0);
  }

  &.active:after {
    transform: translateY(-8px) rotate(-135deg);
  }
`;

type BurgerButtonProps = {
  className?: string;
  isActive?: boolean;
  onClick: () => void;
};

export function BurgerButton({ className, isActive, onClick }: BurgerButtonProps) {
  const classNames = `${className} ${isActive ? 'active' : ''}`;

  return (
    <button type="button" css={BurgerButtonStyle} className={classNames} onClick={onClick} aria-label="Open Menu">
      <div />
    </button>
  );
}
