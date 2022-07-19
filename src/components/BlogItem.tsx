import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { FormattedDate, FormattedTime } from 'react-intl';

const blogItemStyles = css`
  margin-bottom: 2rem;
`;

type BlogItemProps = {
  excerpt: string;
  path: string;
  title: string;
  publishedAt: string;
  tagList: JSX.Element;
};

export function BlogItem({ excerpt, path, title, publishedAt, tagList }: BlogItemProps) {
  return (
    <div css={blogItemStyles}>
      <Link to={path}>
        <h2>{title}</h2>
        {tagList}
        <FormattedDate value={publishedAt} /> <FormattedTime value={publishedAt} />
        {excerpt}
      </Link>
    </div>
  );
}
