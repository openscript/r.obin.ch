import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { PropsWithChildren } from 'react';

const mediaItemStyles = css`
  margin-bottom: 2rem;
`;

type ProjectItemProps = PropsWithChildren<{
  path: string;
  title: string;
}>;

export function MediaItem({ children, path, title }: ProjectItemProps) {
  return (
    <div css={mediaItemStyles}>
      <Link to={path}>
        <h2>{title}</h2>
      </Link>
      {children}
    </div>
  );
}
