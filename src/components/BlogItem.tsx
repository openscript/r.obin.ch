import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { ElementType } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

const blogItemStyles = css`
  margin-bottom: 2rem;
`;

type BlogItemProps = {
  excerpt: string;
  path: string;
  title: string;
  publishedAt: string;
  tagList?: JSX.Element;
  titleAs?: ElementType;
};

export function BlogItem({ excerpt, path, title, publishedAt, tagList, titleAs: Title = 'h2' }: BlogItemProps) {
  return (
    <div css={blogItemStyles}>
      <Link to={path}>
        <Title>{title}</Title>
      </Link>
      {tagList}
      <FormattedDate value={publishedAt} /> <FormattedTime value={publishedAt} />
      {excerpt}
    </div>
  );
}
