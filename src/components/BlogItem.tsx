import { css } from '@emotion/react';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { ElementType } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

const blogItemStyles = css`
  margin-bottom: 2rem;
`;

const titleContainerStyles = css`
  display: inline-block;
  position: relative;
  margin: 0 -0.5rem;
  margin-bottom: 0.5rem;

  .gatsby-image-wrapper {
    user-select: none;
  }
`;

const titleStyles = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0;
  padding: 0.5rem;
`;

const metaDataStyles = css`
  display: flex;
  margin-bottom: 0.5rem;
`;

type BlogItemProps = {
  excerpt: string;
  path: string;
  title: string;
  publishedAt: string;
  featured?: IGatsbyImageData;
  tagList?: JSX.Element;
  titleAs?: ElementType;
};

export function BlogItem({ excerpt, path, title, publishedAt, featured, tagList, titleAs: Title = 'h2' }: BlogItemProps) {
  return (
    <div css={blogItemStyles}>
      <Link to={path} css={featured && titleContainerStyles}>
        {featured && <GatsbyImage image={featured} alt={title} />}
        <Title css={featured && titleStyles}>{title}</Title>
      </Link>
      <div css={metaDataStyles}>
        <FormattedDate value={publishedAt} /> <FormattedTime value={publishedAt} />
        {tagList}
      </div>
      {excerpt}
    </div>
  );
}
