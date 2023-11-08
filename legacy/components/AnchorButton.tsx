import { AnchorHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';

type HrefButtonProps = PropsWithChildren<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>;

export function AnchorButton({ children, ...props }: HrefButtonProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a {...props} className="button">
      {children}
    </a>
  );
}
