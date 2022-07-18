import { css } from '@emotion/react';
import { Link } from 'gatsby';

const blogItemStyles = css`
  margin-bottom: 2rem;
`;

type BlogItemProps = {
  excerpt: string;
  path: string;
  title: string;
  tagList: JSX.Element;
};

export function BlogItem({ excerpt, path, title, tagList }: BlogItemProps) {
  return (
    <div css={blogItemStyles}>
      <Link to={path}>
        <h2>{title}</h2>
        {tagList}
        {excerpt}
      </Link>
    </div>
  );
}
