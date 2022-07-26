import { css } from '@emotion/react';
import { Link } from 'gatsby';

const projectItemStyles = css`
  margin-bottom: 2rem;
`;

type ProjectItemProps = {
  path: string;
  title: string;
};

export function ProjectItem({ path, title }: ProjectItemProps) {
  return (
    <div css={projectItemStyles}>
      <Link to={path}>
        <h2>{title}</h2>
      </Link>
    </div>
  );
}
