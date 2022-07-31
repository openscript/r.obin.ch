import { css } from '@emotion/react';
import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { CONFIGURATION } from '../configuration';

const tagListStyles = css`
  display: flex;
  list-style: none;
  padding: 0;

  li {
    margin-left: 1rem;
    white-space: nowrap;
  }
`;

type TagListProps = {
  locale?: string;
  tags?: {
    slug?: string;
    title?: string;
  }[];
};

export function TagList({ locale, tags }: TagListProps) {
  if (!locale) {
    return null;
  }
  return (
    <ul css={tagListStyles}>
      {tags?.map(t => (
        <li>
          <LocalizedLink to={`${CONFIGURATION.PATHS.TAG}/${t.slug}`}>{t.title}</LocalizedLink>
        </li>
      ))}
    </ul>
  );
}
