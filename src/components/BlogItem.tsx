import { css } from '@emotion/react';
import { Link } from 'gatsby';

const blogItemStyles = css`
  margin-bottom: 2rem;
`;

type BlogItemProps = {
  excerpt: string;
  path: string;
  title: string;
};

export function BlogItem({ excerpt, path, title }: BlogItemProps) {
  return (
    <div css={blogItemStyles}>
      <Link to={path}>
        <h2>{title}</h2>
        {excerpt}
      </Link>
    </div>
  );
}
